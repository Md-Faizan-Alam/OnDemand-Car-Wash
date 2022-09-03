package com.carwash.orderservice.exceptions;

@SuppressWarnings("serial")
public class NoCompletionDateException extends Exception{
	
	public NoCompletionDateException() {
		super("An order that has been COMPLETED must have a completion time");
	}
	
	public NoCompletionDateException(String message) {
		super(message);
	}
	
}
