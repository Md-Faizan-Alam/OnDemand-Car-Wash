package com.carwash.adminservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.carwash.adminservice.model.Report;

@Repository
public interface ReportRepository extends MongoRepository<Report, String> {
}
