package com.carwash.orderservice.wrapper;

import java.util.ArrayList;
import java.util.List;

// Wrapper class to store the list of id(s) as a single object so that it can be easily parsed on the other side
public class StringList {
	private List<String> stringList = new ArrayList<String>();;

	public StringList() {
	}

	public StringList(List<String> stringList) {
		this.stringList = stringList;
	}

	public List<String> getStringList() {
		return stringList;
	}

	public void setStringList(List<String> stringList) {
		this.stringList = stringList;
	}
	
	public void add(String string) {
		stringList.add(string);
	}
	
	public void clear() {
		stringList.clear();
	}
	
	
}
