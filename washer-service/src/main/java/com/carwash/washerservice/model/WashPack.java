package com.carwash.washerservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("WASH_PACK")
public class WashPack {
	
	@Id
	private String washPackId;
	private String washPackTitle;
	private String washPackDescription;
	private int price;
	
	public WashPack() {
		
	}
	
	public WashPack(String washPackId, String washPackTitle, String washPackDescription, int price) {
		super();
		this.washPackId = washPackId;
		this.washPackTitle = washPackTitle;
		this.washPackDescription = washPackDescription;
		this.price = price;
	}

	public String getWashPackId() {
		return washPackId;
	}
	public void setWashPackId(String washPackId) {
		this.washPackId = washPackId;
	}
	public String getWashPackDescription() {
		return washPackDescription;
	}
	public void setWashPackDescription(String washPackDescription) {
		this.washPackDescription = washPackDescription;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getWashPackTitle() {
		return washPackTitle;
	}
	public void setWashPackTitle(String washPackTitle) {
		this.washPackTitle = washPackTitle;
	}
	
}
