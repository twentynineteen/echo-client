package dev.danmills.echo_client.api.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import dev.danmills.echo_client.persistence.entity.Campuses;

import dev.danmills.echo_client.service.RESTTokenService;

@RestController
public class CampusController {
   
   // declare Token Service for calls to echo 360 API
   private final RESTTokenService restTokenService;
   private final ObjectMapper objectMapper;

   private static final Logger log = LoggerFactory.getLogger(CampusController.class);

   // Constructor 
   public CampusController(
      RESTTokenService restTokenService, 
      ObjectMapper objectMapper
      ) {
      this.restTokenService = restTokenService;
      this.objectMapper = objectMapper;
   }

   // GET Campuses endpoint using the redis client token
   @GetMapping("/campuses")
   @ResponseBody
   public Campuses getCampuses() throws JsonMappingException, JsonProcessingException {
      log.info("Attempting to get campuses");
      return getCampusRequest();
   }
   
   public Campuses getCampusRequest() throws JsonMappingException, JsonProcessingException {
      log.info("getCampusRequest called...");
      String access_token = restTokenService.tokenMiddleware();
      String uri = "https://echo360.org.uk/public/api/v1/campuses?access_token=" + access_token;

      // Request Campuses from echo 360 and return as String.class
      RestTemplate restTemplate = new RestTemplate(); 
      String responseEntity = restTemplate.getForObject(uri, String.class);
      log.info("ResponseEntity is successfully found. ");
      
      // Convert string response to Campuses.class
      Campuses campuses = objectMapper.readValue(responseEntity.toString(), Campuses.class); 

      return campuses;
   }

}