package com.carwash.userservice.exceptions;

@SuppressWarnings("serial")
public class InvalidEmailException extends Exception {

	public InvalidEmailException() {
		super("The given email is not a valid email address");
	}
	public InvalidEmailException(String email) {
		super(email+" is not a valid email address");
	}
	
}
