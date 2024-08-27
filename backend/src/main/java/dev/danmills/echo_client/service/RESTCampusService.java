package dev.danmills.echo_client.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import dev.danmills.echo_client.api.controller.CampusController;
import dev.danmills.echo_client.persistence.entity.Campus;
import dev.danmills.echo_client.persistence.entity.Campuses;

@Service
public class RESTCampusService {
   
   // declare Token Service for calls to echo 360 API
   private final RESTTokenService restTokenService;

   private static final Logger log = LoggerFactory.getLogger(CampusController.class);
   
   private final ObjectMapper objectMapper;
   
   // Constructor 
   public RESTCampusService(
         // CampusRepository campusRepository,
         RESTTokenService restTokenService, 
         ObjectMapper objectMapper
         ) {
            // this.campusRepository = campusRepository;
      this.restTokenService = restTokenService;
      this.objectMapper = objectMapper;
   }

   /**
   * Method to call echo 360 Api for campuses.
   * Uses restTokenService middleware to collect access token
   *
   * @return the list of entities
   */
   public Campuses getCampuses() throws JsonMappingException, JsonProcessingException {
      log.info("getCampusRequest called...");
      String access_token = restTokenService.tokenMiddleware();
      String base = "https://echo360.org.uk";
      String query = "?access_token=";
      String endpoint = "/public/api/v1/campuses";
      String uri = base + endpoint + query + access_token;
      // TODO: A Recursive REST Client / Handler class that collects API paginated responses.

      // Request Campuses from echo 360 and return as String.class
      RestTemplate restTemplate = new RestTemplate(); 
      String responseEntity = restTemplate.getForObject(uri, String.class);
      log.info("ResponseEntity is successfully found. ");
      
      // Convert string response to Campuses.class
      Campuses campuses = objectMapper.readValue(responseEntity, Campuses.class); 

      return campuses;
   }

   /**
   * Method to call echo 360 Api for campus by ID.
   * Uses restTokenService middleware to collect access token
   *
   * @return the single campus entity
   */
   public Optional<Campus> getCampusById(String id) {
      // Request access token from redis cache via middleware
      log.info("getCampusById called...");
      String access_token = restTokenService.tokenMiddleware();
      String uri = "https://echo360.org.uk/public/api/v1/campuses/" + id + "?access_token=" + access_token;

      // Request campus from echo 360 and return as campus
      RestTemplate restTemplate = new RestTemplate(); 
      Campus responseEntity = restTemplate.getForObject(uri, Campus.class);
      log.info("ResponseEntity is successfully found. ");
      Optional<Campus> campus = Optional.ofNullable(responseEntity);

      return campus;
   }

}
