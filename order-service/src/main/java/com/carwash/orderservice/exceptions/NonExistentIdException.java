package com.carwash.orderservice.exceptions;

@SuppressWarnings("serial")
public class NonExistentIdException extends Exception{
	
	public NonExistentIdException() {
		super("Entitiy with the given Id does not exist");
	}
	
	public NonExistentIdException(String entitiy) {
		super(entitiy+" with the given Id does not exist");
	}
	
}
