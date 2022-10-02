package com.carwash.adminservice.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("REPORTS")
public class Report {

	@Id
	private String reportId;
	private LocalDateTime computedOn;
	private long increaseInCustomers;
	private long increaseInCars;
	private long increaseInWashers;
	private long ordersPlaced;
	private String mostPopularWashPack;
	private String leastPopularWashPack;
	private String mostPopularAddOn;
	private String leastPopularAddOn;
	private double revenue;

	@Override
	public String toString() {
		String object = "{ " + increaseInCars + ", " + increaseInCustomers + ", " + increaseInWashers + ", "
				+ ordersPlaced + ", " + revenue + ", " + mostPopularWashPack + ", " + leastPopularWashPack + ", "
				+ mostPopularAddOn + ", " + leastPopularAddOn + "  }";
		return object;
	}

	public Report() {
	}

	public Report(String reportId, LocalDateTime computedOn, long increaseInCustomers, long increaseInCars,
			long increaseInWashers, long ordersPlaced, String mostPopularWashPack, String leastPopularWashPack,
			String mostPopularAddOn, String leastPopularAddOn, double revenue) {
		super();
		this.reportId = reportId;
		this.computedOn = computedOn;
		this.increaseInCustomers = increaseInCustomers;
		this.increaseInCars = increaseInCars;
		this.increaseInWashers = increaseInWashers;
		this.ordersPlaced = ordersPlaced;
		this.mostPopularWashPack = mostPopularWashPack;
		this.leastPopularWashPack = leastPopularWashPack;
		this.mostPopularAddOn = mostPopularAddOn;
		this.leastPopularAddOn = leastPopularAddOn;
		this.revenue = revenue;
	}

	public String getReportId() {
		return reportId;
	}

	public void setReportId(String reportId) {
		this.reportId = reportId;
	}

	public LocalDateTime getComputedOn() {
		return computedOn;
	}

	public void setComputedOn(LocalDateTime computedOn) {
		this.computedOn = computedOn;
	}

	public long getIncreaseInCustomers() {
		return increaseInCustomers;
	}

	public void setIncreaseInCustomers(long increaseInCustomers) {
		this.increaseInCustomers = increaseInCustomers;
	}

	public long getIncreaseInCars() {
		return increaseInCars;
	}

	public void setIncreaseInCars(long increaseInCars) {
		this.increaseInCars = increaseInCars;
	}

	public long getIncreaseInWashers() {
		return increaseInWashers;
	}

	public void setIncreaseInWashers(long increaseInWashers) {
		this.increaseInWashers = increaseInWashers;
	}

	public long getOrdersPlaced() {
		return ordersPlaced;
	}

	public void setOrdersPlaced(long ordersPlaced) {
		this.ordersPlaced = ordersPlaced;
	}

	public String getMostPopularWashPack() {
		return mostPopularWashPack;
	}

	public void setMostPopularWashPack(String mostPopularWashPack) {
		this.mostPopularWashPack = mostPopularWashPack;
	}

	public String getLeastPopularWashPack() {
		return leastPopularWashPack;
	}

	public void setLeastPopularWashPack(String leastPopularWashPack) {
		this.leastPopularWashPack = leastPopularWashPack;
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
