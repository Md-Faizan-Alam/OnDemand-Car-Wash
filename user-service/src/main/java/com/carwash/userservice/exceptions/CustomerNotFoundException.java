package com.carwash.userservice.exceptions;

@SuppressWarnings("serial")
public class CustomerNotFoundException extends Exception {

	public CustomerNotFoundException() {
		super("Customer with the given Id does not exist");
	}
	public CustomerNotFoundException(String customerId) {
		super("No customer with the Id "+customerId+" found");
	}
	
}
