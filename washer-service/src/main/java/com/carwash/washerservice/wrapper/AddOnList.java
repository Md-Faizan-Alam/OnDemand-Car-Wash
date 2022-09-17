package com.carwash.washerservice.wrapper;

import java.util.List;

import com.carwash.washerservice.model.AddOn;

// Wrapper class to store the list of add-ons as a single object so that it can be easily parsed on the other side
public class AddOnList {
	private List<AddOn> addOnList;
	
	public AddOnList() {
	}
	public AddOnList(List<AddOn> addOnList) {
		this.addOnList = addOnList;
	}
	public List<AddOn> getList() {
		return addOnList;
	}
	public void setAddOnList(List<AddOn> addOnList) {
		this.addOnList = addOnList;
	}
	
	@Override
	public boolean equals(Object obj) {
		if(! (obj instanceof AddOnList) ) return false;
		AddOnList givenObj = (AddOnList)obj;
		List<AddOn> allAddOns = givenObj.getList();
		if( allAddOns.size() != addOnList.size() ) return false;
		for(int i=0;i<allAddOns.size();i++) {
			AddOn myAddOn = addOnList.get(i) , objAddOn = allAddOns.get(i);
			if(myAddOn.getId() != null) {
				if( ! objAddOn.getId().equals( myAddOn.getId() ) ) return false;				
			}
			if( ! objAddOn.getTitle().equals( myAddOn.getTitle() ) ) return false;
			if( ! objAddOn.getDescription().equals( myAddOn.getDescription() ) ) return false;
			if( objAddOn.getPrice() != myAddOn.getPrice() ) return false;
		}
		return true;
	}
	
}
