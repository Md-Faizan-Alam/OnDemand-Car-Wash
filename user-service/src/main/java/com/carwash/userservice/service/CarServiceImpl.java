package com.carwash.userservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carwash.userservice.model.Car;
import com.carwash.userservice.repository.CarRepository;
import com.carwash.userservice.wrapper.CarList;
import com.carwash.userservice.wrapper.StringList;

@Service
public class CarServiceImpl {

	@Autowired
	CarRepository carRepository;
	
	public void setRepository(CarRepository carRepository) {
		this.carRepository = carRepository;
	}
	
	public void validateCar(Car car) throws Exception {
		try {
			car.validateCarTypes();
			car.validateColor();
			car.validateRegistrationNumber();
		}catch(Exception e){
			throw e;
		}
	}

	public String insertCar(Car car) {
		if(car.getCarId()!= null) {
			if (carRepository.existsById(car.getCarId())) {
				return "Car Already Exists";
			}
		}
		try {
			validateCar(car);
			carRepository.save(car);
			return "Car saved successfully";
		}catch(Exception e) {
			return e.getMessage();
		}
	}

	public CarList getAllCars() {
		List<Car> carList = carRepository.findAll();
		return new CarList(carList);
	}

	public String updateCar(Car car) {
		if (!carRepository.existsById(car.getCarId())) {
			return "Car with this Id does not Exist";
		}
		try {
			validateCar(car);
			carRepository.save(car);
			return "Car updated successfully";
		}catch(Exception e) {
			return e.getMessage();
		}
	}

	public boolean deleteCars(StringList stringList) {
		for (String carId : stringList.getStringList()) {
			if (!carRepository.existsById(carId))
				return false;
		}
		carRepository.deleteAllById(stringList.getStringList());
		return true;
	}
	
	
	
}
