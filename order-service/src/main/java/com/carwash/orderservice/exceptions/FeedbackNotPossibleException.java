package com.carwash.orderservice.exceptions;

@SuppressWarnings("serial")
public class FeedbackNotPossibleException extends Exception{
	
	public FeedbackNotPossibleException() {
		super("Incomplete orders can not contain feedback or amount of water used");
	}
	
}
