package com.carwash.adminservice.model;

public class Feedback {
	
	private int rating; // ranging from 1 to 5
	private String review;
	public Feedback() {
	}
	public Feedback(int rating, String review) {
		super();
		this.rating = rating;
		this.review = review;
	}
	public int getRating() {
		return rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	public String getReview() {
		return review;
	}
	public void setReview(String review) {
		this.review = review;
	}
	
	public boolean validateRating() {
		if( this.rating < 1 || this.rating > 5 ) return false;
		return true;
	}
	
	
}
