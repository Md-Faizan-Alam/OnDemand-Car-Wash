package com.carwash.userservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.carwash.userservice.model.Filter;
import com.carwash.userservice.model.User;
import com.carwash.userservice.repository.UserRepository;
import com.carwash.userservice.wrapper.StringList;
import com.carwash.userservice.wrapper.UserList;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	MongoTemplate mongoTemplate;

	public void setRepository(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public void validateUser(User user) throws Exception {
	}

	public String insertUser(User user) {
		if(user.getUserId()!= null) {
			if (userRepository.existsById(user.getUserId())) {
				return "User Already Exists";
			}			
		}
		try {
			validateUser(user);
			userRepository.save(user);
			return "User saved successfully";
		}catch(Exception e) {
			return e.getMessage();
		}
	}

	public UserList getAllUsers() {
		List<User> userList = userRepository.findAll();
		return new UserList(userList);
	}

	public String updateUser(User user) {
		if (!userRepository.existsById(user.getUserId())) {
			return "User with this Id does not Exist";
		}
		try {
			validateUser(user);
			userRepository.save(user);
			return "User updated successfully";
		}catch(Exception e) {
			return e.getMessage();
		}
	}

	public boolean deleteUsers(StringList stringList) {
		for (String userId : stringList.getStringList()) {
			if (!userRepository.existsById(userId))
				return false;
		}
		userRepository.deleteAllById(stringList.getStringList());
		return true;
	}

	public UserList getFilteredUsers(Filter filter) {
		return null;
	}
	
	public UserList getUsersByExample(User user) {
		return null;
	}
	
	

}
