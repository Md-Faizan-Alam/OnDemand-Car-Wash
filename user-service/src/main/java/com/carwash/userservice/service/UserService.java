package com.carwash.userservice.service;

import com.carwash.userservice.model.Filter;
import com.carwash.userservice.model.User;
import com.carwash.userservice.wrapper.StringList;
import com.carwash.userservice.wrapper.UserList;


public interface UserService {

	public String insertUser(User order);

	public UserList getAllUsers();

	public String updateUser(User order);

	public boolean deleteUsers(StringList stringList);

	public UserList getFilteredUsers(Filter filter);
	
	public UserList getUsersByExample(User order);

}
