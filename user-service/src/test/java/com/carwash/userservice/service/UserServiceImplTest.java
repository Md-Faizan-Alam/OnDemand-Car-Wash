package com.carwash.userservice.service;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.carwash.userservice.model.User;
import com.carwash.userservice.repository.UserRepository;
import com.carwash.userservice.wrapper.StringList;

class UserServiceImplTest {
	
	UserServiceImpl userService;
	
	@BeforeEach
	void init() {
		UserRepository mockUserRepository = mock(UserRepository.class);
		userService = new UserServiceImpl();
		userService.setRepository(mockUserRepository);
	}

	@Test
	@DisplayName("Test for insertion of User")
	void testInsertUser() {
		User validUser = new User(null, "John", "Doe", "johndoe@gmail.com", "john1234", "CUSTOMER", new ArrayList<String>(), "1234567890");
		User invalidUser = new User(null, "John", "Doe", "johndoegmail.com", "john1234", "HELLO", new ArrayList<String>(), "0234567890");
		User user = new User(validUser);
		
		when(userService.userRepository.save(user)).thenReturn(user);
		
		String mesaageForValidUser = userService.insertUser(user);
		
		user.setEmail(invalidUser.getEmail());
		String messageForInvalidEmail = userService.insertUser(user);
		user.setEmail(validUser.getEmail());
		
		
		user.setRole(invalidUser.getRole());
		String messageForInvalidRole = userService.insertUser(user);
		user.setRole(validUser.getRole());
		
		user.setPhoneNumber(invalidUser.getPhoneNumber());
		String messageForInvalidPhoneNumber = userService.insertUser(user);
		user.setPhoneNumber(validUser.getPhoneNumber());
		
		assertAll(
				()-> assertEquals("User saved successfully",mesaageForValidUser),
				()-> assertEquals(invalidUser.getEmail()+" is not a valid email address",messageForInvalidEmail),
				()-> assertEquals(invalidUser.getRole()+" is not a valid role for a User", messageForInvalidRole),
				()-> assertEquals(invalidUser.getPhoneNumber()+" is not a valid phone number", messageForInvalidPhoneNumber)
				);
		
	}
	
	@Test
	@DisplayName("Test for updation of User")
	void tsetUpdateUser() {
		User validUser = new User("ur8ur8umr8u0iei09ei", "John", "Doe", "johndoe@gmail.com", "john1234", "CUSTOMER", new ArrayList<String>(), "1234567890");
		User invalidUser = new User("fowuuud09duwa09diii", "John", "Doe", "johndoegmail.com", "john1234", "HELLO", new ArrayList<String>(), "0234567890");
		User user = new User(validUser);
		
		when(userService.userRepository.existsById("ur8ur8umr8u0iei09ei")).thenReturn(true);
		when(userService.userRepository.existsById("fowuuud09duwa09diii")).thenReturn(false);
		when(userService.userRepository.save(user)).thenReturn(user);
		
		String mesaageForValidUser = userService.updateUser(user);
		
		user.setUserId(invalidUser.getUserId());
		String messageForNonExistentUser = userService.updateUser(user);
		user.setUserId(validUser.getUserId());
		
		user.setEmail(invalidUser.getEmail());
		String messageForInvalidEmail = userService.updateUser(user);
		user.setEmail(validUser.getEmail());
		
		
		user.setRole(invalidUser.getRole());
		String messageForInvalidRole = userService.updateUser(user);
		user.setRole(validUser.getRole());
		
		user.setPhoneNumber(invalidUser.getPhoneNumber());
		String messageForInvalidPhoneNumber = userService.updateUser(user);
		user.setPhoneNumber(validUser.getPhoneNumber());
		
		assertAll(
				()-> assertEquals("User updated successfully",mesaageForValidUser),
				()-> assertEquals("User with this Id does not Exist",messageForNonExistentUser),
				()-> assertEquals(invalidUser.getEmail()+" is not a valid email address",messageForInvalidEmail),
				()-> assertEquals(invalidUser.getRole()+" is not a valid role for a User", messageForInvalidRole),
				()-> assertEquals(invalidUser.getPhoneNumber()+" is not a valid phone number", messageForInvalidPhoneNumber)
				);
		
	}
	
	@Test
	@DisplayName("Test for deletion of User")
	void testDeleteUser() {
		StringList stringList = new StringList();
		stringList.add("093q98eue3r93r98m");
		when(userService.userRepository.existsById("093q98eue3r93r98m")).thenReturn(false);
		boolean nonExistentUserIsDeleted = userService.deleteUsers(stringList);
		when(userService.userRepository.existsById("093q98eue3r93r98m")).thenReturn(true);
		boolean existentUserIsDeleted = userService.deleteUsers(stringList);
		
		assertAll(
				()-> assertFalse(nonExistentUserIsDeleted),
				()-> assertTrue(existentUserIsDeleted)
				);
		
		
	}

}
