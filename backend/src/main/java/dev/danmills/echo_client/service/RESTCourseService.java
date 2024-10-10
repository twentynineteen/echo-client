package dev.danmills.echo_client.service;

import org.springframework.stereotype.Service;

import com.echo360.sdk.model.objects.Course;
import com.echo360.sdk.model.requests.ListRequest;
import com.echo360.sdk.services.CourseService;
import com.echo360.sdk.util.Echo360Exception;
import com.echo360.sdk.util.Logger;



@Service
public class RESTCourseService {

   // declare Token Service for calls to echo 360 API
   private Echo360ApiService echo360ApiService;
   private static final Logger log = new Logger();


   // Constructor 
   public RESTCourseService() {
   }

   public ListRequest<Course> getCourses() throws Echo360Exception {
      log.logString("getCourses called... ");
      CourseService courseService = new CourseService(echo360ApiService.echo360Api());
      int limit = 0;
      String offset = "0";
      return courseService.list(limit, offset);
   }
   

   // /**
   // * Method to call echo 360 Api for courses.
   // * Uses restTokenService middleware to collect access token
   // *
   // * @return the list of entities
   // * @throws JsonProcessingException 
   // * @throws JsonMappingException 
   // */
   // public Courses getCourses() throws JsonMappingException, JsonProcessingException {
   //    log.info("getCourses called...");
   //    String access_token = restTokenService.tokenMiddleware();
   //    String uri = "https://echo360.org.uk/public/api/v1/courses?access_token=" + access_token;

   //    // Request Campuses from echo 360 and return as String.class
   //    RestTemplate restTemplate = new RestTemplate(); 
   //    String responseEntity = restTemplate.getForObject(uri, String.class);
   //    log.info("ResponseEntity is successfully found. ");
      
   //    // Convert string response to Courses.class
   //    Courses courses = objectMapper.readValue(responseEntity, Courses.class); 

   //    return courses;
   // }

   // /**
   // * Method to call echo 360 Api for campus by ID.
   // * Uses restTokenService middleware to collect access token
   // *
   // * @return the single campus entity
   // */
   // public Optional<Course> getCourseById(String id) {
   //    // Request access token from redis cache via middleware
   //    log.info("getCourseById called...");
   //    String access_token = restTokenService.tokenMiddleware();
   //    String uri = "https://echo360.org.uk/public/api/v1/courses/" + id + "?access_token=" + access_token;

   //    // Request campus from echo 360 and return as campus
   //    RestTemplate restTemplate = new RestTemplate(); 
   //    Course responseEntity = restTemplate.getForObject(uri, Course.class);
   //    log.info("ResponseEntity is successfully found. ");
   //    Optional<Course> course = Optional.ofNullable(responseEntity);

   //    return course;
   // }

}
