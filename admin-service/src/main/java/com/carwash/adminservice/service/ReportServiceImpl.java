package com.carwash.adminservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.carwash.adminservice.model.Report;
import com.carwash.adminservice.repository.ReportRepository;
import com.carwash.adminservice.wrapper.ReportList;
import com.carwash.adminservice.wrapper.StringList;

@Service
public class ReportServiceImpl implements ReportService {
	
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
