package dev.danmills.echo_client.service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import dev.danmills.echo_client.api.controller.CampusController;
import dev.danmills.echo_client.persistence.entity.Course;
import dev.danmills.echo_client.persistence.entity.RESTResponse;

@Service
public class RESTCourseService {

   private RESTTokenService restTokenService = new RESTTokenService();
   private static final Logger log = LoggerFactory.getLogger(CampusController.class);
   private final ObjectMapper objectMapper;

   // Constructor 
   public RESTCourseService(RESTTokenService restTokenService, ObjectMapper objectMapper) {
      this.restTokenService = restTokenService;
      this.objectMapper = objectMapper;
   }

   String accessToken = restTokenService.tokenMiddleware();
   String base = "https://echo360.org.uk";
   RestTemplate restTemplate = new RestTemplate();
   /**
   * Method to call echo 360 Api for courses.
   * Uses restTokenService middleware to collect access token
   *
   * @return the list of entities
   */
   public RESTResponse<Course> getCourses() {
      log.info("getCourses called...");
      
      String query = "?access_token=";
      String endpoint = "/public/api/v1/courses";
      String uri = base + endpoint + query + accessToken;


      RestTemplate restTemplate = new RestTemplate(); 
      @SuppressWarnings("unchecked")
      RESTResponse<Course> responseEntity = restTemplate.getForObject(uri, RESTResponse.class);
      log.info("ResponseEntity is successfully found. ");
      
      return responseEntity;
   }

   @SuppressWarnings("null")
   public ArrayList<Course> getPaginated(String requestURI) {
      log.info("Calling Request URI: ");
      log.info(requestURI);
      ArrayList<Course> courses = new ArrayList<>();
      
      @SuppressWarnings("unchecked")
      RESTResponse<Course> responseEntity = restTemplate.getForObject(requestURI, RESTResponse.class);
      courses.addAll(responseEntity.getData());
      // log.info(courses.toString());

      String hasMorePages = Boolean.toString(responseEntity.hasMore());
      log.info("Has more pages is: " + hasMorePages);

         if (responseEntity.hasMore()) {
            String offset = responseEntity.getNext();
            log.info("Offset is: " + offset);
            String newUri  = base + offset + "&access_token=" + accessToken;
            try {
               getPaginated(newUri);
            } catch (Exception e) {
               log.info("Tried to call next page " + e);
            }
            return courses;
         } else {
            return courses;
         }
   }

   public ArrayList<Course> getPaginatedCourses() {
      log.info("Collecting Courses using paginated response");
      String query = "&access_token=";
      String endpoint = "/public/api/v1/courses?limit=10";
      String uri = base + endpoint + query + accessToken;

      ArrayList<Course> courses = getPaginated(uri);

      return courses;
   }

   /**
   * Method to call echo 360 Api for campus by ID.
   * Uses restTokenService middleware to collect access token
   *
   * @return the single campus entity
   */
   public Optional<Course> getCourseById(String id) {
      // Request access token from redis cache via middleware
      log.info("getCourseById called...");
      String access_token = restTokenService.tokenMiddleware();
      String uri = "https://echo360.org.uk/public/api/v1/courses/" + id + "?access_token=" + access_token;

      // Request campus from echo 360 and return as campus
      RestTemplate restTemplate = new RestTemplate(); 
      Course responseEntity = restTemplate.getForObject(uri, Course.class);
      log.info("ResponseEntity is successfully found. ");
      Optional<Course> course = Optional.ofNullable(responseEntity);

      return course;
   }

}
