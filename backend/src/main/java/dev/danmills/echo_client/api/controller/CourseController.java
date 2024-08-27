package dev.danmills.echo_client.api.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import dev.danmills.echo_client.persistence.entity.Courses;
import dev.danmills.echo_client.service.RESTCourseService;

@RestController
public class CourseController {
   private final RESTCourseService restCourseService;
   private static final Logger log = LoggerFactory.getLogger(CourseController.class);

   // Constructor
   public CourseController(RESTCourseService restCourseService) {
      this.restCourseService = restCourseService;
   }

   /**
   * Get all of the courses.
   *
   * @return the list of entities
   * @throws JsonProcessingException 
   * @throws JsonMappingException 
   */
  @GetMapping("/courses")
  @ResponseBody
  public Courses getCourses() throws JsonMappingException, JsonProcessingException {
   log.info("Attempting to get courses");
   return restCourseService.getCourses();
  }

  
}
