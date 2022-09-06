package com.carwash.userservice.service;

import com.carwash.userservice.model.Car;
import com.carwash.userservice.wrapper.CarList;
import com.carwash.userservice.wrapper.StringList;

public interface CarService {
	
	public String insertCar(Car car);

	public CarList getAllCars();

	public String updateCar(Car car);

	public boolean deleteCars(StringList stringList);
	
}
