package com.carwash.washerservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carwash.washerservice.model.AddOn;
import com.carwash.washerservice.model.Filter;
import com.carwash.washerservice.repository.AddOnRepository;
import com.carwash.washerservice.wrapper.AddOnList;
import com.carwash.washerservice.wrapper.StringList;

@Service
public class AddOnServiceImpl implements AddOnService{
	
	@Autowired
	AddOnRepository addOnRepository;
	
	/* Method that takes a repository interface as an input
	 and uses it to replace the one that was being previously used.
	 This method is used during testing in order to replace
	 the repository interface with it's mocked variant */
	public void setRepo(AddOnRepository addOnRepository) {
		this.addOnRepository = addOnRepository;
	}
	
	// Method that returns a boolean representing if the given add-on is valid or not
	public boolean validateAddOn(AddOn addOn) {
		if(addOn.getPrice() <= 50) return false;
		return true;
	}
	
	// Method to insert a new add-on to the database
	public boolean insertAddOn(AddOn addOn) {
		if(this.validateAddOn(addOn)) {
			addOnRepository.save(addOn);
			return true;
		}
		return false;
	}
	
	// Method to get the list of all add-ons from the database
	public AddOnList getAllAddOns() {
		List<AddOn> addOnList = addOnRepository.findAll();
		return new AddOnList(addOnList);
	}
	
	// Method to replace an existing add-on with the given add-on. Everything but the id can be different
	public boolean updateAddOn(AddOn addOn){
		if(addOnRepository.countByAddOnId(addOn.getAddOnId()) == 0) return false;
		if(this.validateAddOn(addOn)) {
			addOnRepository.save(addOn);
			return true;
		}
		return false;
	}
	
	// Method that takes a list of id(s) as input and deletes every single add-on corresponding to these id(s)
	public boolean deleteAddOns(StringList stringList) {
		List<String> allStrings = stringList.getStringList();
		for(String id: allStrings) {
			if(addOnRepository.countByAddOnId(id) == 0) return false;
		}
		for(String id: allStrings) {
			addOnRepository.deleteByAddOnId(id);
		}
		return true;
	}
	
	// Method that takes a filter object and returns a list of add-ons filtered according to the given specifications
	public AddOnList getFilteredAddOns(Filter filter) {
		List<AddOn> addOnList;
		if(filter.getSortBy().equals("addOnTitle")) {
			addOnList = addOnRepository.getAddOnsOrderedByTitle(filter.getMinPrice(), filter.getMaxPrice());			
		}else {
			addOnList = addOnRepository.getAddOnsOrderedByPrice(filter.getMinPrice(), filter.getMaxPrice());			
		}
		return new AddOnList(addOnList);
	}
	
}
