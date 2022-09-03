package com.carwash.orderservice.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carwash.orderservice.model.Filter;
import com.carwash.orderservice.model.Order;
import com.carwash.orderservice.service.OrderService;
import com.carwash.orderservice.wrapper.OrderList;
import com.carwash.orderservice.wrapper.StringList;

@RestController
@RequestMapping("/order")
public class OrderController {
	
	@Autowired
	OrderService orderService;
	
	@GetMapping("/pass")
	public Order pass(Order order) {
		order.setBookingTime(new Date(System.currentTimeMillis()));
		return order;
	}
	
	@GetMapping("/demoFilter")
	public Filter getFilter() {
		return new Filter();
	}
	
	@PostMapping("/add")
	public ResponseEntity<String> insertOrder(@RequestBody Order order){
		String saved = orderService.insertOrder(order);
		if(saved.equals("Order saved successfully")) {
			return new ResponseEntity<String>(saved,HttpStatus.CREATED);
		}
		return new ResponseEntity<String>(saved,HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/list")
	public OrderList getAllWashPacks() {
		return orderService.getAllOrders();
	}
	
	@PutMapping("/update")
	public ResponseEntity<String> updateWashPack(@RequestBody Order order){
		boolean updated = orderService.updateOrder(order);
		if(updated) {
			return new ResponseEntity<String>("Order updated successfully", HttpStatus.OK);
		}
		return new ResponseEntity<String>("Order with this Id does not exist", HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<String> deleteWashPacks(@RequestBody StringList stringList){
		boolean deleted = orderService.deleteOrders(stringList);
		if(deleted) {
			return new ResponseEntity<String>("Orders deleted successfully", HttpStatus.OK);
		}
		return new ResponseEntity<String>("Order with one of these Ids does not exist", HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/filter")
	public OrderList getFilteredWashPacks(@RequestBody Filter filter) {
		return orderService.getFilteredOrders(filter);
	}
	
	
	
}
