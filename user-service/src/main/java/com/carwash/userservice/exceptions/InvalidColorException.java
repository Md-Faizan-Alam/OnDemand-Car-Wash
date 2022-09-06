package com.carwash.userservice.exceptions;

@SuppressWarnings("serial")
public class InvalidColorException extends Exception {

	public InvalidColorException() {
		super("The given color code is not valid");
	}
	public InvalidColorException(String color) {
		super(color+" is not a valid color code");
	}
	
}
