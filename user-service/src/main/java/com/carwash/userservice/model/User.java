package com.carwash.userservice.model;

import java.util.Arrays;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.carwash.userservice.exceptions.InvalidEmailException;
import com.carwash.userservice.exceptions.InvalidRoleException;

@Document("USERS")
public class User {
	
	@Id
	private String userId;
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String role;
	private List<String> carIds;
	
	private static final List<String> validRoles = Arrays.asList("CUSTOMER" , "WASHER" , "ADMIN");
	
	
	public User() {}
	public User(String userId, String firstName, String lastName, String email, String password, String role,
			List<String> carIds) {
		this.userId = userId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.role = role;
		this.carIds = carIds;
	}
	
	public User(String email, String password) {
		this.email = email;
		this.password = password;
	}


	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
	
	public void validateRole() throws InvalidRoleException{
		if(!validRoles.contains(this.role)) {
			throw new InvalidRoleException(role);
		}
	}
	
	public void validateEmail() throws InvalidEmailException{
		if(!this.email.matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")){
			throw new InvalidEmailException(email);
		}
	}
	public List<String> getCarIds() {
		return carIds;
	}
	public void setCarIds(List<String> carIds) {
		this.carIds = carIds;
	}
	
	
	
	
}
