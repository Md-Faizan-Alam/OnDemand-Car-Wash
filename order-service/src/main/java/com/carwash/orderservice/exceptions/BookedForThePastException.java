package com.carwash.orderservice.exceptions;

@SuppressWarnings("serial")
public class BookedForThePastException extends Exception{
	
	public BookedForThePastException() {
		super("An order can not be scheduled for a date in the past");
	}
	
	public BookedForThePastException(String message) {
		super(message);
	}
	
}
