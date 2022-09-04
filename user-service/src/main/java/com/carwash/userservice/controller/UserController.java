package com.carwash.userservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carwash.userservice.model.AuthenticationRequest;
import com.carwash.userservice.model.AuthenticationResponse;
import com.carwash.userservice.model.Filter;
import com.carwash.userservice.model.User;
import com.carwash.userservice.service.JwtUtil;
import com.carwash.userservice.service.UserService;
import com.carwash.userservice.wrapper.StringList;
import com.carwash.userservice.wrapper.UserList;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	JwtUtil jwtUtil;
	
	@Autowired
	UserDetailsService userDetailsService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@PostMapping("/authenticate")
	public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
		
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
					);			
		}catch(Exception e) {
			return new ResponseEntity<AuthenticationResponse>(new AuthenticationResponse("Failed"),HttpStatus.FORBIDDEN);
		}
		
		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		
		final String jwt = jwtUtil.generateToken(userDetails);
		
		return new ResponseEntity<AuthenticationResponse>(new AuthenticationResponse(jwt),HttpStatus.OK);
	}
	
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
