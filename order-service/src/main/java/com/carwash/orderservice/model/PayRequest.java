package com.carwash.orderservice.model;

public class PayRequest {
	private int amount;
	private String currency;
	public PayRequest() {
	}
	public PayRequest(int amount, String currency) {
		super();
		this.amount = amount;
		this.currency = currency;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	
	public String toString() {
		return "{ \"amount\": "+this.amount+", \"currency\": \""+this.currency+"\" }";
	}
	
}
