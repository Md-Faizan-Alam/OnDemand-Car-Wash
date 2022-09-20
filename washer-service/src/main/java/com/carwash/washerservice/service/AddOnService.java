package com.carwash.washerservice.service;

import com.carwash.washerservice.model.AddOn;
import com.carwash.washerservice.model.Filter;
import com.carwash.washerservice.wrapper.AddOnList;
import com.carwash.washerservice.wrapper.StringList;

public interface AddOnService {
	
	public boolean doesExists(String addOnId);
	
	public boolean insertAddOn(AddOn addOn);
	
	public AddOnList getAllAddOns();
	
	public boolean updateAddOn(AddOn addOn);
	
	public boolean deleteAddOns(StringList stringList);
	
	public AddOnList getFilteredAddOns(Filter filter);
	
	public AddOnList getAddOnsById(StringList idList);
	
}
