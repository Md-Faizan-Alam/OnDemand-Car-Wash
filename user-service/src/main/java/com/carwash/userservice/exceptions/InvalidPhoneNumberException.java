package com.carwash.userservice.exceptions;

@SuppressWarnings("serial")
public class InvalidPhoneNumberException extends Exception {

	public InvalidPhoneNumberException() {
		super("The given phone number is not valid");
	}
	public InvalidPhoneNumberException(String phoneNumber) {
		super(phoneNumber+" is not a valid phone number");
	}
	
}
