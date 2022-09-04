package com.carwash.userservice.service;

import static org.mockito.Mockito.mock;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.carwash.userservice.repository.UserRepository;

class UserServiceImplTest {
	
	UserServiceImpl userService;
	
	@BeforeEach
	void init() {
		UserRepository mockUserRepository = mock(UserRepository.class);
		userService = new UserServiceImpl();
		userService.setRepository(mockUserRepository);
	}

	@Test
	@DisplayName("")
	void testInsertUser() {
		
	}

}
