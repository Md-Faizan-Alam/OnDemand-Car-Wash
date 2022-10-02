package com.carwash.adminservice.model;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("url")
@RefreshScope
public class UrlCollection {

	private String washPack;
	private String addOn;
	private String car;
	private String washer;
	private String user;
	private String order;
	
	public UrlCollection() {}
	
	public UrlCollection(String washPack, String addOn, String car, String washer, String user, String order) {
		this.washPack = washPack;
		this.addOn = addOn;
		this.car = car;
		this.washer = washer;
		this.user = user;
		this.order = order;
	}
	
	public String getWashPack() {
		return washPack;
	}
	public void setWashPack(String washPack) {
		this.washPack = washPack;
	}
	public String getAddOn() {
		return addOn;
	}
	public void setAddOn(String addOn) {
		this.addOn = addOn;
	}
	public String getCar() {
		return car;
	}
	public void setCar(String car) {
		this.car = car;
	}
	public String getWasher() {
		return washer;
	}
	public void setWasher(String washer) {
		this.washer = washer;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}
	
	
}
