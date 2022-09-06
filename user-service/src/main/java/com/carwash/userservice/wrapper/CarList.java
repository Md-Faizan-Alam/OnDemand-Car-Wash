package com.carwash.userservice.wrapper;

import java.util.ArrayList;
import java.util.List;

import com.carwash.userservice.model.Car;

public class CarList {

	private List<Car> carList = new ArrayList<>();
	
	public CarList() {}
	public CarList(List<Car> carList) {
		this.carList = carList;
	}

	public List<Car> getCarList() {
		return carList;
	}

	public void setCarList(List<Car> carList) {
		this.carList = carList;
	}
	
}
