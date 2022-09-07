package com.carwash.adminservice.service;

import static org.mockito.Mockito.mock;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.carwash.adminservice.repository.ReportRepository;

class AdminServiceImplTest {

	ReportServiceImpl orderService;

	@BeforeEach
	void init() {
		ReportRepository mockReportRepository = mock(ReportRepository.class);
		orderService = new ReportServiceImpl();
		orderService.setRepository(mockReportRepository);
	}

	@Test
	@DisplayName("Test insertion of orders")
	void testInsertReport() {
	}

}
