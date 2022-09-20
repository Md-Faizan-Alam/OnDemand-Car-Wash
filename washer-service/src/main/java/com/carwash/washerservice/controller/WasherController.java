package com.carwash.washerservice.controller;

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

import com.carwash.washerservice.model.AddOn;
import com.carwash.washerservice.model.Filter;
import com.carwash.washerservice.model.WashPack;
import com.carwash.washerservice.service.AddOnService;
import com.carwash.washerservice.service.WashPackService;
import com.carwash.washerservice.wrapper.AddOnList;
import com.carwash.washerservice.wrapper.StringList;
import com.carwash.washerservice.wrapper.WashPackList;

@RestController
@RequestMapping("/washer")
public class WasherController {

	// Loose Coupling
	@Autowired
	WashPackService washPackService;

	// Loose Coupling
	@Autowired
	AddOnService addOnService;

	/*------------------------------------ WashPack Controller ---------------------------------------------------*/

	// Method that returns an example of a WashPack
	@GetMapping("/WashPack/pass")
	public WashPack passWashPack() {
		return new WashPack();
	}

	// Method that returns an example of a filter
	@GetMapping("/WashPack/demoFilter")
	public Filter getFilter() {
		return new Filter(0, 1000, "price");
	}

	// Method to check if WashPacks with all the id(s) in the given string exist in
	// the database
	@PostMapping("/WashPack/exists")
	public ResponseEntity<Boolean> checkExistenceOfWashPack(@RequestBody String washPackId) {
		if (!washPackService.doesExists(washPackId))
			return new ResponseEntity<Boolean>(false, HttpStatus.OK);
		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}

	// Method to insert a new wash pack to the Database
	@PostMapping("/WashPack/add")
	public ResponseEntity<String> insertWashPack(@RequestBody WashPack washPack) {
		boolean saved = washPackService.insertWashPack(washPack);
		if (saved) {
			return new ResponseEntity<String>("Wash Pack saved successfully", HttpStatus.CREATED);
		}
		return new ResponseEntity<String>("Unable to save Wash Pack", HttpStatus.BAD_REQUEST);
	}

	// Method to get the list of all wash packs from the Database
	@GetMapping("/WashPack/list")
	public WashPackList getAllWashPacks() {
		return washPackService.getAllWashPacks();
	}

	@PostMapping("/WashPack/getById")
	public WashPack getWashPackById(@RequestBody String id) {
		return washPackService.getWashPackById(id);
	}

	// Method to update an existing wash pack by sending the replacement through
	// Request Body
	@PutMapping("/WashPack/update")
	public ResponseEntity<String> updateWashPack(@RequestBody WashPack washPack) {
		boolean updated = washPackService.updateWashPack(washPack);
		if (!updated) {
			return new ResponseEntity<String>("Wash Pack with this Id does not exist", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<String>("Wash Pack updated successfully", HttpStatus.OK);
	}

	// Method to delete all WashPacks corresponding to the given list of id(s)
	@DeleteMapping("/WashPack/delete")
	public ResponseEntity<String> deleteWashPacks(@RequestBody StringList stringList) {
		boolean deleted = washPackService.deleteWashPacks(stringList);
		if (!deleted) {
			return new ResponseEntity<String>("Wash Pack with one of these Ids does not exist", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<String>("Wash Packs deleted successfully", HttpStatus.OK);
	}

	// Method to filter the WashPacks according to specifications provided in the
	// filter object
	@PostMapping("/WashPack/filter")
	public WashPackList getFilteredWashPacks(@RequestBody Filter filter) {
		return washPackService.getFilteredWashPacks(filter);
	}

	/*------------------------------------ AddOn Controller ---------------------------------------------------*/

	// Method that returns an empty example of an AddOn
	@GetMapping("/AddOn/pass")
	public AddOn passAddOn() {
		return new AddOn();
	}

	// Method to check if AddOns with all the id(s) in the given StringList exist in
	// the database
	@PostMapping("/AddOn/exists")
	public ResponseEntity<Boolean> checkExistenceOfAddOn(@RequestBody StringList addOnIdList) {
		for (String addOnId : addOnIdList.getStringList()) {
			if (!addOnService.doesExists(addOnId))
				return new ResponseEntity<>(false, HttpStatus.OK);
		}
		return new ResponseEntity<>(true, HttpStatus.OK);
	}

	@PostMapping("/AddOn/getByIds")
	public ResponseEntity<AddOnList> getAddOnsByIds(@RequestBody StringList stringList) {
		AddOnList addOnList = addOnService.getAddOnsById(stringList);
		return new ResponseEntity<AddOnList>(addOnList, HttpStatus.OK);
	}

	// Method to insert a new add-on to the Database
	@PostMapping("/AddOn/add")
	public ResponseEntity<String> insertAddOn(@RequestBody AddOn addOn) {
		boolean saved = addOnService.insertAddOn(addOn);
		if (saved) {
			return new ResponseEntity<String>("Add-On saved successfully", HttpStatus.CREATED);
		}
		return new ResponseEntity<String>("Unable to save Add-On", HttpStatus.BAD_REQUEST);
	}

	// Method to get the list of all add-ons from the Database
	@GetMapping("/AddOn/list")
	public AddOnList getAllAddOns() {
		return addOnService.getAllAddOns();
	}

	// Method to update an existing add-on by sending the replacement through
	// Request Body
	@PutMapping("/AddOn/update")
	public ResponseEntity<String> updateAddOn(@RequestBody AddOn addOn) {
		boolean updated = addOnService.updateAddOn(addOn);
		if (!updated) {
			return new ResponseEntity<String>("Add On with this Id does not exist", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<String>("Add On updated successfully", HttpStatus.OK);
	}

	// Method to delete single or multiple add-ons from the Database by posting
	// the list of id(s) of the add-ons that are to be deleted
	@DeleteMapping("/AddOn/delete")
	public ResponseEntity<String> deleteAddOns(@RequestBody StringList stringList) {
		boolean deleted = addOnService.deleteAddOns(stringList);
		if (deleted) {
			return new ResponseEntity<String>("Add Ons deleted successfully", HttpStatus.OK);
		}
		return new ResponseEntity<String>("Add On with one of these Ids does not exist", HttpStatus.BAD_REQUEST);
	}

	// Method to get the list of add-ons filtered according to a set of
	// specifications
	// These specifications are posted in the form of a filter object
	@PostMapping("/AddOn/filter")
	public AddOnList getFilteredAddOns(@RequestBody Filter filter) {
		return addOnService.getFilteredAddOns(filter);
	}

}
