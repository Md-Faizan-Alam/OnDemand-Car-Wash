package com.carwash.userservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("CARS")
public class Car {

	@Id
	private String carId;
	private String customerId;
	private String carType;
	private String color;
	private String registrationNumber;
	public Car() {}
	public Car(String carId, String customerId, String carType, String color, String registrationNumber) {
		this.carId = carId;
		this.customerId = customerId;
		this.carType = carType;
		this.color = color;
		this.registrationNumber = registrationNumber;
	}
	public String getCarId() {
		return carId;
	}
	public void setCarId(String carId) {
		this.carId = carId;
	}
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public String getCarType() {
		return carType;
	}
	public void setCarType(String carType) {
		this.carType = carType;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getRegistrationNumber() {
		return registrationNumber;
	}
	public void setRegistrationNumber(String registrationNumber) {
		this.registrationNumber = registrationNumber;
	}
	
}
