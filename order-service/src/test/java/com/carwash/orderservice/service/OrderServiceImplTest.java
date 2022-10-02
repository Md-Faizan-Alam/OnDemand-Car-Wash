package com.carwash.orderservice.service;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isA;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.carwash.orderservice.model.Feedback;
import com.carwash.orderservice.model.Location;
import com.carwash.orderservice.model.Order;
import com.carwash.orderservice.model.UrlCollection;
import com.carwash.orderservice.repository.OrderRepository;
import com.carwash.orderservice.wrapper.StringList;

class OrderServiceImplTest {

	OrderServiceImpl orderService;
	HttpHeaders headers;
	UrlCollection urlCollection;

	@BeforeEach
	void init() {
		OrderRepository mockOrderRepository = mock(OrderRepository.class);
		RestTemplate mockRestTemplate = mock(RestTemplate.class);
		urlCollection = new UrlCollection("random/url","random/url","random/url","random/url","random/url");
		orderService = new OrderServiceImpl();
		orderService.setRepository(mockOrderRepository);
		orderService.setRestTemplate(mockRestTemplate);
		orderService.setCollection(urlCollection);
		headers = new HttpHeaders();
	}

	@Test
	@DisplayName("Test insertion of orders")
	void testInsertOrder() {
		Order order = new Order();
		
		when(orderService.orderRepository.save(order)).thenReturn(order);
		when(orderService.restTemplate.exchange(isA(String.class), eq(HttpMethod.POST), isA(HttpEntity.class),
				eq(Boolean.class))).thenReturn(new ResponseEntity<Boolean>(true, HttpStatus.OK));
		when(orderService.restTemplate.exchange(isA(String.class), eq(HttpMethod.POST), isA(HttpEntity.class),
				eq(String.class))).thenReturn(new ResponseEntity<String>("Title", HttpStatus.OK));
		
		order.setStatus("PENDING");
		order.setLocation(new Location(45, 120));
		String messageForValidOrder = orderService.insertOrder(order, headers);
		final String invalidStatus = "SOMETHING";
		order.setStatus(invalidStatus);
		String messageForInvalidStatus = orderService.insertOrder(order, headers);
		order.setStatus("COMPLETED");
		String messageForNoCompletionDate = orderService.insertOrder(order, headers);
		order.setBookingTime(LocalDateTime.now().plusDays(1L));
		order.setCompletionTime(LocalDateTime.now());
		String messageForBookedForThePast = orderService.insertOrder(order, headers);
		order.setBookingTime(LocalDateTime.now());
		order.setCompletionTime(LocalDateTime.now().plusDays(1L));
		order.setStatus("IN_PROCESS");
		order.setCustomerFeedback(new Feedback(3, "A generic review"));
		order.setWasherFeedback(new Feedback(3, "A generic review"));
		order.setBucketsOfWaterUsed(3);
		String messageForFeedbackNotPossible = orderService.insertOrder(order, headers);
		order.setStatus("COMPLETED");
		order.setCustomerFeedback(new Feedback(8, "A generic review"));
		order.setWasherFeedback(new Feedback(3, "A generic review"));
		String messageForInvalidCustomerRating = orderService.insertOrder(order, headers);
		order.setCustomerFeedback(new Feedback(3, "A generic review"));
		order.setWasherFeedback(new Feedback(8, "A generic review"));
		String messageForInvalidWasherRating = orderService.insertOrder(order, headers);
		order.setWasherFeedback(new Feedback(4, "A generic review"));
		order.setLocation(new Location(100, 120));
		String messageForInvalidLatitude = orderService.insertOrder(order, headers);
		order.setLocation(new Location(50, 200));
		String messageForInvalidLongitude = orderService.insertOrder(order, headers);

		assertAll(() -> assertEquals("Order saved successfully", messageForValidOrder),
				() -> assertEquals(invalidStatus + " is not a valid value for the status of an order",
						messageForInvalidStatus),
				() -> assertEquals("An order that has been COMPLETED must have a completion time",
						messageForNoCompletionDate),
				() -> assertEquals("An order can not be scheduled for a date in the past", messageForBookedForThePast),
				() -> assertEquals("Incomplete orders can not contain feedback or amount of water used",
						messageForFeedbackNotPossible),
				() -> assertEquals("The rating given by the customer is out of the [1,5] range",
						messageForInvalidCustomerRating),
				() -> assertEquals("The rating given by the washer is out of the [1,5] range",
						messageForInvalidWasherRating),
				() -> assertEquals("The given location's latitude is out of the [-90,90] range",
						messageForInvalidLatitude),
				() -> assertEquals("The given location's longitude is out of the [-180,180] range",
						messageForInvalidLongitude));

	}

	@Test
	@DisplayName("Test updation of orders")
	void testUpdateOrder() {
		Order order = new Order();
		order.setOrderId("098ue98eu98ekf0e");

		when(orderService.orderRepository.existsById("098ue98eu98ekf0e")).thenReturn(true);
		when(orderService.orderRepository.save(order)).thenReturn(order);
		when(orderService.restTemplate.exchange(isA(String.class), eq(HttpMethod.POST), isA(HttpEntity.class),
				eq(Boolean.class))).thenReturn(new ResponseEntity<Boolean>(true, HttpStatus.OK));
		when(orderService.restTemplate.exchange(isA(String.class), eq(HttpMethod.POST), isA(HttpEntity.class),
				eq(String.class))).thenReturn(new ResponseEntity<String>("Title", HttpStatus.OK));

		order.setStatus("PENDING");
		order.setLocation(new Location(45, 120));
		String messageForValidOrder = orderService.updateOrder(order, headers);
		String invalidStatus = "SOMETHING";
		order.setStatus(invalidStatus);
		String messageForInvalidStatus = orderService.updateOrder(order, headers);
		order.setStatus("COMPLETED");
		String messageForNoCompletionDate = orderService.updateOrder(order, headers);
		order.setBookingTime(LocalDateTime.now().plusDays(1L));
		order.setCompletionTime(LocalDateTime.now());
		String messageForBookedForThePast = orderService.updateOrder(order, headers);
		order.setBookingTime(LocalDateTime.now());
		order.setCompletionTime(LocalDateTime.now().plusDays(1L));
		order.setStatus("IN_PROCESS");
		order.setCustomerFeedback(new Feedback(3, "A generic review"));
		order.setWasherFeedback(new Feedback(3, "A generic review"));
		order.setBucketsOfWaterUsed(3);
		String messageForFeedbackNotPossible = orderService.updateOrder(order, headers);
		order.setStatus("COMPLETED");
		order.setCustomerFeedback(new Feedback(8, "A generic review"));
		order.setWasherFeedback(new Feedback(3, "A generic review"));
		String messageForInvalidCustomerRating = orderService.updateOrder(order, headers);
		order.setCustomerFeedback(new Feedback(3, "A generic review"));
		order.setWasherFeedback(new Feedback(8, "A generic review"));
		String messageForInvalidWasherRating = orderService.updateOrder(order, headers);
		order.setWasherFeedback(new Feedback(4, "A generic review"));
		order.setLocation(new Location(100, 120));
		String messageForInvalidLatitude = orderService.updateOrder(order, headers);
		order.setLocation(new Location(50, 200));
		String messageForInvalidLongitude = orderService.updateOrder(order, headers);

		assertAll(() -> assertEquals("Order updated successfully", messageForValidOrder),

				() -> assertEquals(invalidStatus + " is not a valid value for the status of an order",messageForInvalidStatus),

				() -> assertEquals("An order that has been COMPLETED must have a completion time",messageForNoCompletionDate),

				() -> assertEquals("An order can not be scheduled for a date in the past", messageForBookedForThePast),

				() -> assertEquals("Incomplete orders can not contain feedback or amount of water used",messageForFeedbackNotPossible),

				() -> assertEquals("The rating given by the customer is out of the [1,5] range",messageForInvalidCustomerRating),

				() -> assertEquals("The rating given by the washer is out of the [1,5] range",messageForInvalidWasherRating),

				() -> assertEquals("The given location's latitude is out of the [-90,90] range",messageForInvalidLatitude),

				() -> assertEquals("The given location's longitude is out of the [-180,180] range",messageForInvalidLongitude)
		);

	}
	
	
	@Test
	@DisplayName("Test deletion of orders")
	void testDeleteOrders() {
		StringList stringList = new StringList();
		stringList.add("098ue98eu98ekf0e");
		when(orderService.orderRepository.existsById("098ue98eu98ekf0e")).thenReturn(false);
		boolean nonExistentOrderIsDeleted = orderService.deleteOrders(stringList);
		
		when(orderService.orderRepository.existsById("098ue98eu98ekf0e")).thenReturn(true);
		
		boolean existentOrderIsDeleted = orderService.deleteOrders(stringList);
		
		assertAll(
				()-> assertFalse(nonExistentOrderIsDeleted , "If an order with the given id does not exist then deletion will fail"),
				()-> assertTrue(existentOrderIsDeleted , "If an order with the given id does exist the nthe deletion process will be successful")
				);
		
		
	}

}
