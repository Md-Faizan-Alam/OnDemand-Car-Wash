package com.carwash.userservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.carwash.userservice.exceptions.CustomerNotFoundException;
import com.carwash.userservice.model.Car;
import com.carwash.userservice.model.User;
import com.carwash.userservice.repository.CarRepository;
import com.carwash.userservice.wrapper.CarList;
import com.carwash.userservice.wrapper.StringList;

@Service
public class CarServiceImpl implements CarService {

	@Autowired
	CarRepository carRepository;

	@Autowired
	UserService userService;

	@Autowired
	MongoTemplate mongoTemplate;

	public void setRepository(CarRepository carRepository) {
		this.carRepository = carRepository;
	}
	
	public boolean doesExist(String carId) {
		return carRepository.existsById(carId);
	}

	public void validateCustomerId(String customerId) throws Exception {
		if (customerId == null) {
			throw new Exception("Customer Id cannot be null");
		}
		Query query = new Query(Criteria.where("userId").is(customerId).and("role").is("CUSTOMER"));
		if (mongoTemplate.exists(query, User.class))
			return;
		throw new CustomerNotFoundException(customerId);
	}

	public void validateCar(Car car) throws Exception {
		try {
			validateCustomerId(car.getCustomerId());
			car.validateCarTypes();
			car.validateColor();
			car.validateRegistrationNumber();
		} catch (Exception e) {
			throw e;
		}
	}

	public String insertCar(Car car) {
		if (car.getCarId() != null) {
			if (carRepository.existsById(car.getCarId())) {
				return "Car Already Exists";
			}
		}
		try {
			validateCar(car);
			car = carRepository.save(car);
			userService.addCarToUser(car.getCustomerId(), car.getCarId());
			return "Car saved successfully";
		} catch (Exception e) {
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
		} catch (Exception e) {
			return e.getMessage();
		}
	}

	public String deleteCars(StringList stringList) {
		for (String carId : stringList.getStringList()) {
			if (!carRepository.existsById(carId))
				return "Car with one of these Ids does not exist";
		}
		
		for (String carId : stringList.getStringList()) {
			Car car = carRepository.findById(carId).get();
			User user = userService.getUserById(car.getCustomerId()).get();
			user.getCarIds().remove(carId);
			userService.updateUser(user);
		}
		
		carRepository.deleteAllById(stringList.getStringList());
		return "Cars deleted successfully";
	}
	
	public CarList getCarsByUsername(String username) {
		List<String> carIds = new ArrayList<String>();
		try {
			carIds = userService.getUserByUsername(username).getCarIds();
		} catch (Exception e) {
			e.printStackTrace();
		}
		List<Car> carList = (List<Car>)carRepository.findAllById(carIds);
		return new CarList(carList);
	}
	
	public Car getCarById(String id) {
		Optional<Car> optionalCar = carRepository.findById(id);
		try {
			return optionalCar.get();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return new Car(null,"No Car Found",null,null,"#000000",null);
	}

}
