package dev.danmills.echo_client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;

import dev.danmills.echo_client.persistence.entity.EchoLogger;
import dev.danmills.echo_client.service.SDKTokenService;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class, UserDetailsServiceAutoConfiguration.class})
public class EchoClientApplication {

	// Autowire the Environment object for accessing environment variables
	@SuppressWarnings("unused")
	@Autowired
   private Environment env;

	@Autowired
	private SDKTokenService sdkTokenService;

	// private static final Logger log = LoggerFactory.getLogger(EchoClientApplication.class);
	// private static EchoLogger log = new EchoLogger();

	public static void main(String[] args) {
		// EchoLogger log = new EchoLogger();
		SpringApplication.run(EchoClientApplication.class, args);
	}
	// static final Logger logger = Logger.getLogger(EchoClientApplication.class.getName());
	// This middleware call ensures that the Echo 360 token is available and valid on startup.
	@Bean
	public CommandLineRunner run(SDKTokenService sdkTokenService) throws Exception {
		return args -> {

			EchoLogger log = new EchoLogger();
			
			log.logString("Starting Command Line Middleware Service.");
			// restTokenService.postTokenRequest();
			// String quote = restTokenService.tokenMiddleware();
			// log.logString("Token stored successfully: " + !quote.isEmpty());
		};
	}

}
