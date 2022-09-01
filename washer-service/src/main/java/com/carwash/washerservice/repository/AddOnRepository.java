package com.carwash.washerservice.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.carwash.washerservice.model.AddOn;

@Repository
public interface AddOnRepository extends MongoRepository<AddOn, Integer> {
	
	@Query(value = "{addOnId: ?0}")
	public AddOn findByAddOnId(String addOnId);
	
	@Query(value = "{addOnId: ?0}",count = true)
	public long countByAddOnId(String addOnId);
	
	@Query(value = "{addOnId: ?0}",delete = true)
	public void deleteByAddOnId(String addOnId);
	
	@Query(value = "{ price : { $gt : ?0 , $lt : ?1 } }",sort = "{ price : 1 }")
	public List<AddOn> getAddOnsOrderedByPrice(int minPrice, int maxPrice);
	
	@Query(value = "{ price : { $gt : ?0 , $lt : ?1 } }",sort = "{ addOnTitle : 1 }")
	public List<AddOn> getAddOnsOrderedByTitle(int minPrice, int maxPrice);
	
}
