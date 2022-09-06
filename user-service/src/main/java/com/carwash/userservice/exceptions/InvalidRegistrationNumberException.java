package com.carwash.userservice.exceptions;

@SuppressWarnings("serial")
public class InvalidRegistrationNumberException extends Exception {

	public InvalidRegistrationNumberException() {
		super("The given registration number is not valid");
	}
	public InvalidRegistrationNumberException(String registrationNumber) {
		super(registrationNumber+" is not a valid registration number");
	}
	
}
