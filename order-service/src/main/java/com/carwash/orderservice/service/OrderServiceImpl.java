package com.carwash.orderservice.service;

import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.carwash.orderservice.exceptions.NonExistentIdException;
import com.carwash.orderservice.model.Filter;
import com.carwash.orderservice.model.Order;
import com.carwash.orderservice.model.UrlCollection;
import com.carwash.orderservice.repository.OrderRepository;
import com.carwash.orderservice.security.AuthenticationRequest;
import com.carwash.orderservice.security.MyUserDetails;
import com.carwash.orderservice.wrapper.OrderList;
import com.carwash.orderservice.wrapper.StringList;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	UrlCollection urlCollection;

	@Autowired
	OrderRepository orderRepository;

	@Autowired
	MongoTemplate mongoTemplate;

	@Autowired
	RestTemplate restTemplate;

	public void setRepository(OrderRepository orderRepository) {
		this.orderRepository = orderRepository;
	}

	public void setRestTemplate(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	public void setCollection(UrlCollection urlCollection) {
		this.urlCollection = urlCollection;
	}

	@CircuitBreaker(name = "validationBreaker", fallbackMethod = "fallbackValidateExistence")
	public void validateExistence(String url, Object id, String objectName, HttpHeaders headers) throws Exception {
		boolean exists = restTemplate
				.exchange(url + "/exists", HttpMethod.POST, new HttpEntity<Object>(id, headers), Boolean.class)
				.getBody();
		if (!exists)
			throw new NonExistentIdException(objectName);
	}

	public void fallbackValidateExistence(String url, Object id, String objectName) throws Exception {
		throw new Exception("Other services are also required for insertion or updation");
	}

	@CircuitBreaker(name = "validationBreaker", fallbackMethod = "fallbackValidateExistence")
	public Order setNamesById(Order order, HttpHeaders headers) {
		String washPackTitle = restTemplate.exchange(urlCollection.getWashPack() + "/getTitle", HttpMethod.POST,
				new HttpEntity<String>(order.getWashPackId(), headers), String.class).getBody();
		order.setWashPackTitle(washPackTitle);
		String carName = restTemplate.exchange(urlCollection.getCar() + "/getTitle", HttpMethod.POST,
				new HttpEntity<String>(order.getCarId(), headers), String.class).getBody();
		order.setCarName(carName);
		return order;
	}

	public void validateExistenceOfIds(Order order, HttpHeaders headers) throws Exception {
		validateExistence(urlCollection.getCar(), order.getCarId(), "Car", headers);
		validateExistence(urlCollection.getWashPack(), order.getWashPackId(), "Wash Pack", headers);
		validateExistence(urlCollection.getAddOn(), order.getAddOnIdList(), "Add-On", headers);
		if (order.getWasherId() != null) {
			validateExistence(urlCollection.getWasher(), order.getWasherId(), "Washer", headers);
		}
	}

	public OrderList getOrdersByUser(HttpHeaders headers) {
		StringList carList = restTemplate.exchange(urlCollection.getCar() + "/carIdsByUser", HttpMethod.GET,
				new HttpEntity<Object>(headers), StringList.class).getBody();
		Query query = new Query().addCriteria(Criteria.where("carId").in(carList.getStringList()))
				.with(Sort.by(Direction.DESC, "bookingTime"));
		List<Order> orderList = mongoTemplate.find(query, Order.class);
		return new OrderList(orderList);
	}

	public void validateOrder(Order order, HttpHeaders headers) throws Exception {
		try {
			validateExistenceOfIds(order, headers);
			order.validateStatus();
			order.validateDateOrder();
			order.validateCompletionDate();
			order.validateCompletion();
			order.getLocation().validate();
			order.validateFeedbacks();
		} catch (Exception e) {
			throw e;
		}
	}

	public String insertOrder(Order order, HttpHeaders headers) {
		if (order.getOrderId() != null) {
			if (orderRepository.existsById(order.getOrderId())) {
				return "Order Already Exists";
			}
		}
		try {
			validateOrder(order, headers);
			order = setNamesById(order, headers);
			orderRepository.save(order);
			return "Order saved successfully";
		} catch (Exception e) {
			return e.getMessage();
		}
	}

	public OrderList getAllOrders() {
		List<Order> orderList = orderRepository.findAll(Sort.by(Direction.DESC, "bookingTime"));
		return new OrderList(orderList);
	}

	public String updateOrder(Order order, HttpHeaders headers) {
		if (!orderRepository.existsById(order.getOrderId())) {
			return "Order with this Id does not Exist";
		}
		try {
			validateOrder(order, headers);
			order = setNamesById(order, headers);
			orderRepository.save(order);
			return "Order updated successfully";
		} catch (Exception e) {
			return e.getMessage();
		}
	}

	public boolean deleteOrders(StringList stringList) {
		for (String orderId : stringList.getStringList()) {
			if (!orderRepository.existsById(orderId))
				return false;
		}
		orderRepository.deleteAllById(stringList.getStringList());
		return true;
	}

	public OrderList getFilteredOrders(Filter filter) {
		Query query = new Query()
				.addCriteria(Criteria.where("bookingTime").gt(filter.getAfter().toInstant(ZoneOffset.of("Z")))
						.lt(filter.getBefore().toInstant(ZoneOffset.of("Z"))));
		List<Order> orderList = mongoTemplate.find(query, Order.class);
		return new OrderList(orderList);
	}

	public OrderList getOrdersByExample(Order order) {
		ExampleMatcher matcher = ExampleMatcher.matchingAny().withIgnorePaths("bucketsOfWaterUsed");
		Example<Order> example = Example.of(order, matcher);
		List<Order> orderList = orderRepository.findAll(example);
		return new OrderList(orderList);
	}

	public MyUserDetails getUserByUsername(String username) {
		AuthenticationRequest authRequest = new AuthenticationRequest(username, "secretsarenevertobeshared");
		MyUserDetails userDetails = restTemplate.exchange(urlCollection.getUser() + "/getUserDetails", HttpMethod.POST,
				new HttpEntity<Object>(authRequest), MyUserDetails.class).getBody();
		return userDetails;
	}

	public OrderList getUnaccepted(HttpHeaders headers) {
		String washerId = restTemplate.exchange(urlCollection.getUser() + "/getId", HttpMethod.GET,
				new HttpEntity<Object>(headers), String.class).getBody();
		Query query = new Query().addCriteria(Criteria.where("washerId").in(Arrays.asList(washerId, null)))
				.with(Sort.by(Direction.DESC, "bookingTime"));
		List<Order> orderList = mongoTemplate.find(query, Order.class);
		return new OrderList(orderList);
	}

	public long getCount() {
		long count = orderRepository.count();
		return count;
	}

	public double getRevenue() {
		Query query = new Query();
		query.fields().include("amount");
		List<Order> orderList = mongoTemplate.find(query, Order.class);
		double sum = 0;
		for (Order order : orderList) {
			sum += order.getAmount();
		}
		return sum;
	}

	public List<String> getBoundaryPacks() {
		List<String> populars = new ArrayList<String>();
		Query query;
		List<String> packList = mongoTemplate.findDistinct("washPackTitle", Order.class, String.class);
		List<Long> countList = new ArrayList<>();
		long count;
		for (String pack : packList) {
			query = new Query(Criteria.where("washPackTitle").is(pack));
			count = mongoTemplate.count(query, Order.class);
			countList.add(count);
		}
		int index;
		count = countList.stream().max(Long::compare).get();
		index = countList.indexOf(count);
		populars.add(packList.get(index));

		count = countList.stream().min(Long::compare).get();
		index = countList.indexOf(count);
		populars.add(packList.get(index));

		return populars;
	}

	public List<String> getBoundaryAddOns() {
		Query query = new Query();
		query.fields().include("addOnIdList");
		List<Order> orderList = mongoTemplate.find(query, Order.class);
		
		List<String> idList = new ArrayList<>();
		Set<String> idSet = new HashSet<>();
		for (Order order : orderList) {
			idList.addAll(order.getAddOnIdList().getStringList());
			idSet.addAll(order.getAddOnIdList().getStringList());
		}
		
		Map<String, Long> countMap = new HashMap<>();
		idSet.stream().forEach((id) -> {
			long count = idList.stream().filter((element) -> element.equals(id)).count();
			countMap.put(id, count);
		});
		
		long maxCount = countMap.values().stream().max(Long::compare).get();
		long minCount = countMap.values().stream().min(Long::compare).get();
		String mostPopular = countMap.keySet().stream().filter((key) -> countMap.get(key) == maxCount)
				.collect(Collectors.toList()).get(0);
		String leastPopular = countMap.keySet().stream().filter((key) -> countMap.get(key) == minCount)
				.collect(Collectors.toList()).get(0);
		
		StringList idPair = new StringList(new ArrayList<>(Arrays.asList(mostPopular, leastPopular)));
		
		StringList addOnTitles = restTemplate.exchange(urlCollection.getAddOn() + "/getTitlesById", HttpMethod.POST,
				new HttpEntity<Object>(idPair, new HttpHeaders()), StringList.class).getBody();
		
		return addOnTitles.getStringList();
	}

}
