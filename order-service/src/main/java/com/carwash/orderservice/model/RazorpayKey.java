package com.carwash.orderservice.model;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("razorpay.key")
@RefreshScope
public class RazorpayKey {

	private String id;
	private String secret;
	
	public RazorpayKey() {}
	
	public RazorpayKey(String id, String secret) {
		this.setId(id);
		this.setSecret(secret);
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSecret() {
		return secret;
	}

	public void setSecret(String secret) {
		this.secret = secret;
	}

}
