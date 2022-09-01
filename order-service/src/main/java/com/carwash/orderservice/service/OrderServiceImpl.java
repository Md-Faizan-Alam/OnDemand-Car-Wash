package com.carwash.orderservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carwash.orderservice.model.Filter;
import com.carwash.orderservice.model.Order;
import com.carwash.orderservice.repository.OrderRepository;
import com.carwash.orderservice.wrapper.OrderList;
import com.carwash.orderservice.wrapper.StringList;

@Service
public class OrderServiceImpl implements OrderService{
	
	@Autowired
	OrderRepository orderRepository;

	public void setRepository(OrderRepository orderRepository) {
		this.orderRepository = orderRepository;
	}
	
	public boolean validateOrder(Order order) {
		return true;
	}
	
	public boolean orderExists(String orderId) {
		if(orderId == null) return false;
		Optional<Order> order = orderRepository.findById(orderId);
		return order.isPresent();
	}
	
	public boolean insertOrder(Order order) {
		if(orderExists(order.getOrderId())) return false;
		orderRepository.save(order);
		return true;
	}

	public OrderList getAllOrders() {
		List<Order> orderList = orderRepository.findAll();
		return new OrderList(orderList);
	}

	public boolean updateOrder(Order order) {
		if(orderExists(order.getOrderId())) {
			orderRepository.save(order);
			return true;
		}
		return false;
	}
	
	public boolean deleteOrders(StringList stringList) {
		for(String orderId : stringList.getStringList()) {
			if(!orderExists(orderId)) return false;
		}
		orderRepository.deleteAllById(stringList.getStringList());
		return true;
	}
	
	public OrderList getFilteredOrders(Filter filter) {
		return null;
	}

	
	
}
