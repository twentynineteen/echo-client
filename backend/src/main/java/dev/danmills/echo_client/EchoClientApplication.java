package dev.danmills.echo_client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class EchoClientApplication {

	// Autowire the Environment object for accessing environment variables
	@SuppressWarnings("unused")
	@Autowired
   private Environment env;

	public static void main(String[] args) {
		SpringApplication.run(EchoClientApplication.class, args);
	}

}
