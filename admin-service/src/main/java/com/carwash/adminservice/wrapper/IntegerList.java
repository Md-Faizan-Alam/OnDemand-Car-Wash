package com.carwash.adminservice.wrapper;

import java.util.ArrayList;
import java.util.List;

// Wrapper class to store the list of id(s) as a single object so that it can be easily parsed on the other side
public class IntegerList {
	private List<Integer> integerList = new ArrayList<Integer>();;
	
	public IntegerList() {}
	public IntegerList(List<Integer> integerList) {
		this.integerList = integerList;
	}
	public List<Integer> getIntegerList() {
		return integerList;
	}
	public void setIntegerList(List<Integer> integerList) {
		this.integerList = integerList;
	}
	
	public void add(int integer) {
		integerList.add(integer);
	}
	
	
}
