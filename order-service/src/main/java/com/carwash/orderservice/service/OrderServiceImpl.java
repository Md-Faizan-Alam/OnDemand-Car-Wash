package com.carwash.orderservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carwash.orderservice.exceptions.BookedForThePastException;
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
			if ((order.getCompletionTime().getTime()) < (order.getBookingTime().getTime())) {
				throw new BookedForThePastException();
			}
		} else {
			// If completion time is null then the order cannot have the status COMPLETED
			if (order.getStatus().equals("COMPLETED")) {
				throw new NoCompletionDateException();
			}
		}
		try {
			order.getLocation().validate();
		} catch (Exception e) {
			throw e;
		}

		try {
			order.validateFeedbacks();
		} catch (Exception e) {
			throw e;
		}
	}

	public boolean orderExists(String orderId) {
		if (orderId == null)
			return false;
		Optional<Order> order = orderRepository.findById(orderId);
		return order.isPresent();
	}

	public String insertOrder(Order order) {
		if (orderExists(order.getOrderId())) {
			return "Order Already Exists";
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

	public boolean updateOrder(Order order) {
		if (orderExists(order.getOrderId())) {
			orderRepository.save(order);
			return true;
		}
		return false;
	}

	public boolean deleteOrders(StringList stringList) {
		for (String orderId : stringList.getStringList()) {
			if (!orderExists(orderId))
				return false;
		}
		orderRepository.deleteAllById(stringList.getStringList());
		return true;
	}

	public OrderList getFilteredOrders(Filter filter) {
		return null;
	}

}
