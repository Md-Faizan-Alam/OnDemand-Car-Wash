package com.carwash.userservice.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@SuppressWarnings("deprecation")
@EnableWebSecurity
public class SecurityConfigurer extends WebSecurityConfigurerAdapter {
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	@Autowired
	JwtRequestFilter jwtRequestFilter;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeRequests()
				.antMatchers("/user/car/getCount","/user/getNoOfCustomers", "/user/getNoOfWashers","/user/authenticate", "/user/add", "/user/pass", "/user/demoFilter", "/user/car/pass",
						"/user/getUser", "/user/stringList")
				.permitAll().antMatchers("/user/washer/exists", "/user/update", "user/delete","/user/car/exists").hasAnyRole("ADMIN", "CUSTOMER", "WASHER")
				.antMatchers("/user/car/add", "/user/car/update",
						"/user/car/delete","/user/car/carIdsByUser")
				.hasAnyRole("ADMIN", "CUSTOMER")
				.antMatchers("/user/list", "/user/filter", "/user/find", "/user/car/list").hasAnyRole("ADMIN").and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
	}

	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

}
