package com.carwash.washerservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.carwash.washerservice.model.AddOn;

@Repository
public interface AddOnRepository extends MongoRepository<AddOn, String> {
	
}
