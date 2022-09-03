package com.carwash.orderservice.exceptions;

@SuppressWarnings("serial")
public class LongitudeOutOfRangeException extends Exception{
	
	public LongitudeOutOfRangeException() {
		super("The given location's longitude is out of the [-180,180] range");
	}
	
	public LongitudeOutOfRangeException(String message) {
		super(message);
	}
	
}
