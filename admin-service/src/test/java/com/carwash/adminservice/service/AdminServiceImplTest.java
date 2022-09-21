package com.carwash.adminservice.service;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.carwash.adminservice.model.Report;
import com.carwash.adminservice.repository.ReportRepository;
import com.carwash.adminservice.wrapper.StringList;

class AdminServiceImplTest {

	ReportServiceImpl reportService;

	@BeforeEach
	void init() {
		ReportRepository mockReportRepository = mock(ReportRepository.class);
		reportService = new ReportServiceImpl();
		reportService.setRepository(mockReportRepository);
	}

	@Test
	@DisplayName("Test insertion of reports")
	void testInsertReport() {
		Report report = new Report();
		when(reportService.reportRepository.existsById(null)).thenReturn(false);
		when(reportService.reportRepository.existsById("dffojddscwfwiooisfwioj")).thenReturn(true);
		when(reportService.reportRepository.save(report)).thenReturn(report);
		String messageForValidReport = reportService.insertReport(report);
		report.setReportId("dffojddscwfwiooisfwioj");
		String messageForInvalidReport = reportService.insertReport(report);
		assertAll(
				() -> assertEquals("Report saved successfully",messageForValidReport),
				() -> assertEquals("Report Already Exists",messageForInvalidReport)
				);
	}
	
	@Test
	@DisplayName("Test updation of reports")
	void testUpdateReport() {
		Report report = new Report();
		report.setReportId("ff9v89ru899ej9j09j0ddj");
		when(reportService.reportRepository.existsById("ff9v89ru899ej9j09j0ddj")).thenReturn(true);
		when(reportService.reportRepository.existsById("dffojddscwfwiooisfwioj")).thenReturn(false);
		when(reportService.reportRepository.save(report)).thenReturn(report);
		String messageForValidReport = reportService.updateReport(report);
		report.setReportId("dffojddscwfwiooisfwioj");
		String messageForInvalidReport = reportService.updateReport(report);
		assertAll(
				() -> assertEquals("Report updated successfully",messageForValidReport),
				() -> assertEquals("Report with this Id does not Exist",messageForInvalidReport)
				);
	}
	
	@Test
	@DisplayName("Test deletion of reports")
	void testDeleteReport() {
		
		StringList stringList = new StringList();
		stringList.add("ojvw9r90ifdfj9vf09siad");
		stringList.add("efv09rucaud09mimc09i09");
		stringList.add("cwdu09aduma09iJWJD0909");
		
		when(reportService.reportRepository.existsById("ojvw9r90ifdfj9vf09siad")).thenReturn(true);
		when(reportService.reportRepository.existsById("efv09rucaud09mimc09i09")).thenReturn(true);
		when(reportService.reportRepository.existsById("cwdu09aduma09iJWJD0909")).thenReturn(true);
		when(reportService.reportRepository.existsById("9wd89d98ud98dj98adm98d")).thenReturn(false);
		
		boolean existingReportsAreDeleted = reportService.deleteReports(stringList);
		stringList.add("9wd89d98ud98dj98adm98d");
		boolean nonExistingReportIsDeleted = reportService.deleteReports(stringList);
		
		assertAll(
				()-> assertTrue(existingReportsAreDeleted),
				()-> assertFalse(nonExistingReportIsDeleted)
				);
	}
	
	

}
