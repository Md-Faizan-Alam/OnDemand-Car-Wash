package com.carwash.adminservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.carwash.adminservice.model.Report;
import com.carwash.adminservice.repository.ReportRepository;
import com.carwash.adminservice.wrapper.ReportList;
import com.carwash.adminservice.wrapper.StringList;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;

@Service
public class ReportServiceImpl implements ReportService {

//	private static final String BASE_URL = "http://api-gateway";
	
	private static final String JWT = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYWpqdWFsYW1AZ21haWwuY29tIiwiZXhwIjoxNjYyNDkyMTI2LCJpYXQiOjE2NjI0NTYxMjZ9.8N_BzxbgDNGcFKhC3TI98ap6JymskZFnVk6EyGCenAQ";

	@Autowired
	ReportRepository reportRepository;

	@Autowired
	MongoTemplate mongoTemplate;

	@Autowired
	RestTemplate restTemplate;

	public void setRepository(ReportRepository reportRepository) {
		this.reportRepository = reportRepository;
	}

	@CircuitBreaker(name = "validationBreaker", fallbackMethod = "fallbackValidateExistence")
	public void validateExistence(String url, Object id, String objectName) throws Exception {
		HttpHeaders headers = new HttpHeaders();
		headers.setBearerAuth(JWT);
		boolean exists = restTemplate
				.exchange(url + "/exists", HttpMethod.POST, new HttpEntity<Object>(id, headers), Boolean.class)
				.getBody();
		if (!exists)
			throw new Exception(objectName);
	}

	public void fallbackValidateExistence(String url, Object id, String objectName) throws Exception {
		throw new Exception("Other services are also required for insertion or updation");
	}

	public void validateExistenceOfIds(Report report) throws Exception {
		
	}

	public void validateReport(Report report) throws Exception {
		try {
			validateExistenceOfIds(report);
		} catch (Exception e) {
			throw e;
		}
	}

	public String insertReport(Report report) {
		if (report.getReportId() != null) {
			if (reportRepository.existsById(report.getReportId())) {
				return "Report Already Exists";
			}
		}
		try {
			validateReport(report);
			reportRepository.save(report);
			return "Report saved successfully";
		} catch (Exception e) {
			return e.getMessage();
		}
	}

	public ReportList getAllReports() {
		List<Report> reportList = reportRepository.findAll();
		return new ReportList(reportList);
	}

	public String updateReport(Report report) {
		if (!reportRepository.existsById(report.getReportId())) {
			return "Report with this Id does not Exist";
		}
		try {
			validateReport(report);
			reportRepository.save(report);
			return "Report updated successfully";
		} catch (Exception e) {
			return e.getMessage();
		}
	}

	public boolean deleteReports(StringList stringList) {
		for (String reportId : stringList.getStringList()) {
			if (!reportRepository.existsById(reportId))
				return false;
		}
		reportRepository.deleteAllById(stringList.getStringList());
		return true;
	}

	public ReportList getReportsByExample(Report report) {
		ExampleMatcher matcher = ExampleMatcher.matchingAny().withIgnorePaths("bucketsOfWaterUsed");
		Example<Report> example = Example.of(report, matcher);
		List<Report> reportList = reportRepository.findAll(example);
		return new ReportList(reportList);
	}

}
