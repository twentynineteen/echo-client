package dev.danmills.echo_client.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import dev.danmills.echo_client.persistence.entity.Token;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
public class RestSpringBootController {

   // Autowire the Environment object for accessing environment variables
   @Autowired
   private Environment environment;

   @RequestMapping("/")
   public String hello() {
       return "Hello, World!";
   }
   
   // This request sends a manual call to the echo API for an access token before printing to the console
   // TO DO - turn string response into token class which can be verified and used as a session cookie
   // This needs to be removed and built into a method that is only called in the event of a missing or invalid token
   @GetMapping("/token")
   @ResponseBody
   public String getToken() {
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

      // Send acess token request via rest template
      RestTemplate restTemplate = new RestTemplate();
      String result = restTemplate.postForObject(request, null, String.class);

      //persist token to redis
      LettuceConnectionFactory connectionFactory = new LettuceConnectionFactory();
		connectionFactory.afterPropertiesSet();

		RedisTemplate<String, String> template = new RedisTemplate<>();
		template.setConnectionFactory(connectionFactory);
		template.setDefaultSerializer(StringRedisSerializer.UTF_8);
		template.afterPropertiesSet();

		template.opsForValue().set("token", result);

      String redisResult = template.opsForValue().get("token");
		connectionFactory.destroy();

      return redisResult;
   }
   
   // GET Campuses endpoint using the redis client token
   @GetMapping("/campuses")
   @ResponseBody
   public String getCampuses() throws JsonMappingException, JsonProcessingException {
       
      LettuceConnectionFactory connectionFactory = new LettuceConnectionFactory();
      connectionFactory.afterPropertiesSet();
      RedisTemplate<String, String> template = new RedisTemplate<>();
      template.setConnectionFactory(connectionFactory);
      template.setDefaultSerializer(StringRedisSerializer.UTF_8);
      template.afterPropertiesSet();

      // // Pull access token from redis before implementation of refresh / access token middleware function
      String access_token = new String(template.opsForValue().get("token"));

      ObjectMapper objectMapper = new ObjectMapper();
      Token token = objectMapper.readValue(access_token, Token.class);

      String uri = "https://echo360.org.uk/public/api/v1/campuses?access_token=" + token.getAccessToken();

      RestTemplate restTemplate = new RestTemplate();
      String result = restTemplate.getForObject(uri, String.class);
         
      return result;
   }
   
}

