package com.carwash.orderservice.exceptions;

@SuppressWarnings("serial")
public class InvalidStatusException extends Exception{
	
	public InvalidStatusException(String status) {
		super(status+" is not a valid value for the status of an order");
	}
	
}
