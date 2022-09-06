package com.carwash.adminservice.service;

import com.carwash.adminservice.model.Filter;
import com.carwash.adminservice.model.Order;
import com.carwash.adminservice.wrapper.OrderList;
import com.carwash.adminservice.wrapper.StringList;


public interface OrderService {

	public String insertOrder(Order order);

	public OrderList getAllOrders();

	public String updateOrder(Order order);

	public boolean deleteOrders(StringList stringList);

	public OrderList getFilteredOrders(Filter filter);
	
	public OrderList getOrdersByExample(Order order);

}
