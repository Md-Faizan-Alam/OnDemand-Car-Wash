package com.carwash.userservice.model;

import java.util.Arrays;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.carwash.userservice.exceptions.InvalidCarTypeException;
import com.carwash.userservice.exceptions.InvalidColorException;
import com.carwash.userservice.exceptions.InvalidRegistrationNumberException;

@Document("CARS")
public class Car {

	@Id
	private String carId;

	private String customerId;
	private String carType;
	private String color;
	private String registrationNumber;
	
	private static List<String> validCarTypes = Arrays.asList( "SEDAN" , "HATCHBACK" , "CONVERTIBLE" , "COUPE" , "MINIVAN" , "STATION_WAGON" , "PICK_UP_TRUCK" , "TRUCK" , "OFF_ROAD" , "VAN" );
	
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
	
	public void validateCarTypes() throws InvalidCarTypeException{
		if(validCarTypes.contains(this.carType)) return;
		throw new InvalidCarTypeException(this.carType);
	}
	
	public void validateColor() throws InvalidColorException {
		if(this.color.matches("^#[A-Fa-f0-9]{6}$")) return;
		throw new InvalidColorException(this.color);
	}
	
	public void validateRegistrationNumber() throws InvalidRegistrationNumberException{
		if(this.registrationNumber.matches("^[A-Z]{2}[0-9]{4}$")) return;
		throw new InvalidRegistrationNumberException(this.registrationNumber);
	}
	
	
}
