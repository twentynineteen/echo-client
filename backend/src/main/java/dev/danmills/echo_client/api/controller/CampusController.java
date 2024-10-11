package dev.danmills.echo_client.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.echo360.sdk.model.objects.Campus;
import com.echo360.sdk.model.requests.ListRequest;
import com.echo360.sdk.util.Echo360Exception;

import dev.danmills.echo_client.persistence.entity.EchoLogger;
import dev.danmills.echo_client.service.RESTCampusService;

@RestController
public class CampusController {
   
   private final RESTCampusService restCampusService;

   private static final EchoLogger log = new EchoLogger();

   // Constructor 
   public CampusController(RESTCampusService restCampusService) {
      this.restCampusService = restCampusService;
   }

   /**
   * Get all of the campuses.
   *
   * @return the list of entities
    * @throws Echo360Exception 
   */
   @GetMapping("/campuses")
   @ResponseBody
   public ListRequest<Campus> getCampuses() throws Echo360Exception {
      log.logString("Attempting to get campuses");
      return restCampusService.getCampuses();
   }


   // * @param id is the id of the entity
   // * @return the campus if found
   @GetMapping("/campuses/{id}")
   @ResponseBody
   public Campus getCampusById(@PathVariable String id) throws Echo360Exception {
      return restCampusService.getCampusById(id);
   }

}