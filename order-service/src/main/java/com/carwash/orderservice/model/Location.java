package com.carwash.orderservice.model;

import com.carwash.orderservice.exceptions.LatitudeOutOfRangeException;
import com.carwash.orderservice.exceptions.LongitudeOutOfRangeException;

public class Location {
	
	private double lat;
	private double lng;
	
	public Location() {
	}
	public Location(double lat, double lng) {
		this.lat = lat;
		this.lng = lng;
	}
	public double getLat() {
		return lat;
	}
	public void setLat(double lat) {
		this.lat = lat;
	}
	public double getLng() {
		return lng;
	}
	public void setLng(double lng) {
		this.lng = lng;
	}
	
	public void validate() throws LatitudeOutOfRangeException,LongitudeOutOfRangeException{
		if( this.lat > 90 || this.lat < -90 ) {
			throw new LatitudeOutOfRangeException();
		}
		if( this.lng > 180 || this.lng < -180 ) {
			throw new LongitudeOutOfRangeException();
		}
	}
	
}
