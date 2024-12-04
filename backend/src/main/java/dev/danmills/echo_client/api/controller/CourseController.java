package dev.danmills.echo_client.api.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.echo360.sdk.model.objects.Course;
import com.echo360.sdk.model.requests.ListRequest;
import com.echo360.sdk.util.Echo360Exception;

import dev.danmills.echo_client.persistence.entity.EchoLogger;
import dev.danmills.echo_client.service.RESTCourseService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {
   private final RESTCourseService restCourseService;
   private static final EchoLogger log = new EchoLogger();

   // Constructor
   public CourseController(RESTCourseService restCourseService) {
      this.restCourseService = restCourseService;
   }

   /**
   * Get all of the courses.
   *
   * @return the list of entities
   */
  @GetMapping("/courses")
  @ResponseBody
  public ListRequest<Course> getCourses() throws Echo360Exception {
   log.logString("Attempting to get courses");
   return restCourseService.getCourses();
  }

   /**
   * Get one course by ID.
   *
   * @param id is the id of the entity
   * @return the course entity
   */
   @GetMapping("/courses/{id}")
   @ResponseBody
   public Course getCourseById(@PathVariable String id) throws Echo360Exception {
      return restCourseService.getCourseById(id);

   }

  
}
