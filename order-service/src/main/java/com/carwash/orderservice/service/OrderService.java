package com.carwash.orderservice.service;

import org.springframework.http.HttpHeaders;

import com.carwash.orderservice.model.Filter;
import com.carwash.orderservice.model.Order;
import com.carwash.orderservice.security.MyUserDetails;
import com.carwash.orderservice.wrapper.OrderList;
import com.carwash.orderservice.wrapper.StringList;


public interface OrderService {

	public String insertOrder(Order order, HttpHeaders headers);

	public OrderList getAllOrders();

	public String updateOrder(Order order, HttpHeaders headers);

	public boolean deleteOrders(StringList stringList);

	public OrderList getFilteredOrders(Filter filter);
	
	public OrderList getOrdersByExample(Order order);
	
	public MyUserDetails getUserByUsername(String username);
	
	public OrderList getOrdersByUser(HttpHeaders headers);

}
