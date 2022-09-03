package com.carwash.orderservice.model;

import com.carwash.orderservice.exceptions.LatitudeOutOfRangeException;
import com.carwash.orderservice.exceptions.LongitudeOutOfRangeException;

public class Location {
	
	private double latitude;
	private double longitude;
	
	public Location() {
	}
	public Location(double latitude, double longitude) {
		this.latitude = latitude;
		this.longitude = longitude;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	
	public void validate() throws LatitudeOutOfRangeException,LongitudeOutOfRangeException{
		if( this.latitude > 90 || this.latitude < -90 ) {
			throw new LatitudeOutOfRangeException();
		}
		if( this.longitude > 180 || this.longitude < -180 ) {
			throw new LongitudeOutOfRangeException();
		}
	}
	
}
