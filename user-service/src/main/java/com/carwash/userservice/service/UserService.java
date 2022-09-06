package com.carwash.userservice.service;

import java.util.Optional;

import com.carwash.userservice.exceptions.CustomerNotFoundException;
import com.carwash.userservice.model.Filter;
import com.carwash.userservice.model.User;
import com.carwash.userservice.wrapper.StringList;
import com.carwash.userservice.wrapper.UserList;


public interface UserService {

	public boolean washerExists(String washerId);
	
	public String insertUser(User order);

	public UserList getAllUsers();

	public String updateUser(User order);

	public boolean deleteUsers(StringList stringList);

	public UserList getFilteredUsers(Filter filter);
	
	public UserList getUsersByExample(User order);
	
	public void addCarToUser(String userId, String carId) throws CustomerNotFoundException;
	
	public User getUserByUsername(String username) throws Exception;
	
	public Optional<User> getUserById(String userId);

}
