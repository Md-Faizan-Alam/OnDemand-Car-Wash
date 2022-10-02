package com.carwash.adminservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carwash.adminservice.model.Report;
import com.carwash.adminservice.service.ReportService;
import com.carwash.adminservice.wrapper.ReportList;
import com.carwash.adminservice.wrapper.StringList;

@RestController
@RequestMapping("/report")
public class AdminController {
	
	@Autowired
	ReportService reportService;
	
	@GetMapping("/pass")
	public Report pass(Report report) {
		return report;
	}	
	
	@PostMapping("/add")
	public ResponseEntity<String> insertReport(@RequestBody Report report){
		String saved = reportService.insertReport(report);
		if(saved.equals("Report saved successfully")) {
			return new ResponseEntity<String>(saved,HttpStatus.CREATED);
		}
		return new ResponseEntity<String>(saved,HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/generate")
	public void generateReport() {
		reportService.generateReport();
	}
	
	@GetMapping("/list")
	public ReportList getAllReports() {
		return reportService.getAllReports();
	}
	
	@PutMapping("/update")
	public ResponseEntity<String> updateReport(@RequestBody Report report){
		String updated = reportService.updateReport(report);
		if(updated == "Report updated successfully") {
			return new ResponseEntity<String>(updated, HttpStatus.OK);
		}
		return new ResponseEntity<String>(updated, HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<String> deleteReports(@RequestBody StringList stringList){
		boolean deleted = reportService.deleteReports(stringList);
		if(deleted) {
			return new ResponseEntity<String>("Reports deleted successfully", HttpStatus.OK);
		}
		return new ResponseEntity<String>("Report with one of these Ids does not exist", HttpStatus.BAD_REQUEST);
	}
	
	
	@GetMapping("/find")
	public ReportList getReportsByExample(@RequestBody Report report) {
		return reportService.getReportsByExample(report);
	}
	
	
	
}




















