package com.carwash.adminservice.service;

import com.carwash.adminservice.model.Report;
import com.carwash.adminservice.wrapper.ReportList;
import com.carwash.adminservice.wrapper.StringList;


public interface ReportService {

	public String insertReport(Report order);

	public ReportList getAllReports();

	public String updateReport(Report order);

	public boolean deleteReports(StringList stringList);

	public ReportList getReportsByExample(Report order);
	
	public void generateReport();

}
