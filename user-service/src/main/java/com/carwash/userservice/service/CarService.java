package com.carwash.userservice.service;

import com.carwash.userservice.model.Car;
import com.carwash.userservice.wrapper.CarList;
import com.carwash.userservice.wrapper.StringList;

public interface CarService {
	
	public boolean doesExist(String carId);
	
	public String insertCar(Car car);

	public CarList getAllCars();

	public String updateCar(Car car);

	public String deleteCars(StringList stringList);
	
	public CarList getCarsByUsername(String username);
	
	public Car getCarById(String id);
	
	public long getNoOfCars();
	
	
}
