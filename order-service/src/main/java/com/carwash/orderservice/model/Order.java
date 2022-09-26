package com.carwash.orderservice.model;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import com.carwash.orderservice.exceptions.BookedForThePastException;
import com.carwash.orderservice.exceptions.FeedbackNotPossibleException;
import com.carwash.orderservice.exceptions.InvalidStatusException;
import com.carwash.orderservice.exceptions.NoCompletionDateException;
import com.carwash.orderservice.exceptions.RatingOutOfRangeException;
import com.carwash.orderservice.wrapper.StringList;

@Document("ORDERS")
public class Order {
	
	@Id
	private String orderId;
	private String carId;			// Id of the car associated with the order
	private String carName;			// Model Name of the car
	private String washPackId;		// Id of the Wash Pack that is in the order
	private String washPackTitle;	// Title of the Wash Pack
	private StringList addOnIdList = new StringList();	// A list of Id(s) of the AddOns that are associated with the List
	private double amount;			// The total amount that is paid by the customer for the order
	@Field(targetType = FieldType.DATE_TIME)
	private LocalDateTime bookingTime;		// The time and date of booking
	private Location location;		// Location in which the process is to take place
	private String status;			// It can have values like [ "PENDING" , "IN_PROCESS" , "COMPLETED" , "CANCELLED" , "TERMINATED" ]
	
	// Can be null till order is not accepted by any washer
	private String washerId;		// Id of the washer associated with the order
	
	@Field(targetType = FieldType.DATE_TIME)
	private LocalDateTime completionTime;	// The time and date of completion
	
	private Feedback customerFeedback;	// Feedback provided by the customer
	private Feedback washerFeedback;	// Feedback provided by the washer
	
	// Can be null if order is not completed yet
	private int bucketsOfWaterUsed;	// To be filled by the washer after completion of wash process
	
	
	// List of acceptable values that the status field can have
	private static List<String> validStatus =  Arrays.asList( "PENDING" , "IN_PROCESS" , "COMPLETED" , "CANCELLED" , "TERMINATED" );

	// Custom Constructor
	public Order(String carId, String carName, String washPackId, String washPackTitle, StringList addOnIdList, double amount, Location location , LocalDateTime completionTime) {
		
		this.carId = carId;
		this.carName = carName;
		this.washPackId = washPackId;
		this.washPackTitle = washPackTitle;
		this.addOnIdList = addOnIdList;
		this.amount = amount;
		this.location = location;
		
		this.bookingTime = LocalDateTime.now();
		this.status = "PENDING";
		this.washerId = null;
		this.completionTime = completionTime;
		this.customerFeedback = null;
		this.washerFeedback = null;
		this.bucketsOfWaterUsed = 0;
	}
	
	
	public Order() {}
	public Order(String orderId, String carId, String washPackId, StringList addOnIdList, double amount,
			LocalDateTime bookingTime, Location location, String status, String washerId, LocalDateTime completionTime,
			Feedback customerFeedback, Feedback washerFeedback, int bucketsOfWaterUsed) {
		this.orderId = orderId;
		this.carId = carId;
		this.washPackId = washPackId;
		this.addOnIdList = addOnIdList;
		this.amount = amount;
		this.bookingTime = bookingTime;
		this.location = location;
		this.status = status;
		this.washerId = washerId;
		this.completionTime = completionTime;
		this.customerFeedback = customerFeedback;
		this.washerFeedback = washerFeedback;
		this.bucketsOfWaterUsed = bucketsOfWaterUsed;
	}


	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public String getCarId() {
		return carId;
	}

	public void setCustomerId(String carId) {
		this.carId = carId;
	}

	public String getWashPackId() {
		return washPackId;
	}

	public void setWashPackId(String washPackId) {
		this.washPackId = washPackId;
	}

	public StringList getAddOnIdList() {
		return addOnIdList;
	}

	public void setAddOnIdList(StringList addOnIdList) {
		this.addOnIdList = addOnIdList;
	}
	
	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public LocalDateTime getBookingTime() {
		return bookingTime;
	}

	public void setBookingTime(LocalDateTime bookingTime) {
		this.bookingTime = bookingTime;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getWasherId() {
		return washerId;
	}

	public void setWasherId(String washerId) {
		this.washerId = washerId;
	}

	public LocalDateTime getCompletionTime() {
		return completionTime;
	}

	public void setCompletionTime(LocalDateTime completionTime) {
		this.completionTime = completionTime;
	}

	public Feedback getCustomerFeedback() {
		return customerFeedback;
	}

	public void setCustomerFeedback(Feedback customerFeedback) {
		this.customerFeedback = customerFeedback;
	}

	public Feedback getWasherFeedback() {
		return washerFeedback;
	}

	public void setWasherFeedback(Feedback washerFeedback) {
		this.washerFeedback = washerFeedback;
	}

	public int getBucketsOfWaterUsed() {
		return bucketsOfWaterUsed;
	}

	public void setBucketsOfWaterUsed(int bucketsOfWaterUsed) {
		this.bucketsOfWaterUsed = bucketsOfWaterUsed;
	}

	
	public void validateStatus() throws InvalidStatusException{
		if(validStatus.contains(this.status)) return;
		throw new InvalidStatusException(status);
	}
	
	public void validateFeedbacks() throws RatingOutOfRangeException{
		if(this.customerFeedback != null && !this.customerFeedback.validateRating()) {
			throw new RatingOutOfRangeException("customer");			
		}
		if(this.washerFeedback != null && !this.washerFeedback.validateRating()) {
			throw new RatingOutOfRangeException("washer");
		}
	}
	
	public void validateCompletion() throws FeedbackNotPossibleException {
		if(this.status.equals("COMPLETED")) return;
		if(this.customerFeedback != null || this.washerFeedback != null || this.bucketsOfWaterUsed != 0) {
			throw new FeedbackNotPossibleException();
		}
	}
	
	public void validateDateOrder() throws BookedForThePastException{
		if(this.completionTime == null) return;
		if(this.completionTime.isBefore(bookingTime)) throw new BookedForThePastException();
	}
	
	public void validateCompletionDate() throws NoCompletionDateException{
		if(this.status.equals("COMPLETED") && this.completionTime == null) {
			throw new NoCompletionDateException();
		}
	}


	public String getCarName() {
		return carName;
	}


	public void setCarName(String carName) {
		this.carName = carName;
	}


	public String getWashPackTitle() {
		return washPackTitle;
	}


	public void setWashPackTitle(String washPackTitle) {
		this.washPackTitle = washPackTitle;
	}
	
	
}
