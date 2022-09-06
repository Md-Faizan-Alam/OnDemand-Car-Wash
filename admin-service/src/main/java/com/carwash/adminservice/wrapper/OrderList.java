package com.carwash.adminservice.wrapper;

import java.util.ArrayList;
import java.util.List;

import com.carwash.adminservice.model.Order;

public class OrderList {
	List<Order> orderList = new ArrayList<>();

	public OrderList() {
		
	}
	public OrderList(List<Order> orderList) {
		this.orderList = orderList;
	}
	public List<Order> getOrderList() {
		return orderList;
	}
	public void setOrderList(List<Order> orderList) {
		this.orderList = orderList;
	}
	
	@Override
	public boolean equals(Object obj) {
		return super.equals(obj);
	}
	
	
	
	
}
