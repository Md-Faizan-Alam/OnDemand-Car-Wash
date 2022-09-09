package com.carwash.washerservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.carwash.washerservice.model.AddOn;
import com.carwash.washerservice.model.Filter;
import com.carwash.washerservice.repository.AddOnRepository;
import com.carwash.washerservice.wrapper.AddOnList;
import com.carwash.washerservice.wrapper.StringList;

@Service
public class AddOnServiceImpl implements AddOnService {

	@Autowired
	AddOnRepository addOnRepository;

	@Autowired
	MongoTemplate mongoTemplate;

	/*
	 * Method that takes a repository interface as an input and uses it to replace
	 * the one that was being previously used. This method is used during testing in
	 * order to replace the repository interface with it's mocked variant
	 */
	public void setRepo(AddOnRepository addOnRepository) {
		this.addOnRepository = addOnRepository;
	}

	// Method to check if a Add-On with the given Id exists or not
	public boolean doesExists(String addOnId) {
		return addOnRepository.existsById(addOnId);
	}

	// Method that returns a boolean representing if the given add-on is valid or
	// not
	public boolean validateAddOn(AddOn addOn) {
		if (addOn.getPrice() <= 50)
			return false;
		return true;
	}

	// Method to insert a new add-on to the database
	public boolean insertAddOn(AddOn addOn) {
		if (addOn.getAddOnId() != null)
			return false;
		if (this.validateAddOn(addOn)) {
			addOnRepository.save(addOn);
			return true;
		}
		return false;
	}

	// Method to get the list of all add-ons from the database
	public AddOnList getAllAddOns() {
		return new AddOnList(addOnRepository.findAll());
	}

	// Method to replace an existing add-on with the given add-on. Everything but
	// the id can be different
	public boolean updateAddOn(AddOn addOn) {
		if (!doesExists(addOn.getAddOnId()))
			return false;
		if (this.validateAddOn(addOn)) {
			addOnRepository.save(addOn);
			return true;
		}
		return false;
	}

	// Method that takes a list of id(s) as input and deletes every single add-on
	// corresponding to these id(s)
	public boolean deleteAddOns(StringList stringList) {
		for (String addOnId : stringList.getStringList()) {
			if (!doesExists(addOnId))
				return false;
		}
		addOnRepository.deleteAllById(stringList.getStringList());
		return true;
	}

	// Method that takes a filter object and returns a list of add-ons filtered
	// according to the given specifications
	public AddOnList getFilteredAddOns(Filter filter) {
		filter.validateField();

		Query query = new Query()
				.addCriteria(Criteria.where("price").gte(filter.getMinPrice()).lte(filter.getMaxPrice()))
				.with(Sort.by(Direction.ASC, filter.getSortBy()));

		return new AddOnList(mongoTemplate.find(query, AddOn.class));
	}

}
