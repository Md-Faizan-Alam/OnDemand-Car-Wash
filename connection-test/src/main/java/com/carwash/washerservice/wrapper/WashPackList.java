package com.carwash.washerservice.wrapper;

import java.util.List;

import com.carwash.washerservice.model.WashPack;

// Wrapper class to store the list of wash packs as a single object so that it can be easily parsed on the other side
public class WashPackList {
	
	private List<WashPack> washPackList;
	
	public WashPackList() {
	}
	public WashPackList(List<WashPack> washPackList) {
		super();
		this.washPackList = washPackList;
	}
	public List<WashPack> getWashPackList() {
		return washPackList;
	}
	public void setWashPackList(List<WashPack> washPackList) {
		this.washPackList = washPackList;
	}
	
	
	@Override
	public boolean equals(Object obj) {
		if(! (obj instanceof WashPackList) ) return false;
		WashPackList givenObj = (WashPackList)obj;
		List<WashPack> allWashPacks = givenObj.getWashPackList();
		if( allWashPacks.size() != washPackList.size() ) return false;
		for(int i=0;i<allWashPacks.size();i++) {
			WashPack myPack = washPackList.get(i) , objPack = allWashPacks.get(i);
			if(myPack.getWashPackId() != null) {
				if( ! objPack.getWashPackId().equals( myPack.getWashPackId() ) ) return false;				
			}
			if( ! objPack.getWashPackTitle().equals( myPack.getWashPackTitle() ) ) return false;
			if( ! objPack.getWashPackDescription().equals( myPack.getWashPackDescription() ) ) return false;
			if( objPack.getPrice() != myPack.getPrice() ) return false;
		}
		return true;
	}
	
}
