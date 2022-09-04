package com.carwash.orderservice.controller;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

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
		order.setBookingTime(LocalDateTime.now());
		return order;
	}
	
	
	@GetMapping("/demoFilter")
	public Filter getFilter() {
		LocalDateTime date = LocalDateTime.now();
		date = date.truncatedTo(ChronoUnit.SECONDS);
		return new Filter(date,date);
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
	public OrderList getAllOrders() {
		return orderService.getAllOrders();
	}
	
	@PutMapping("/update")
	public ResponseEntity<String> updateOrder(@RequestBody Order order){
		String updated = orderService.updateOrder(order);
		if(updated == "Order updated successfully") {
			return new ResponseEntity<String>(updated, HttpStatus.OK);
		}
		return new ResponseEntity<String>(updated, HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<String> deleteOrders(@RequestBody StringList stringList){
		boolean deleted = orderService.deleteOrders(stringList);
		if(deleted) {
			return new ResponseEntity<String>("Orders deleted successfully", HttpStatus.OK);
		}
		return new ResponseEntity<String>("Order with one of these Ids does not exist", HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/filter")
	public OrderList getOrderByRange(@RequestBody Filter filter) {
		return orderService.getFilteredOrders(filter);
	}
	
	
	@GetMapping("/find")
	public OrderList getOrdersByExample(@RequestBody Order order) {
		return orderService.getOrdersByExample(order);
	}
	
	
	
}




































//	@GetMapping("/dummy")
//	public List<Order> getDummyDate(){
//		List<Order> orderList = new ArrayList<>();
//		Order order = new Order("marutisuzuki","silverwash",new StringList(new ArrayList<>()), 1000.00, new Location(45,120),LocalDateTime.now());
//		orderList.add(order);
//		order = new Order("mahindraxuv","goldwash",new StringList(new ArrayList<>()), 2000.00, new Location(55,130),LocalDateTime.now());
//		return orderList;
//	}