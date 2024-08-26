package dev.danmills.echo_client;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.core.convert.RedisConverter;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;


import dev.danmills.echo_client.persistence.entity.Token;
import dev.danmills.echo_client.service.RESTTokenService;



@SpringBootApplication
@EnableRedisRepositories
public class EchoClientApplication {

	// Autowire the Environment object for accessing environment variables
	@SuppressWarnings("unused")
	@Autowired
   private Environment env;

	@Autowired
   private RedisConverter redisConverter;

	@Autowired
	private RESTTokenService restTokenService;

	private static final Logger log = LoggerFactory.getLogger(EchoClientApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(EchoClientApplication.class, args);
	}


	@Bean
	public CommandLineRunner run(RESTTokenService restTokenService) throws Exception {
		return args -> {
			Token quote = restTokenService.postTokenRequest();
			log.info("Token stored as: " + quote.getAccessToken());
		
		};
	}

}
