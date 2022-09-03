package com.carwash.orderservice.service;

import com.carwash.orderservice.model.Filter;
import com.carwash.orderservice.model.Order;
import com.carwash.orderservice.wrapper.OrderList;
import com.carwash.orderservice.wrapper.StringList;


public interface OrderService {

	public String insertOrder(Order order);

	public OrderList getAllOrders();

	public boolean updateOrder(Order order);

	public boolean deleteOrders(StringList stringList);

	public OrderList getFilteredOrders(Filter filter);

}
