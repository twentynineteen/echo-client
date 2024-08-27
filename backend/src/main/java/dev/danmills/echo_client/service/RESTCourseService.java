package dev.danmills.echo_client.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import dev.danmills.echo_client.api.controller.CampusController;
import dev.danmills.echo_client.persistence.entity.Courses;

@Service
public class RESTCourseService {

   // declare Token Service for calls to echo 360 API
   private final RESTTokenService restTokenService;
   private static final Logger log = LoggerFactory.getLogger(CampusController.class);
   private final ObjectMapper objectMapper;

   // Constructor 
   public RESTCourseService(RESTTokenService restTokenService, ObjectMapper objectMapper) {
      this.restTokenService = restTokenService;
      this.objectMapper = objectMapper;
   }

   /**
   * Method to call echo 360 Api for courses.
   * Uses restTokenService middleware to collect access token
   *
   * @return the list of entities
   * @throws JsonProcessingException 
   * @throws JsonMappingException 
   */
   public Courses getCourses() throws JsonMappingException, JsonProcessingException {
      log.info("getCourses called...");
      String access_token = restTokenService.tokenMiddleware();
      String uri = "https://echo360.org.uk/public/api/v1/courses?access_token=" + access_token;

      // Request Campuses from echo 360 and return as String.class
      RestTemplate restTemplate = new RestTemplate(); 
      String responseEntity = restTemplate.getForObject(uri, String.class);
      log.info("ResponseEntity is successfully found. ");
      
      // Convert string response to Courses.class
      Courses courses = objectMapper.readValue(responseEntity, Courses.class); 

      return courses;
   }

}
