package com.carwash.adminservice.model;

import java.time.LocalDateTime;

public class Filter {
	
	private LocalDateTime after;
	private LocalDateTime before;
	
	public Filter() {}
	public Filter(LocalDateTime after, LocalDateTime before) {
		this.after = after;
		this.before = before;
	}
	
	public LocalDateTime getAfter() {
		return after;
	}
	public void setAfter(LocalDateTime after) {
		this.after = after;
	}
	public LocalDateTime getBefore() {
		return before;
	}
	public void setBefore(LocalDateTime before) {
		this.before = before;
	}
}
