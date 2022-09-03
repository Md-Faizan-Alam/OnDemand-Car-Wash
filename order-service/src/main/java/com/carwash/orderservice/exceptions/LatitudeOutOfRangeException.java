package com.carwash.orderservice.exceptions;

@SuppressWarnings("serial")
public class LatitudeOutOfRangeException extends Exception{
	
	public LatitudeOutOfRangeException() {
		super("The given location's latitude is out of the [-90,90] range");
	}
	
	public LatitudeOutOfRangeException(String message) {
		super(message);
	}
	
}
