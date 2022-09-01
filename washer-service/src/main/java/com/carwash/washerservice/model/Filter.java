package com.carwash.washerservice.model;

/* The Filter object is a set of specifications posted by the user containing
 information about how they want the list of wash packs or add-ons to be filtered */
public class Filter {
	
	private int minPrice;
	private int maxPrice;
	
	// It takes the name of the field w.r.t which the list is to be sorted in ascending order
	// If the string does not match the name of any field then it is sorted by price
	private String sortBy;
	
	public Filter() {
	}
	public Filter(int minPrice, int maxPrice, String sortBy) {
		this.minPrice = minPrice;
		this.maxPrice = maxPrice;
		this.sortBy = sortBy;
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
	public String getSortBy() {
		return sortBy;
	}
	public void setSortBy(String sortBy) {
		this.sortBy = sortBy;
	}
	
}
