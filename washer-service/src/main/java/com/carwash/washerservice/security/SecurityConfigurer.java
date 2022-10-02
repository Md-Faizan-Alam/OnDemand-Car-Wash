package com.carwash.washerservice.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
				.antMatchers("/washer/AddOn/getTitlesById", "/washer/WashPack/exists", "/washer/WashPack/pass",
						"/washer/WashPack/demoFilter", "/washer/WashPack/list", "washer/AddOn/pass",
						"/washer/WashPack/filter", "washer/AddOn/list")
				.permitAll().antMatchers("washer/WashPack/getById", "washer/AddOn/getByIds", "washer/AddOn/filter")
				.hasAnyRole("ADMIN", "CUSTOMER")
				.antMatchers("/washer/WashPack/add", "/washer/WashPack/update", "/washer/WashPack/delete",
						"washer/AddOn/add", "washer/AddOn/update", "washer/AddOn/delete")
				.hasAnyRole("ADMIN").and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
	}

	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public PasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder(4);
	}

}
