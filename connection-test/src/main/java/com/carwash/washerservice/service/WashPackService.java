package com.carwash.washerservice.service;

import com.carwash.washerservice.model.Filter;
import com.carwash.washerservice.model.WashPack;
import com.carwash.washerservice.wrapper.StringList;
import com.carwash.washerservice.wrapper.WashPackList;

public interface WashPackService {
	
	public boolean doesExists(String washPackId);
	
	public boolean insertWashPack(WashPack washPack);
	
	public WashPackList getAllWashPacks();
	
	public boolean updateWashPack(WashPack washPack);
	
	public boolean deleteWashPacks(StringList stringList);
	
	public WashPackList getFilteredWashPacks(Filter filter);
	
}
