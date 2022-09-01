package com.carwash.washerservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("ADD_ON")
public class AddOn {
	
	@Id
	private String addOnId;
	private String addOnTitle;
	private String addOnDescription;
	private int price;
	
	public AddOn() {
	}
	public AddOn(String addOnId, String addOnTitle, String addOnDescription, int price) {
		super();
		this.addOnId = addOnId;
		this.addOnTitle = addOnTitle;
		this.addOnDescription = addOnDescription;
		this.price = price;
	}
	public String getAddOnId() {
		return addOnId;
	}
	public void setAddOnId(String addOnId) {
		this.addOnId = addOnId;
	}
	public String getAddOnTitle() {
		return addOnTitle;
	}
	public void setAddOnTitle(String addOnTitle) {
		this.addOnTitle = addOnTitle;
	}
	public String getAddOnDescription() {
		return addOnDescription;
	}
	public void setAddOnDescription(String addOnDescription) {
		this.addOnDescription = addOnDescription;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	
}
