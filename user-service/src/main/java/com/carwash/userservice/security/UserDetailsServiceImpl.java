package com.carwash.userservice.security;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.carwash.userservice.service.UserService;


@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
	UserService userService;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		com.carwash.userservice.model.User user;
		try {
			user = userService.getUserByUsername(username);
		} catch (Exception e) {
			throw new UsernameNotFoundException("Username not found");
		}
		
		return new User(user.getEmail() , user.getPassword() , new ArrayList<>());
	}

}