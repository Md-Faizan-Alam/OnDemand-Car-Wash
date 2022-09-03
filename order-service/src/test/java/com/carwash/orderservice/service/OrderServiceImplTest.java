package com.carwash.orderservice.service;

import static org.mockito.Mockito.mock;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.carwash.orderservice.repository.OrderRepository;

class OrderServiceImplTest {
	
	OrderServiceImpl orderService;
	
	@BeforeEach
	void init() {
		OrderRepository mockOrderRepository = mock(OrderRepository.class);
		orderService = new OrderServiceImpl();
		orderService.setRepository(mockOrderRepository);
	}

	@Test
	@DisplayName("")
	void testInsertOrder() {
		
	}

}
