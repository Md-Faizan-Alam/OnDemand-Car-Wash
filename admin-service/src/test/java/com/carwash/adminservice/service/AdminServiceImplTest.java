package com.carwash.adminservice.service;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.carwash.adminservice.model.Feedback;
import com.carwash.adminservice.model.Location;
import com.carwash.adminservice.model.Order;
import com.carwash.adminservice.repository.OrderRepository;

class AdminServiceImplTest {

	OrderServiceImpl orderService;

	@BeforeEach
	void init() {
		OrderRepository mockOrderRepository = mock(OrderRepository.class);
		orderService = new OrderServiceImpl();
		orderService.setRepository(mockOrderRepository);
	}

	@Test
	@DisplayName("Test insertion of orders")
	void testInsertOrder() {
		Order order = new Order();
		when(orderService.orderRepository.save(order)).thenReturn(order);
		order.setStatus("PENDING");
		order.setLocation(new Location(45, 120));
		String messageForValidOrder = orderService.insertOrder(order);
		final String invalidStatus = "SOMETHING";
		order.setStatus(invalidStatus);
		String messageForInvalidStatus = orderService.insertOrder(order);
		order.setStatus("COMPLETED");
		String messageForNoCompletionDate = orderService.insertOrder(order);
		order.setBookingTime(LocalDateTime.now().plusDays(1L));
		order.setCompletionTime(LocalDateTime.now());
		String messageForBookedForThePast = orderService.insertOrder(order);
		order.setBookingTime(LocalDateTime.now());
		order.setCompletionTime(LocalDateTime.now().plusDays(1L));
		order.setStatus("IN_PROCESS");
		order.setCustomerFeedback(new Feedback(3,"A generic review"));
		order.setWasherFeedback(new Feedback(3,"A generic review"));
		order.setBucketsOfWaterUsed(3);
		String messageForFeedbackNotPossible = orderService.insertOrder(order);
		order.setStatus("COMPLETED");
		order.setCustomerFeedback(new Feedback(8,"A generic review"));
		order.setWasherFeedback(new Feedback(3,"A generic review"));
		String messageForInvalidCustomerRating = orderService.insertOrder(order);
		order.setCustomerFeedback(new Feedback(3,"A generic review"));
		order.setWasherFeedback(new Feedback(8,"A generic review"));
		String messageForInvalidWasherRating = orderService.insertOrder(order);
		order.setWasherFeedback(new Feedback(4,"A generic review"));
		order.setLocation(new Location(100,120));
		String messageForInvalidLatitude = orderService.insertOrder(order);
		order.setLocation(new Location(50,200));
		String messageForInvalidLongitude = orderService.insertOrder(order);
		
		assertAll(
				() -> assertEquals("Order saved successfully", messageForValidOrder),
				() -> assertEquals(invalidStatus+" is not a valid value for the status of an order", messageForInvalidStatus),
				() -> assertEquals("An order that has been COMPLETED must have a completion time", messageForNoCompletionDate),
				() -> assertEquals("An order can not be scheduled for a date in the past", messageForBookedForThePast),
				() -> assertEquals("Incomplete orders can not contain feedback or amount of water used", messageForFeedbackNotPossible),
				() -> assertEquals("The rating given by the customer is out of the [1,5] range", messageForInvalidCustomerRating),
				() -> assertEquals("The rating given by the washer is out of the [1,5] range", messageForInvalidWasherRating),
				() -> assertEquals("The given location's latitude is out of the [-90,90] range", messageForInvalidLatitude),
				() -> assertEquals("The given location's longitude is out of the [-180,180] range", messageForInvalidLongitude)
			);

	}

}
