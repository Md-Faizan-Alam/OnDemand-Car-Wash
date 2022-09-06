package com.carwash.orderservice.service;

import java.time.ZoneOffset;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.carwash.orderservice.exceptions.NonExistentIdException;
import com.carwash.orderservice.model.Filter;
import com.carwash.orderservice.model.Order;
import com.carwash.orderservice.repository.OrderRepository;
import com.carwash.orderservice.wrapper.OrderList;
import com.carwash.orderservice.wrapper.StringList;

@Service
public class OrderServiceImpl implements OrderService {

	private static final String BASE_URL = "http://api-gateway";

	private static final String WASH_PACK_URL = BASE_URL + "/washer/WashPack";

	private static final String ADD_ON_URL = BASE_URL + "/washer/AddOn";

	@Autowired
	OrderRepository orderRepository;

	@Autowired
	MongoTemplate mongoTemplate;

	@Autowired
	RestTemplate restTemplate;

	public void setRepository(OrderRepository orderRepository) {
		this.orderRepository = orderRepository;
	}
	
	public void validateExistenceOfIds(Order order) throws NonExistentIdException{
		boolean washPackExists = restTemplate
				.postForEntity(WASH_PACK_URL + "/exists", order.getWashPackId(), Boolean.class).getBody();
		
		if (!washPackExists)
			throw new NonExistentIdException("Wash Pack");
		
		boolean addOnsExist = restTemplate
				.postForEntity(ADD_ON_URL+"/exists", order.getAddOnIdList(), Boolean.class).getBody();
		
		if (!addOnsExist)
			throw new NonExistentIdException("Add-On");
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
