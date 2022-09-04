package com.carwash.userservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carwash.userservice.repository.CarRepository;

@Service
public class CarServiceImpl {

	@Autowired
	CarRepository carRepository;
	
	public void setRepository(CarRepository carRepository) {
		this.carRepository = carRepository;
	}
	
}
