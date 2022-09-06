package com.carwash.adminservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.carwash.adminservice.model.Order;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
}
