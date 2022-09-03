package com.carwash.orderservice.exceptions;

@SuppressWarnings("serial")
public class RatingOutOfRangeException extends Exception{
	
	public RatingOutOfRangeException(String roleOfTheUser) {
		super("The rating given by the "+roleOfTheUser+" is out of the [1,5] range");
	}
	
}
