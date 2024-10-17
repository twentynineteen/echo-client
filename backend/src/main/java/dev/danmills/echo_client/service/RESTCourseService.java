package dev.danmills.echo_client.service;

import org.springframework.stereotype.Service;

import com.echo360.sdk.model.objects.Course;
import com.echo360.sdk.model.requests.ListRequest;
import com.echo360.sdk.services.CourseService;
import com.echo360.sdk.util.Echo360Exception;

import dev.danmills.echo_client.persistence.entity.EchoLogger;



@Service
public class RESTCourseService {

   private final Echo360ApiService echo360ApiService;


   // Constructor 
   public RESTCourseService(Echo360ApiService echo360ApiService) {
      this.echo360ApiService = echo360ApiService;
   }

   public ListRequest<Course> getCourses() throws Echo360Exception {
      EchoLogger log = new EchoLogger();
      log.logString("getCourses called... ");
      CourseService courseService = new CourseService(echo360ApiService.echo360Api());
      int limit = 150; // 150 is the maximum amount of results per call
      String offset = "";
      return courseService.list(limit, offset);
   }
   

   /**
   * Method to call echo 360 Api for campus by ID.
   *
   * @return the single course entity
   */
   public Course getCourseById(String id) throws Echo360Exception {

      EchoLogger log = new EchoLogger();
      log.logString("getCourseById called...");

      CourseService courseService = new CourseService(echo360ApiService.echo360Api());
      Course course = courseService.get(id);

      return course;
   }

}
