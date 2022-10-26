package com.carwash.orderservice.controller;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
import com.carwash.orderservice.model.PayRequest;
import com.carwash.orderservice.model.RazorpayKey;
import com.carwash.orderservice.service.OrderService;
import com.carwash.orderservice.wrapper.OrderList;
import com.carwash.orderservice.wrapper.StringList;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/order")
public class OrderController {

	// private static Logger logger = LoggerFactory.getLogger(OrderController.class);

	@Autowired
	RazorpayKey key;
	
	@Autowired
	OrderService orderService;

	@GetMapping("/pass")
	public Order pass(Order order) {
//		order.setBookingTime(LocalDateTime.now());

		return order;
	}
	
	@GetMapping("/revenue")
	public ResponseEntity<Double> getRevenue() {
		double revenue = orderService.getRevenue();
		return new ResponseEntity<Double>(revenue,HttpStatus.OK);
	}
	
	@GetMapping("/count")
	public ResponseEntity<Long> getCount(){
		long count = orderService.getCount();
		return new ResponseEntity<Long>(count,HttpStatus.OK);
	}
	
	@GetMapping("/popular")
	public ResponseEntity<StringList> getPopular(){
		List<String> list1 = orderService.getBoundaryPacks();
		List<String> list2 = orderService.getBoundaryAddOns();
		list1.addAll(list2);
		return new ResponseEntity<StringList>(new StringList(list1),HttpStatus.OK);
	}

	@GetMapping("/demoFilter")
	public Filter getFilter() {
		LocalDateTime date = LocalDateTime.now();
		date = date.truncatedTo(ChronoUnit.SECONDS);
		return new Filter(date, date);
	}

	@PostMapping("/add")
	public ResponseEntity<String> insertOrder(@RequestBody Order order, HttpServletRequest request) {
		String auth = request.getHeader("Authorization");
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", auth);
		String saved = orderService.insertOrder(order, headers);
		if (saved.equals("Order saved successfully")) {
			return new ResponseEntity<String>(saved, HttpStatus.CREATED);
		}
		return new ResponseEntity<String>(saved, HttpStatus.OK);
	}

	@GetMapping("/list")
	public OrderList getAllOrders() {
		return orderService.getAllOrders();
	}

	@GetMapping("/getUnaccepted")
	public OrderList getUnaccepted(HttpServletRequest request) {
		String auth = request.getHeader("Authorization");
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", auth);
		return orderService.getUnaccepted(headers);
	}

	@GetMapping("/getByUser")
	public OrderList getOrdersByUser(HttpServletRequest request) {
		String auth = request.getHeader("Authorization");
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", auth);
		return orderService.getOrdersByUser(headers);
	}

	@PutMapping("/update")
	public ResponseEntity<String> updateOrder(@RequestBody Order order, HttpServletRequest request) {
		String auth = request.getHeader("Authorization");
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", auth);
		String updated = orderService.updateOrder(order, headers);
		if (updated == "Order updated successfully") {
			return new ResponseEntity<String>(updated, HttpStatus.OK);
		}
		return new ResponseEntity<String>(updated, HttpStatus.OK);
	}

	@DeleteMapping("/delete")
	public ResponseEntity<String> deleteOrders(@RequestBody StringList stringList) {
		boolean deleted = orderService.deleteOrders(stringList);
		if (deleted) {
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

	@PostMapping("/getPayOrder")
	public ResponseEntity<String> getRazorPayOrder(@RequestBody PayRequest payRequest) {
		try {
			RazorpayClient razorpay = new RazorpayClient(key.getId(), key.getSecret());

			JSONObject orderRequest = new JSONObject();
			orderRequest.put("amount", payRequest.getAmount()); // amount in the smallest currency unit
			orderRequest.put("currency", payRequest.getCurrency());
			com.razorpay.Order order = razorpay.orders.create(orderRequest);
			return new ResponseEntity<String>(order.toString(),HttpStatus.OK);
		} catch (RazorpayException e) {
			e.printStackTrace();
		}
		return new ResponseEntity<String>("Exception thrown",HttpStatus.OK);
	}

}
