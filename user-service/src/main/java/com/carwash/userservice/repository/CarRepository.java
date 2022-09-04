package com.carwash.userservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.carwash.userservice.model.Car;

public interface CarRepository extends MongoRepository<Car, String>{
}
