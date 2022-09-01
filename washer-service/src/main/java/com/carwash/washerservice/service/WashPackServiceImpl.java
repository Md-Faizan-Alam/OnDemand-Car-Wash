package com.carwash.washerservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carwash.washerservice.model.Filter;
import com.carwash.washerservice.model.WashPack;
import com.carwash.washerservice.repository.WashPackRepository;
import com.carwash.washerservice.wrapper.StringList;
import com.carwash.washerservice.wrapper.WashPackList;

@Service
public class WashPackServiceImpl implements WashPackService{
	
	@Autowired
	WashPackRepository washPackRepository;
	
	/* Method that takes a repository interface as an input
	 and uses it to replace the one that was being previously used.
	 This method is used during testing in order to replace
	 the repository interface with it's mocked variant */
	public void setRepo(WashPackRepository washPackRepository) {
		this.washPackRepository = washPackRepository;
	}
	
	// Method that returns a boolean representing if the given wash pack is valid or not
	public boolean validateWashPack(WashPack washPack) {
		if(washPack.getPrice() <= 300) return false;
		return true;
	}
	
	// Method to insert a new wash pack to the database
	public boolean insertWashPack(WashPack washPack) {
		if(this.validateWashPack(washPack)) {
			washPackRepository.save(washPack);
			return true;
		}
		return false;
	}
	
	// Method to get the list of all wash packs from the database
	public WashPackList getAllWashPacks() {
		List<WashPack> washPackList = washPackRepository.findAll();
		return new WashPackList(washPackList);
	}
	
	// Method to replace an existing wash pack with the given wash pack. Everything but the id can be different
	public boolean updateWashPack(WashPack washPack){
		if(washPackRepository.countByWashPackId(washPack.getWashPackId()) == 0) return false;
		if(this.validateWashPack(washPack)) {
			washPackRepository.save(washPack);
			return true;
		}
		return false;
	}
	
	// Method that takes a list of id(s) as input and deletes every single wash pack corresponding to these id(s)
	public boolean deleteWashPacks(StringList stringList) {
		List<String> allStrings = stringList.getStringList();
		for(String id: allStrings) {
			if(washPackRepository.countByWashPackId(id) == 0) return false;
		}
		for(String id: allStrings) {
			washPackRepository.deleteByWashPackId(id);
		}
		return true;
	}
	
	// Method that takes a filter object and returns a list of wash packs filtered according to the given specifications
	public WashPackList getFilteredWashPacks(Filter filter) {
		List<WashPack> washPackList;
		if(filter.getSortBy().equals("washPackTitle")) {
			washPackList = washPackRepository.getWashPacksOrderedByTitle(filter.getMinPrice(), filter.getMaxPrice());			
		}else {
			washPackList = washPackRepository.getWashPacksOrderedByPrice(filter.getMinPrice(), filter.getMaxPrice());			
		}
		return new WashPackList(washPackList);
	}
	
}
