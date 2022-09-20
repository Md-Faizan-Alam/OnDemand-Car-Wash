package com.carwash.orderservice.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.carwash.orderservice.service.OrderService;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	OrderService orderService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		MyUserDetails user = orderService.getUserByUsername(username);

		List<GrantedAuthority> roles = new ArrayList<>();
		roles.add(new Role(user.getRole()));

		return new User(user.getUsername(), user.getPassword(), roles);
	}

}

@SuppressWarnings("serial")
class Role implements GrantedAuthority {

	private String role;

	public Role(String role) {
		this.role = role;
	}

	@Override
	public String getAuthority() {
		return "ROLE_" + this.role;
	}

}