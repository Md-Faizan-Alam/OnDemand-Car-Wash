package com.carwash.washerservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@SpringBootApplication
@EnableMongoRepositories
public class ConnectionTestApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConnectionTestApplication.class, args);
	}
	
	@Bean
  	public OpenAPI springShopOpenAPI() {
    return new OpenAPI()
            .info(new Info().title("Washer Service API")
            .description("Service for communication with the Order Database")
            .version("v0.0.1"));
  	}
	
}
