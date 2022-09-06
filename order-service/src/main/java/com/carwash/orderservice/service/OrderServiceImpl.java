package com.carwash.orderservice.service;

import java.time.ZoneOffset;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
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
import com.carwash.orderservice.repository.OrderRepository;
import com.carwash.orderservice.wrapper.OrderList;
import com.carwash.orderservice.wrapper.StringList;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;

@Service
public class OrderServiceImpl implements OrderService {

	private static final String BASE_URL = "http://api-gateway";

	private static final String WASH_PACK_URL = BASE_URL + "/washer/WashPack";

	private static final String ADD_ON_URL = BASE_URL + "/washer/AddOn";

	private static final String CAR_URL = BASE_URL + "/user/car";

	private static final String WASHER_URL = BASE_URL + "/user/washer";
	
	private static final String JWT = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYWpqdWFsYW1AZ21haWwuY29tIiwiZXhwIjoxNjYyNDkyMTI2LCJpYXQiOjE2NjI0NTYxMjZ9.8N_BzxbgDNGcFKhC3TI98ap6JymskZFnVk6EyGCenAQ";

	@Autowired
	OrderRepository orderRepository;

	@Autowired
	MongoTemplate mongoTemplate;

	@Autowired
	RestTemplate restTemplate;

	public void setRepository(OrderRepository orderRepository) {
		this.orderRepository = orderRepository;
	}

	@CircuitBreaker(name = "validationBreaker" , fallbackMethod = "fallbackValidateExistence")
	public void validateExistence(String url, Object id, String objectName) throws Exception {
		HttpHeaders headers = new HttpHeaders();
		headers.setBearerAuth(JWT);
		boolean exists = restTemplate
				.exchange(url + "/exists", HttpMethod.POST, new HttpEntity<Object>(id, headers), Boolean.class)
				.getBody();
		if (!exists)
			throw new NonExistentIdException(objectName);
	}
	
	public void fallbackValidateExistence(String url, Object id, String objectName) throws Exception {
		throw new Exception("Other services are also required for insertion or updation");
	}

	public void validateExistenceOfIds(Order order) throws Exception {
		validateExistence(WASH_PACK_URL, order.getWashPackId(), "Wash Pack");
		validateExistence(ADD_ON_URL, order.getAddOnIdList(), "Add-On");
		validateExistence(CAR_URL, order.getCarId(), "Car");
		if(order.getWasherId() != null) {
			validateExistence(WASHER_URL, order.getWasherId(), "Washer");		
		}
	}

	public void validateOrder(Order order) throws Exception {
		try {
			validateExistenceOfIds(order);
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

	public String insertOrder(Order order) {
		if (order.getOrderId() != null) {
			if (orderRepository.existsById(order.getOrderId())) {
				return "Order Already Exists";
			}
		}
		try {
			validateOrder(order);
			orderRepository.save(order);
			return "Order saved successfully";
		} catch (Exception e) {
			return e.getMessage();
		}
	}

	public OrderList getAllOrders() {
		List<Order> orderList = orderRepository.findAll();
		return new OrderList(orderList);
	}

	public String updateOrder(Order order) {
		if (!orderRepository.existsById(order.getOrderId())) {
			return "Order with this Id does not Exist";
		}
		try {
			validateOrder(order);
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

}
