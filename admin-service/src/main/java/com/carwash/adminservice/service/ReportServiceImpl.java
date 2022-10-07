package com.carwash.adminservice.service;

import java.time.LocalDateTime;
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
import com.carwash.adminservice.model.UrlCollection;
import com.carwash.adminservice.repository.ReportRepository;
import com.carwash.adminservice.wrapper.ReportList;
import com.carwash.adminservice.wrapper.StringList;

@Service
public class ReportServiceImpl implements ReportService {

//	private static Logger logger = LoggerFactory.getLogger(ReportServiceImpl.class);

	@Autowired
	UrlCollection urlCollection;

	@Autowired
	ReportRepository reportRepository;

	@Autowired
	MongoTemplate mongoTemplate;

	@Autowired
	RestTemplate restTemplate;

	public void setRepository(ReportRepository reportRepository) {
		this.reportRepository = reportRepository;
	}

	public void validateReport(Report report) throws Exception {
	}

	public String insertReport(Report report) {
		if (report.getId() != null) {
			if (reportRepository.existsById(report.getId())) {
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
		if (!reportRepository.existsById(report.getId())) {
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

	public Long getLongEntity(String url, HttpHeaders headers) {
		return restTemplate.exchange(url, HttpMethod.GET,
				new HttpEntity<>(headers), Long.class).getBody();
	}

	public Report setReportLongs(Report report) {
		HttpHeaders headers = new HttpHeaders();
		Long noOfCustomers = getLongEntity(urlCollection.getUser() + "/getNoOfCustomers", headers);
		Long noOfWashers = getLongEntity(urlCollection.getUser() + "/getNoOfWashers", headers);
		Long noOfCars = getLongEntity(urlCollection.getCar() + "/getCount", headers);
		Long ordersPlaced = getLongEntity(urlCollection.getOrder() + "/count", headers);
		report.setCustomers(noOfCustomers);
		report.setWashers(noOfWashers);
		report.setCars(noOfCars);
		report.setOrdersPlaced(ordersPlaced);
		return report;
	}
	
	public Report setPopulars(Report report) {
		StringList popularsList = restTemplate.exchange(urlCollection.getOrder() + "/popular", HttpMethod.GET,
				new HttpEntity<>(new HttpHeaders()), StringList.class).getBody();
		
		report.setMostPopularPack(popularsList.getStringList().get(0));
		report.setLeastPopularPack(popularsList.getStringList().get(1));
		report.setMostPopularAddOn(popularsList.getStringList().get(2));
		report.setLeastPopularAddOn(popularsList.getStringList().get(3));
		
		return report;
	}

	public void generateReport() {
		HttpHeaders headers = new HttpHeaders();
		Report report = new Report();
		report.setDate(LocalDateTime.now());
		report = setReportLongs(report);
		report = setPopulars(report);
		double revenue = restTemplate.exchange(urlCollection.getOrder() + "/revenue", HttpMethod.GET,
				new HttpEntity<>(headers), Double.class).getBody();
		report.setRevenue(revenue);

		reportRepository.save(report);
	}

}
