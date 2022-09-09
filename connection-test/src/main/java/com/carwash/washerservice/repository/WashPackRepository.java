package com.carwash.washerservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.carwash.washerservice.model.WashPack;

@Repository
public interface WashPackRepository extends MongoRepository<WashPack, String>{
}
