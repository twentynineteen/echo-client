package dev.danmills.echo_client.api.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.echo360.sdk.model.objects.Section;
import com.echo360.sdk.model.requests.ListRequest;
import com.echo360.sdk.util.Echo360Exception;

import dev.danmills.echo_client.persistence.entity.EchoLogger;
import dev.danmills.echo_client.service.RESTSectionService;

@RestController
@CrossOrigin(origins = "http://localhost:5176")
public class SectionController {
   private final RESTSectionService restSectionService;
   private static final EchoLogger log = new EchoLogger();

   public SectionController(RESTSectionService restSectionService) {
      this.restSectionService = restSectionService;
   }

   /**
   * Get all of the Schedules.
   *
   * @return the list of entities
   */
  @GetMapping("/sections")
  @ResponseBody
  public ListRequest<Section> getSections() throws Echo360Exception {
   log.logString("Attempting to get Sections");
   return restSectionService.getSections();
  }

/**
 * This Java function retrieves a section by its ID and logs an attempt to do so.
 * 
 * @param id The `id` parameter in the `getSectionById` method is used to specify the unique identifier
 * of the section that you want to retrieve. This method is a part of a Spring MVC controller that
 * handles GET requests to "/sections/{id}", where `{id}` is a path variable representing the ID
 * @return The method is returning a Section object.
 */
  @GetMapping("/sections/{id}")
  @ResponseBody
  public Section getSectionById(@PathVariable String id) throws Echo360Exception {
   log.logString("Attempting to get Section - " + id);
   return restSectionService.getSectionById(id);
  }

  @GetMapping("/sections/year/{id}")
  @ResponseBody
  public ListRequest<Section> getSectionsByAcademicYearId(@PathVariable String id) throws Echo360Exception {
   log.logString("Attempting to get Sections from  - " + id);
   return restSectionService.getSectionsByAcademicYearId(id);
  }


}
