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
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.carwash.orderservice.exceptions.NonExistentIdException;
import com.carwash.orderservice.model.Filter;
import com.carwash.orderservice.model.Order;
import com.carwash.orderservice.model.UrlCollection;
import com.carwash.orderservice.repository.OrderRepository;
import com.carwash.orderservice.security.AuthenticationRequest;
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

	@CircuitBreaker(name = "validationBreaker" , fallbackMethod = "fallbackValidateExistence")
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

	public void validateExistenceOfIds(Order order, HttpHeaders headers) throws Exception {
		validateExistence(urlCollection.getWashPack(), order.getWashPackId(), "Wash Pack", headers);
		validateExistence(urlCollection.getAddOn(), order.getAddOnIdList(), "Add-On", headers);
		validateExistence(urlCollection.getCar(), order.getCarId(), "Car", headers);
		if(order.getWasherId() != null) {
			validateExistence(urlCollection.getWasher(), order.getWasherId(), "Washer", headers);		
		}
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

	public String updateOrder(Order order, HttpHeaders headers) {
		if (!orderRepository.existsById(order.getOrderId())) {
			return "Order with this Id does not Exist";
		}
		try {
			validateOrder(order, headers);
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
	
	public UserDetails getUserByUsername(String username) {
		AuthenticationRequest authRequest = new AuthenticationRequest(username,"secretsarenevertobeshared");
		UserDetails userDetails = restTemplate
				.exchange( "http://localhost:8100/user/getUserDetails" , HttpMethod.POST, new HttpEntity<Object>(authRequest), UserDetails.class)
				.getBody();
		return userDetails;
	}
	
	

}
