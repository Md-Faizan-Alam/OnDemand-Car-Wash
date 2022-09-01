package com.carwash.washerservice.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.carwash.washerservice.model.WashPack;

@Repository
public interface WashPackRepository extends MongoRepository<WashPack, String>{

	@Query(value = "{washPackId: ?0}")
	public WashPack findByWashPackId(String washPackId);
	
	@Query(value = "{washPackId: ?0}",count = true)
	public long countByWashPackId(String washPackId);
	
	@Query(value = "{washPackId: ?0}",delete = true)
	public void deleteByWashPackId(String washPackId);
	
	@Query(value = "{ price : { $gt : ?0 , $lt : ?1 } }",sort = "{ price : 1 }")
	public List<WashPack> getWashPacksOrderedByPrice(int minPrice, int maxPrice);
	
	@Query(value = "{ price : { $gt : ?0 , $lt : ?1 } }",sort = "{ washPackTitle : 1 }")
	public List<WashPack> getWashPacksOrderedByTitle(int minPrice, int maxPrice);
	
}
