package com.carwash.washerservice.model;

import java.util.Arrays;
import java.util.List;

/* The Filter object is a set of specifications posted by the user containing
 information about how they want the list of wash packs or add-ons to be filtered */
public class Filter {
	
	private int minPrice;
	private int maxPrice;
	
	// It takes the name of the field w.r.t which the list is to be sorted in ascending order
	// If the string does not match the name of any field then it is sorted by price
	private String field;
	
	private List<String> validFields = Arrays.asList("title","description","price");
	
	public Filter() {
	}
	public Filter(int minPrice, int maxPrice, String field) {
		this.minPrice = minPrice;
		this.maxPrice = maxPrice;
		this.field = field;
	}
	public int getMinPrice() {
		return minPrice;
	}
	public void setMinPrice(int minPrice) {
		this.minPrice = minPrice;
	}
	public int getMaxPrice() {
		return maxPrice;
	}
	public void setMaxPrice(int maxPrice) {
		this.maxPrice = maxPrice;
	}
	public String getField() {
		return field;
	}
	public void setField(String field) {
		this.field = field;
	}
	
	public void validateField() {
		if(this.validFields.contains(this.field)) return;
		this.field = "price";
	}
	
}
