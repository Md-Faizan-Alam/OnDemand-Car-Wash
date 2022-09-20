package com.carwash.washerservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.carwash.washerservice.model.Filter;
import com.carwash.washerservice.model.WashPack;
import com.carwash.washerservice.repository.WashPackRepository;
import com.carwash.washerservice.security.AuthenticationRequest;
import com.carwash.washerservice.security.MyUserDetails;
import com.carwash.washerservice.wrapper.StringList;
import com.carwash.washerservice.wrapper.WashPackList;

@Service
public class WashPackServiceImpl implements WashPackService {

	@Autowired
	WashPackRepository washPackRepository;

	@Autowired
	MongoTemplate mongoTemplate;
	
	@Autowired
	RestTemplate restTemplate;

	/*
	 * Method that takes a repository interface as an input and uses it to replace
	 * the one that was being previously used. This method is used during testing in
	 * order to replace the repository interface with it's mocked variant
	 */
	public void setRepo(WashPackRepository washPackRepository) {
		this.washPackRepository = washPackRepository;
	}

	// Method to check if a Wash Pack with the given Id exists or not
	public boolean doesExists(String washPackId) {
		return washPackRepository.existsById(washPackId);
	}

	// Method that returns a boolean representing if the given wash pack is valid or
	// not
	public boolean validateWashPack(WashPack washPack) {
		if (washPack.getPrice() <= 300)
			return false;
		return true;
	}

	// Method to insert a new wash pack to the database
	public boolean insertWashPack(WashPack washPack) {
		if (washPack.getId() != null)
			return false;
		if (this.validateWashPack(washPack)) {
			washPackRepository.save(washPack);
			return true;
		}
		return false;
	}

	// Method to get the list of all wash packs from the database
	public WashPackList getAllWashPacks() {
		return new WashPackList(washPackRepository.findAll());
	}
	
	public WashPack getWashPackById(String id) {
		Optional<WashPack> optionalWashPack = washPackRepository.findById(id);
		try {
			return optionalWashPack.get();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return new WashPack(null,"No Pack selected","There is no description available",0);
	}

	// Method to replace an existing wash pack with the given wash pack. Everything
	// but the id can be different
	public boolean updateWashPack(WashPack washPack) {
		if (!doesExists(washPack.getId()))
			return false;
		if (this.validateWashPack(washPack)) {
			washPackRepository.save(washPack);
			return true;
		}
		return false;
	}

	// Method that takes a list of id(s) as input and deletes every single wash pack
	// corresponding to these id(s)
	public boolean deleteWashPacks(StringList stringList) {
		for (String washPackId : stringList.getStringList()) {
			if (!doesExists(washPackId))
				return false;
		}
		washPackRepository.deleteAllById(stringList.getStringList());
		return true;
	}

	// Method that takes a filter object and returns a list of wash packs filtered
	// according to the given specifications
	public WashPackList getFilteredWashPacks(Filter filter) {

		filter.validateField();

		Query query = new Query()
				.addCriteria(Criteria.where("price").gte(filter.getMinPrice()).lte(filter.getMaxPrice()))
				.with(Sort.by(Direction.ASC, filter.getSortBy()));

		List<WashPack> washPackList = mongoTemplate.find(query, WashPack.class);

		return new WashPackList(washPackList);

	}
	
	public MyUserDetails getUserByUsername(String username) {
		AuthenticationRequest authRequest = new AuthenticationRequest(username,"secretsarenevertobeshared");
		MyUserDetails userDetails = restTemplate
				.exchange( "http://api-gateway/user/getUserDetails" , HttpMethod.POST, new HttpEntity<Object>(authRequest), MyUserDetails.class)
				.getBody();
		return userDetails;
	}

}
