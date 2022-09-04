package com.carwash.userservice.exceptions;

@SuppressWarnings("serial")
public class InvalidRoleException extends Exception{
	
	public InvalidRoleException(String role) {
		super(role+" is not a valid role for a User");
	}
	
}
