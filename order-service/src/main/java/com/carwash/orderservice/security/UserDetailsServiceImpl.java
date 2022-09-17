package com.carwash.orderservice.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.carwash.orderservice.service.OrderService;


@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
	OrderService orderService;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return orderService.getUserByUsername(username);
	}

}