package com.carwash.washerservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("WASH_PACK")
public class WashPack {
	
	@Id
	private String id;
	private String title;
	private String description;
	private int price;
	
	public WashPack() {
		
	}
	
	public WashPack(String id, String title, String description, int price) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.price = price;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
}
