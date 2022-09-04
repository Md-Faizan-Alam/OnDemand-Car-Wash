package com.carwash.userservice.controller;

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

import com.carwash.userservice.model.Filter;
import com.carwash.userservice.model.User;
import com.carwash.userservice.service.UserService;
import com.carwash.userservice.wrapper.StringList;
import com.carwash.userservice.wrapper.UserList;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@GetMapping("/pass")
	public User pass(User user) {
		return user;
	}
	
	@GetMapping("/demoFilter")
	public Filter getFilter() {
		return new Filter();
	}
	
	@PostMapping("/add")
	public ResponseEntity<String> insertUser(@RequestBody User user){
		String saved = userService.insertUser(user);
		if(saved.equals("User saved successfully")) {
			return new ResponseEntity<String>(saved,HttpStatus.CREATED);
		}
		return new ResponseEntity<String>(saved,HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/list")
	public UserList getAllUsers() {
		return userService.getAllUsers();
	}
	
	@PutMapping("/update")
	public ResponseEntity<String> updateUser(@RequestBody User user){
		String updated = userService.updateUser(user);
		if(updated == "User updated successfully") {
			return new ResponseEntity<String>(updated, HttpStatus.OK);
		}
		return new ResponseEntity<String>(updated, HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<String> deleteUsers(@RequestBody StringList stringList){
		boolean deleted = userService.deleteUsers(stringList);
		if(deleted) {
			return new ResponseEntity<String>("Users deleted successfully", HttpStatus.OK);
		}
		return new ResponseEntity<String>("User with one of these Ids does not exist", HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/filter")
	public UserList getUserByRange(@RequestBody Filter filter) {
		return userService.getFilteredUsers(filter);
	}
	
	
	@GetMapping("/find")
	public UserList getUsersByExample(@RequestBody User user) {
		return userService.getUsersByExample(user);
	}
	
	
	
}
