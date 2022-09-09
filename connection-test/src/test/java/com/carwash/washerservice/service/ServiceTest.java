package com.carwash.washerservice.service;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import com.carwash.washerservice.model.AddOn;
import com.carwash.washerservice.model.WashPack;
import com.carwash.washerservice.repository.AddOnRepository;
import com.carwash.washerservice.repository.WashPackRepository;
import com.carwash.washerservice.wrapper.AddOnList;
import com.carwash.washerservice.wrapper.StringList;
import com.carwash.washerservice.wrapper.WashPackList;

@DisplayName("Service Test")
class ServiceTest {

	WashPackServiceImpl washPackService;
	AddOnServiceImpl addOnService;
	
	@BeforeEach
	void init() {
		WashPackRepository mockWashPackRepo = mock(WashPackRepository.class);
		washPackService = new WashPackServiceImpl();
		washPackService.setRepo(mockWashPackRepo);
		AddOnRepository mockAddOnRepo = mock(AddOnRepository.class);
		addOnService = new AddOnServiceImpl();
		addOnService.setRepo(mockAddOnRepo);
	}
	
	@Nested
	@DisplayName("Wash Pack Test")
	public class WashPackTest{
		
		@Test
		@DisplayName("Test for Insertion of Wash Pack")
		void testInsertWashPack() {
			WashPack washPack = new WashPack();
			washPack.setWashPackTitle("Silver Wash");
			washPack.setWashPackDescription("Complete vacuuming of cars incl. seats and boot + Washing and cleaning of foot mats + Body Shampooing and washing including door frames + Tyre arches cleaning + Underbody wash + Engine hot water wash and dressing + Side doors cleaning + Dashboard polishing + Car perfume spray");
			washPack.setPrice(400);
			when(washPackService.washPackRepository.save(washPack)).thenReturn(washPack);
			boolean validDataIsSaved = washPackService.insertWashPack(washPack);
			washPack.setPrice(250);
			boolean invalidPriceIsSaved = washPackService.insertWashPack(washPack);
			assertAll(
				() -> assertTrue(validDataIsSaved, "Valid data should be saved"),
				() -> assertFalse(invalidPriceIsSaved, "Price lower than Rs.300 should not be saved")
			);
		}
		
		@Test
		@DisplayName("Test for Listing of all Wash Pack")
		void testGetAllWashPacks() {
			List<WashPack> allWashPacks = new ArrayList<>();
			WashPack washPack = new WashPack();
			washPack.setWashPackTitle("Silver Wash");
			washPack.setWashPackDescription("Complete vacuuming of cars incl. seats and boot + Washing and cleaning of foot mats + Body Shampooing and washing including door frames + Tyre arches cleaning + Underbody wash + Engine hot water wash and dressing + Side doors cleaning + Dashboard polishing + Car perfume spray");
			washPack.setPrice(400);
			allWashPacks.add(washPack);
			when(washPackService.washPackRepository.findAll()).thenReturn(allWashPacks);
			WashPackList washPackList = washPackService.getAllWashPacks();
			assertEquals(washPackList , new WashPackList(allWashPacks) , "The output list of Wash Packs must be same as the list returned by the repository");
		}
		
		@Test
		@DisplayName("Test for Deletion of Wash Packs")
		void testDeleteWashPacks() {
			StringList stringList = new StringList();
			
			// Adding valid Id list
			stringList.add("vu2ru87y489734y");
			stringList.add("ryj32qrfwn87y8r");
			stringList.add("vr38ru98ruewr9w");
			when(washPackService.washPackRepository.existsById("vu2ru87y489734y")).thenReturn(true);
			when(washPackService.washPackRepository.existsById("ryj32qrfwn87y8r")).thenReturn(true);
			when(washPackService.washPackRepository.existsById("vr38ru98ruewr9w")).thenReturn(true);
			boolean existingWashPackssAreDeleted = washPackService.deleteWashPacks(stringList);
			
			// Adding an invalid Id
			stringList.add("vm9we9rw969wc9m");
			when(washPackService.washPackRepository.existsById("vm9we9rw969wc9m")).thenReturn(false);
			boolean nonExistentWashPackIsDeleted = washPackService.deleteWashPacks(stringList);
			
			assertAll(
					()-> assertTrue(existingWashPackssAreDeleted , "Deletion must be successful if all the given id(s) in the list are present in the database"),
					()-> assertFalse(nonExistentWashPackIsDeleted , "If the list contains an id that is not present in the database then not a single Wash Pack must be deleted")
			);
			
		}
		
		@Test
		@DisplayName("Test for Updation of Wash Packs")
		void testUpdateWashPack() {
			WashPack washPack = new WashPack("fu8rwr8ujrf8wh8e", "Silver Wash", "Complete vacuuming of cars incl. seats and boot + Washing and cleaning of foot mats + Body Shampooing and washing including door frames + Tyre arches cleaning + Underbody wash + Engine hot water wash and dressing + Side doors cleaning + Dashboard polishing + Car perfume spray",400);
			when(washPackService.washPackRepository.existsById("fu8rwr8ujrf8wh8e")).thenReturn(true);
			boolean existingWashPacknIsUpdated = washPackService.updateWashPack(washPack);
			washPack.setPrice(100);
			boolean priceIsSetToLessThanMinimum = washPackService.updateWashPack(washPack);
			washPack.setPrice(400);
			washPack.setWashPackId("uvu8ru98u90wi");
			boolean nonExistingWashPackIsUpdated = washPackService.updateWashPack(washPack);
			
			assertAll(
				()-> assertTrue(existingWashPacknIsUpdated, "If the wash pack with the given id exists in the database and the new price is above 300 then the wash pack must be updated"),
				()-> assertFalse(priceIsSetToLessThanMinimum, "If the new price is below 300 then the wash pack must not be updated"),
				()-> assertFalse(nonExistingWashPackIsUpdated, "If the wash pack with the given id is not present in the database the it must not be updated")
			);
		}
	}
	
	
	
	
	@Nested
	@DisplayName("Add-On Test")
	public class AddOnTest{
		
		@Test
		@DisplayName("Test for Insertion of Add-On")
		void testInsertAddOn() {
			AddOn addOn = new AddOn();
			addOn.setAddOnTitle("AC Disinfectant");
			addOn.setAddOnDescription("The aim of this service is to clean and sanitize the air conditioning compartment of the car.");
			addOn.setPrice(100);
			when(addOnService.addOnRepository.save(addOn)).thenReturn(addOn);
			boolean validDataIsSaved = addOnService.insertAddOn(addOn);
			addOn.setPrice(40);
			boolean invalidPriceIsSaved = addOnService.insertAddOn(addOn);
			assertAll(
				() -> assertTrue(validDataIsSaved, "Valid data should be saved"),
				() -> assertFalse(invalidPriceIsSaved, "Price lower than Rs.50 should not be saved")
			);
		}
		
		@Test
		@DisplayName("Test for Listing of all Add-On")
		void testGetAllAddOn() {
			List<AddOn> allAddOns = new ArrayList<>();
			AddOn addOn = new AddOn();
			addOn.setAddOnTitle("AC Disinfectant");
			addOn.setAddOnDescription("The aim of this service is to clean and sanitize the air conditioning compartment of the car.");
			addOn.setPrice(100);
			allAddOns.add(addOn);
			when(addOnService.addOnRepository.findAll()).thenReturn(allAddOns);
			AddOnList addOnList = addOnService.getAllAddOns();
			assertEquals(addOnList , new AddOnList(allAddOns) , "The output list of AddOns must be same as the list returned by the repository");
		}
		
		@Test
		@DisplayName("Test for Deletion of Add-On")
		void testDeleteAddOn() {
			StringList stringList = new StringList();
			
			// Adding valid Id list
			stringList.add("vu2ru87y489734y");
			stringList.add("ryj32qrfwn87y8r");
			stringList.add("vr38ru98ruewr9w");
			when(addOnService.addOnRepository.existsById("vu2ru87y489734y")).thenReturn(true);
			when(addOnService.addOnRepository.existsById("ryj32qrfwn87y8r")).thenReturn(true);
			when(addOnService.addOnRepository.existsById("vr38ru98ruewr9w")).thenReturn(true);
			boolean existingAddOnssAreDeleted = addOnService.deleteAddOns(stringList);
			
			// Adding an invalid Id to the list
			stringList.add("vm9we9rw969wc9m");
			when(addOnService.addOnRepository.existsById("vm9we9rw969wc9m")).thenReturn(false);
			boolean nonExistentAddOnIsDeleted = addOnService.deleteAddOns(stringList);
			
			assertAll(
					()-> assertTrue(existingAddOnssAreDeleted , "Deletion must be successful if all the given id(s) in the list are present in the database"),
					()-> assertFalse(nonExistentAddOnIsDeleted , "If the list contains an id that is not present in the database then not a single AddOn must be deleted")
			);
		}
		
		@Test
		@DisplayName("Test for Updation of Add-On")
		void testUpdateAddOn() {
			AddOn addOn = new AddOn("fu8rwr8ujrf8wh8e", "AC Disinfectant", "The aim of this service is to clean and sanitize the air conditioning compartment of the car.",100);
			when(addOnService.addOnRepository.existsById("fu8rwr8ujrf8wh8e")).thenReturn(true);
			boolean existingAddOnIsUpdated = addOnService.updateAddOn(addOn);
			addOn.setPrice(40);
			boolean priceIsSetToLessThanMinimum = addOnService.updateAddOn(addOn);
			addOn.setPrice(100);
			addOn.setAddOnId("uvu8ru98u90wi");
			boolean nonExistingAddOnIsUpdated = addOnService.updateAddOn(addOn);
			
			assertAll(
				()-> assertTrue(existingAddOnIsUpdated, "If the add-on with the given id exists in the database and the new price is above 50 then the add-on must be updated"),
				()-> assertFalse(priceIsSetToLessThanMinimum, "If the new price is below 50 then the add-on must not be updated"),
				()-> assertFalse(nonExistingAddOnIsUpdated, "If the add-on with the given id is not present in the database the it must not be updated")
			);
		}
	}
	

}
