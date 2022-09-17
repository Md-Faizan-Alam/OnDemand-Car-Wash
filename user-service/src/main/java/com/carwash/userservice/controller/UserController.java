package com.carwash.userservice.controller;

import javax.servlet.http.HttpServletRequest;

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

import com.carwash.userservice.model.Car;
import com.carwash.userservice.model.Filter;
import com.carwash.userservice.model.User;
import com.carwash.userservice.security.AuthenticationRequest;
import com.carwash.userservice.security.AuthenticationResponse;
import com.carwash.userservice.security.JwtUtil;
import com.carwash.userservice.security.MyUserDetails;
import com.carwash.userservice.service.CarService;
import com.carwash.userservice.service.UserService;
import com.carwash.userservice.wrapper.CarList;
import com.carwash.userservice.wrapper.StringList;
import com.carwash.userservice.wrapper.UserList;

//@CrossOrigin(originPatterns = "*")
@RestController
@RequestMapping("/user")
public class UserController {

	/*
	 * -----------------------------------------------------------------------------
	 * ============================== User Controller ==============================
	 * -----------------------------------------------------------------------------
	 */

	@Autowired
	private UserService userService;

	// Method that returns an empty example of a user
	@GetMapping("/pass")
	public User pass() {
		return new User();
	}

	// Method that returns an empty example of a filter
	@GetMapping("/demoFilter")
	public Filter getFilter() {
		return new Filter();
	}
	
	@PostMapping("/washer/exists")
	public ResponseEntity<Boolean> checkExistenceOfWasher(@RequestBody String washerId){
		return new ResponseEntity<>(userService.washerExists(washerId),HttpStatus.OK);
	}

	// Method to insert a new User into the database
	@PostMapping("/add")
	public ResponseEntity<String> insertUser(@RequestBody User user) {
		String saved = userService.insertUser(user);
		if (saved.equals("User saved successfully")) {
			return new ResponseEntity<String>(saved, HttpStatus.CREATED);
		}
		return new ResponseEntity<String>(saved, HttpStatus.BAD_REQUEST);
	}

	// Method that returns the list of all users from the database
	@GetMapping("/list")
	public UserList getAllUsers() {
		return userService.getAllUsers();
	}

	// Method to update a user that already exists in the database
	@PutMapping("/update")
	public ResponseEntity<String> updateUser(@RequestBody User user) {
		String updated = userService.updateUser(user);
		if (updated == "User updated successfully") {
			return new ResponseEntity<String>(updated, HttpStatus.OK);
		}
		return new ResponseEntity<String>(updated, HttpStatus.BAD_REQUEST);
	}

	// Method to delete a user from the database
	@DeleteMapping("/delete")
	public ResponseEntity<String> deleteUsers(@RequestBody StringList stringList) {
		boolean deleted = userService.deleteUsers(stringList);
		if (deleted) {
			return new ResponseEntity<String>("Users deleted successfully", HttpStatus.OK);
		}
		return new ResponseEntity<String>("User with one of these Ids does not exist", HttpStatus.BAD_REQUEST);
	}

	// Method to get a list of users from the database filtered according to the
	// given specifications
	@GetMapping("/filter")
	public UserList getFilteredUsers(@RequestBody Filter filter) {
		return userService.getFilteredUsers(filter);
	}

	// Method to find a user using an example
	@GetMapping("/find")
	public UserList getUsersByExample(@RequestBody User user) {
		return userService.getUsersByExample(user);
	}

	/*
	 * -----------------------------------------------------------------------------
	 * ============================== Car Controller ==============================
	 * -----------------------------------------------------------------------------
	 */

	@Autowired
	private CarService carService;

	// Method that returns an empty example of a user
	@GetMapping("/car/pass")
	public Car carPass() {
		return new Car();
	}
	
	
	// Method to check the existence of a car in the database
	@PostMapping("/car/exists")
	public ResponseEntity<Boolean> checkExistence(@RequestBody String carId){
		return new ResponseEntity<Boolean>( carService.doesExist(carId) ,HttpStatus.OK);
	}

	// Method to insert a new User into the database
	@PostMapping("/car/add")
	public ResponseEntity<String> insertCar(@RequestBody Car car) {
		String saved = carService.insertCar(car);
		if (saved.equals("Car saved successfully")) {
			return new ResponseEntity<String>(saved, HttpStatus.CREATED);
		}
		return new ResponseEntity<String>(saved, HttpStatus.BAD_REQUEST);
	}

	// Method that returns the list of all users from the database
	@GetMapping("/car/list")
	public CarList getAllCars() {
		return carService.getAllCars();
	}

	// Method to update a user that already exists in the database
	@PutMapping("/car/update")
	public ResponseEntity<String> updateCar(@RequestBody Car car) {
		String updated = carService.updateCar(car);
		if (updated == "Car updated successfully") {
			return new ResponseEntity<String>(updated, HttpStatus.OK);
		}
		return new ResponseEntity<String>(updated, HttpStatus.BAD_REQUEST);
	}

	// Method to delete a user from the database
	@DeleteMapping("/car/delete")
	public ResponseEntity<String> deleteCars(@RequestBody StringList stringList) {
		String deleted = carService.deleteCars(stringList);
		if (deleted.equals("Cars deleted successfully")) {
			return new ResponseEntity<String>(deleted, HttpStatus.OK);
		}
		return new ResponseEntity<String>(deleted, HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/car/byCustomer")
	public ResponseEntity<CarList> getCarsByCustomer(HttpServletRequest request){
		String username = jwtUtil.getUsernameFromRequest(request);
		CarList carList = carService.getCarsByUsername(username);
		return new ResponseEntity<CarList>(carList,HttpStatus.OK);
	}

	/*
	 * -----------------------------------------------------------------------------
	 * ========================= Authentication Controller =========================
	 * -----------------------------------------------------------------------------
	 */

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@PostMapping("/authenticate")
	public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {

		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUsername(), authenticationRequest.getPassword()));
		} catch (Exception e) {
//			throw new Exception("Incorrect Username or Password" , e);
			return new ResponseEntity<AuthenticationResponse>(new AuthenticationResponse("Failed"),
					HttpStatus.OK);
		}

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		final String jwt = jwtUtil.generateToken(userDetails);
		return new ResponseEntity<AuthenticationResponse>(new AuthenticationResponse(jwt), HttpStatus.OK);
	}
	
	@PostMapping("/getUserDetails")
	public ResponseEntity<MyUserDetails> verifyUser(@RequestBody AuthenticationRequest authRequest) throws Exception {
		if(authRequest.getPassword().equals("secretsarenevertobeshared")) {
			MyUserDetails user = userService.getUserDetailsByUsername(authRequest.getUsername());
			return new ResponseEntity<MyUserDetails>(user, HttpStatus.OK);
		}
		throw new Exception("Access Denied");
	}
	
	@GetMapping("/getUser")
	public ResponseEntity<User> getUser(HttpServletRequest request){
		String username = jwtUtil.getUsernameFromRequest(request);
		User user = new User();
		try {
			user = userService.getUserByUsername(username);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<User>(user,HttpStatus.OK);
	}

}