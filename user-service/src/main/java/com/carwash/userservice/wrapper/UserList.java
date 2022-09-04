package com.carwash.userservice.wrapper;

import java.util.ArrayList;
import java.util.List;

import com.carwash.userservice.model.User;

public class UserList {
	List<User> userList = new ArrayList<>();

	public UserList() {
		
	}
	public UserList(List<User> userList) {
		this.userList = userList;
	}
	public List<User> getUserList() {
		return userList;
	}
	public void setUserList(List<User> userList) {
		this.userList = userList;
	}
	
	@Override
	public boolean equals(Object obj) {
		return super.equals(obj);
	}
	
	
	
	
}
