package com.carwash.userservice.exceptions;

@SuppressWarnings("serial")
public class InvalidCarTypeException extends Exception {

	public InvalidCarTypeException() {
		super("The given car type is not valid");
	}
	public InvalidCarTypeException(String carType) {
		super(carType+" is not a valid car type");
	}
	
}
