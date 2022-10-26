package com.carwash.washerservice.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.carwash.washerservice.service.WashPackService;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	WashPackService washPackService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		MyUserDetails user = washPackService.getUserByUsername(username);

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