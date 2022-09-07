package com.carwash.adminservice.wrapper;

import java.util.ArrayList;
import java.util.List;

import com.carwash.adminservice.model.Report;

public class ReportList {
	List<Report> reportList = new ArrayList<>();

	public ReportList() {
		
	}
	public ReportList(List<Report> reportList) {
		this.reportList = reportList;
	}
	public List<Report> getReportList() {
		return reportList;
	}
	public void setReportList(List<Report> reportList) {
		this.reportList = reportList;
	}
	
	@Override
	public boolean equals(Object obj) {
		return super.equals(obj);
	}
	
	
	
	
}
