package com.carwash.washerservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.client.RestTemplate;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@SpringBootApplication
@EnableEurekaClient
@EnableMongoRepositories
public class WasherServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(WasherServiceApplication.class, args);
	}
	
	@Bean
	@LoadBalanced
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}
	
	@Bean
  	public OpenAPI springShopOpenAPI() {
    return new OpenAPI()
            .info(new Info().title("Washer Service API")
            .description("Service for communication with the Order Database")
            .version("v0.0.1"));
  	}
	
}
