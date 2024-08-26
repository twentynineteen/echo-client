package dev.danmills.echo_client.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import dev.danmills.echo_client.persistence.entity.Token;

@Service
public class RESTTokenService {

   private static final Logger log = LoggerFactory.getLogger(RESTTokenService.class);
   
   // Autowire the Environment object for accessing environment variables
   @Autowired
   private Environment environment;

   public String tokenMiddleware() {
      
      log.info("tokenMiddleware called.");

      log.info(String.valueOf(tokenInRedis()));
      
      while (tokenInRedis() == false) {
         log.info("No token found in Redis Account. Attempting to resolve.");
         postTokenRequest();
      }

      log.info("Token found in Redis. Checking for validity...");

      while (checkTokenValid() == false) {
         log.info("Invalid token found. Attempting to refresh.");
         String refreshToken = getTokenFromRedis().getRefreshToken();
         postTokenRefreshRequest(refreshToken);
      }

      try {
         getAccessTokenStringFromRedis();
      } catch (Error e) {
         throw new Error("Error", e);
      }

      return getAccessTokenStringFromRedis();
      
   }

   public boolean tokenInRedis() {
      log.info("tokenInRedis called.");
      log.info("get access Token String from Redis: " + getAccessTokenStringFromRedis());
      if (getAccessTokenStringFromRedis() == null) {
         log.info("Token is not found in Redis cache.");
         return false;
      }
      log.info("Token is found in Redis cache.");
      return true;
   }

   public boolean checkTokenValid() {
      log.info("checkTokenValid called.");
      // enter logic to determine token has not expired
      Token token = getTokenFromRedis();
      String expiry = token.getExpiryDate();
      log.info("Expiry date is: " + expiry);
      log.info("Current date is: " + (System.currentTimeMillis() / 1000));
      if (Long.parseLong(expiry) < (System.currentTimeMillis() / 1000)) {
         log.info("Token is invalid.");
         return false;
      }
      log.info("Token is valid.");
      return true;
   }

   public Token refreshToken(Token token) {
      log.info("refreshToken called.");
      String refreshToken = token.getRefreshToken();
      Token newToken = postTokenRefreshRequest(refreshToken);
      return newToken;
   }

   // HTTP Method to refresh Token from echo 360 API and parse into Token class
   public Token postTokenRefreshRequest(String refreshToken) {
      log.info("Token Refresh Request received.");
      // Echo 360 endpoint to generate a new access token
      String uri = "https://echo360.org.uk/oauth2/access_token";
      String grantType = "refresh_token";
      
      log.info("Token Refresh Request: getting client ID.");
      // Pull Echo 360 client secrets from environment - secrets.properties
      String clientId = environment.getProperty("env.data.clientId");
      
      // Concatenate uri and params into request
      String request = uri + "?grant_type=" + grantType
      + "&client_id=" + clientId
      + "&refresh_token=" + refreshToken;
      
      log.info("Token Refresh Request: Calling Echo 360 API.");
      RestTemplate restTemplate = new RestTemplate();
      Token result = restTemplate.postForObject(request, null, Token.class);
      
      log.info("Token Refresh Request: Storing in Redis cache.");
      storeTokenInRedis(result);
      return result;
      
   }

   // HTTP Method to retrieve Token from echo 360 API and parse into Token class
   public Token postTokenRequest() {
      log.info("PostTokenRequest called.");
      // Echo 360 endpoint to generate a new access token
      String uri = "https://echo360.org.uk/oauth2/access_token";
      String grantType = "client_credentials";
      
      // Pull Echo 360 client secrets from environment - secrets.properties
      String clientId = environment.getProperty("env.data.clientId");
      String clientSecret = environment.getProperty("env.data.clientSecret");

      // Concatenate uri and params into request
      String request = uri + "?grant_type=" + grantType
                        + "&client_id=" + clientId
                        + "&client_secret=" + clientSecret;
      
      RestTemplate restTemplate = new RestTemplate();
      Token result = restTemplate.postForObject(request, null, Token.class);
      storeTokenInRedis(result);
      return result;
      
   }

   // Store a given Token class into Redis Cache
   public void storeTokenInRedis(Token token) {
      log.info("storeTokenInRedis called.");
      //Initialise Redis connection
      LettuceConnectionFactory connectionFactory = new LettuceConnectionFactory();
		connectionFactory.afterPropertiesSet();
      
		RedisTemplate<String, String> template = new RedisTemplate<>();
		template.setConnectionFactory(connectionFactory);
		template.setDefaultSerializer(StringRedisSerializer.UTF_8);
		template.afterPropertiesSet();

      template.opsForValue().set("token_type", token.getTokenType());
      template.opsForValue().set("access_token", token.getAccessToken());
      template.opsForValue().set("expires_in", token.getExpiresInString());
      template.opsForValue().set("refresh_token", token.getRefreshToken());
      template.opsForValue().set("expiry_date", token.getExpiryDate());
      
      // confirm stored in redis
      if (template.opsForValue().get("access_token").isEmpty()) {
         System.out.println("Something went wrong");
      }

      System.out.println("Token stored in Redis cache");

      // close connection to redis
      connectionFactory.destroy();
      
   }

   public String getAccessTokenStringFromRedis() {
      log.info("getAccessTokenStringFromRedis called.");
      Token token = getTokenFromRedis();
      String stringToken = token.getAccessToken();

      return stringToken;
   }

   public Token getTokenFromRedis() {
      log.info("getTokenFromRedis called.");
      LettuceConnectionFactory connectionFactory = new LettuceConnectionFactory();
		connectionFactory.afterPropertiesSet();

		RedisTemplate<String, String> template = new RedisTemplate<>();
		template.setConnectionFactory(connectionFactory);
		template.setDefaultSerializer(StringRedisSerializer.UTF_8);
		template.afterPropertiesSet();


      String accessToken = template.opsForValue().get("access_token");
      String tokenType = template.opsForValue().get("token_type");
      Long expiresIn = Long.parseLong(template.opsForValue().get("expires_in"));
      String refreshToken = template.opsForValue().get("refresh_token");
      Long expiryDate = Long.parseLong(template.opsForValue().get("expiry_date"));
      Token newToken = new Token(tokenType, accessToken, expiresIn, refreshToken, expiryDate);

		connectionFactory.destroy();

      return newToken;
   }
}
