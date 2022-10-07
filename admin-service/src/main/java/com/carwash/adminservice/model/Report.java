package com.carwash.adminservice.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("REPORTS")
public class Report {

	@Id
	private String id;
	private LocalDateTime date;
	private long customers;
	private long cars;
	private long washers;
	private long ordersPlaced;
	private String mostPopularPack;
	private String leastPopularPack;
	private String mostPopularAddOn;
	private String leastPopularAddOn;
	private double revenue;

	@Override
	public String toString() {
		String object = "{ " + cars + ", " + customers + ", " + washers + ", "
				+ ordersPlaced + ", " + revenue + ", " + mostPopularPack + ", " + leastPopularPack + ", "
				+ mostPopularAddOn + ", " + leastPopularAddOn + "  }";
		return object;
	}

	public Report() {
	}

	public Report(String id, LocalDateTime date, long customers, long cars,
			long washers, long ordersPlaced, String mostPopularPack, String leastPopularPack,
			String mostPopularAddOn, String leastPopularAddOn, double revenue) {
		this.id = id;
		this.date = date;
		this.customers = customers;
		this.cars = cars;
		this.washers = washers;
		this.ordersPlaced = ordersPlaced;
		this.mostPopularPack = mostPopularPack;
		this.leastPopularPack = leastPopularPack;
		this.mostPopularAddOn = mostPopularAddOn;
		this.leastPopularAddOn = leastPopularAddOn;
		this.revenue = revenue;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public long getCustomers() {
		return customers;
	}

	public void setCustomers(long customers) {
		this.customers = customers;
	}

	public long getCars() {
		return cars;
	}

	public void setCars(long cars) {
		this.cars = cars;
	}

	public long getWashers() {
		return washers;
	}

	public void setWashers(long washers) {
		this.washers = washers;
	}

	public long getOrdersPlaced() {
		return ordersPlaced;
	}

	public void setOrdersPlaced(long ordersPlaced) {
		this.ordersPlaced = ordersPlaced;
	}

	public String getMostPopularPack() {
		return mostPopularPack;
	}

	public void setMostPopularPack(String mostPopularPack) {
		this.mostPopularPack = mostPopularPack;
	}

	public String getLeastPopularPack() {
		return leastPopularPack;
	}

	public void setLeastPopularPack(String leastPopularPack) {
		this.leastPopularPack = leastPopularPack;
	}

	public String getMostPopularAddOn() {
		return mostPopularAddOn;
	}

	public void setMostPopularAddOn(String mostPopularAddOn) {
		this.mostPopularAddOn = mostPopularAddOn;
	}

	public String getLeastPopularAddOn() {
		return leastPopularAddOn;
	}

	public void setLeastPopularAddOn(String leastPopularAddOn) {
		this.leastPopularAddOn = leastPopularAddOn;
	}

	public double getRevenue() {
		return revenue;
	}

	public void setRevenue(double revenue) {
		this.revenue = revenue;
	}

}
