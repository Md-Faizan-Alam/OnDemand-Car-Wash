package com.carwash.userservice.model;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.carwash.userservice.exceptions.InvalidEmailException;
import com.carwash.userservice.exceptions.InvalidPhoneNumberException;
import com.carwash.userservice.exceptions.InvalidRoleException;

@Document("USERS")
public class User {
	
	private static final List<String> validRoles = Arrays.asList("CUSTOMER" , "WASHER" , "ADMIN");
	private static final List<String> validGenders = Arrays.asList("MALE" , "FEMALE" , "OTHER");
	@Id
	private String userId;
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String role;
	private List<String> carIds;
	private String phoneNumber;
	private LocalDate dateOfBirth;
	private String gender;
	
	
	public User() {
	}
	public User(String userId, String firstName, String lastName, String email, String password, String role,
			List<String> carIds, String phoneNumber, LocalDate dateOfBirth, String gender) {
		super();
		this.userId = userId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.role = role;
		this.carIds = carIds;
		this.phoneNumber = phoneNumber;
		this.dateOfBirth = dateOfBirth;
		this.gender = gender;
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
	public List<String> getCarIds() {
		return carIds;
	}
	public void setCarIds(List<String> carIds) {
		this.carIds = carIds;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	
	
	// Custom Constructors and functions
	public User(String email, String password) {
		this.email = email;
		this.password = password;
	}
	
	public User(User user) {
		this.userId = user.getUserId();
		this.firstName = user.getFirstName();;
		this.lastName = user.getLastName();
		this.email = user.getEmail();
		this.password = user.getPassword();
		this.role = user.getRole();
		this.carIds = user.getCarIds();
		this.phoneNumber = user.getPhoneNumber();
	}
	
	public void validateEmail() throws InvalidEmailException{
		if(this.email.matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")) return;
		throw new InvalidEmailException(this.email);
	}
	public void validateGender() throws Exception{
		if(!validGenders.contains(this.gender)) {
			throw new Exception(this.gender+" is not a valid gender for a user");
		}
	}
	public void validatePhoneNumber() throws InvalidPhoneNumberException{
		if(this.phoneNumber.matches("^[1-9][0-9]{9}$")) return;
		throw new InvalidPhoneNumberException(this.phoneNumber);
	}
	
	public void validateRole() throws InvalidRoleException{
		if(!validRoles.contains(this.role)) {
			throw new InvalidRoleException(role);
		}
	}
	
	
	
}
