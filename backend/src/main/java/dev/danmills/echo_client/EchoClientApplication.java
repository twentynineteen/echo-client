package dev.danmills.echo_client;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

import com.echo360.sdk.util.Logger;

import dev.danmills.echo_client.service.SDKTokenService;

@SpringBootApplication
@EnableRedisRepositories
public class EchoClientApplication {

	// Autowire the Environment object for accessing environment variables
	@SuppressWarnings("unused")
	@Autowired
   private Environment env;

	private static final Logger log = new Logger();

	public static void main(String[] args) {
		SpringApplication.run(EchoClientApplication.class, args);
	}

	// This middleware call ensures that the Echo 360 token is available and valid on startup.
	@Bean
	public CommandLineRunner run(SDKTokenService sdkTokenService) throws Exception {
		return args -> {
			log.logString("Starting Command Line Middleware Service.");
			String token = sdkTokenService.returnTokenString();
			log.logString(token);

		};
	}

}
