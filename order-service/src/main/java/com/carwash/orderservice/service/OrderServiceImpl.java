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

import com.carwash.orderservice.exceptions.BookedForThePastException;
import com.carwash.orderservice.exceptions.FeedbackNotPossibleException;
import com.carwash.orderservice.exceptions.InvalidStatusException;
import com.carwash.orderservice.exceptions.NoCompletionDateException;
import com.carwash.orderservice.model.Filter;
import com.carwash.orderservice.model.Order;
import com.carwash.orderservice.repository.OrderRepository;
import com.carwash.orderservice.wrapper.OrderList;
import com.carwash.orderservice.wrapper.StringList;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	MongoTemplate mongoTemplate;

	public void setRepository(OrderRepository orderRepository) {
		this.orderRepository = orderRepository;
	}

	public void validateOrder(Order order) throws Exception {
		// Check if status is a valid string
		if (!order.validateStatus()) {
			throw new InvalidStatusException(order.getStatus());
		}
		if (order.getCompletionTime() != null) {
			// If completion time is not null then it has to be greater than the booking
			// time
			if ((order.getCompletionTime().isBefore(order.getBookingTime()))) {
				throw new BookedForThePastException();
			}
		} else {
			// If completion time is null then the order cannot have the status COMPLETED
			if (order.getStatus().equals("COMPLETED")) {
				throw new NoCompletionDateException();
			}
		}
		if(!order.getStatus().equals("COMPLETED")) {
			if(order.getCustomerFeedback() != null || order.getWasherFeedback() != null || order.getBucketsOfWaterUsed() != 0) {
				throw new FeedbackNotPossibleException();
			}
		}
		try {
			order.getLocation().validate();
			order.validateFeedbacks();
		} catch (Exception e) {
			throw e;
		}
	}

	public String insertOrder(Order order) {
		if(order.getOrderId()!= null) {
			if (orderRepository.existsById(order.getOrderId())) {
				return "Order Already Exists";
			}			
		}
		try {
			validateOrder(order);
			orderRepository.save(order);
			return "Order saved successfully";
		}catch(Exception e) {
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
		}catch(Exception e) {
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
		Query query = new Query().addCriteria(Criteria.where("bookingTime")
				.gt(filter.getAfter().toInstant(ZoneOffset.of("Z")))
				.lt(filter.getBefore().toInstant(ZoneOffset.of("Z")))				
				);
		List<Order> orderList = mongoTemplate.find(query, Order.class);
		return new OrderList(orderList);
	}
	
	public OrderList getOrdersByExample(Order order) {
		ExampleMatcher matcher = ExampleMatcher.matchingAny().withIgnorePaths("bucketsOfWaterUsed");
		Example<Order> example = Example.of(order,matcher);
		List<Order> orderList = orderRepository.findAll(example);
		return new OrderList(orderList);
	}
	
	

}
