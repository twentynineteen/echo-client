package dev.danmills.echo_client.api.controller;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

<<<<<<< HEAD
import com.echo360.sdk.model.objects.Campus;
import com.echo360.sdk.util.Echo360Exception;
import com.echo360.sdk.util.Logger;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import dev.danmills.echo_client.persistence.entity.Campuses;
=======
import dev.danmills.echo_client.persistence.entity.Campus;
>>>>>>> 9d4211069a4e90ea38fb6d6b7698dc4a49876788
import dev.danmills.echo_client.service.RESTCampusService;

@RestController
public class CampusController {
   
   private final RESTCampusService restCampusService;

   // private static final Logger log = LoggerFactory.getLogger(CampusController.class);
   private static final Logger log = new Logger();

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
<<<<<<< HEAD
   public Campuses getCampuses() throws JsonMappingException, JsonProcessingException, Echo360Exception {
      log.logString("Attempting to get campuses");
      list();
 
      return restCampusService.getCampuses();
=======
   public ArrayList<Campus> getCampuses() {
      log.info("Attempting to get campuses");
      return restCampusService.getPaginatedCampuses();
>>>>>>> 9d4211069a4e90ea38fb6d6b7698dc4a49876788
   }

   public void list() throws Echo360Exception {
      log.logString("Attempting to get campuses");
      restCampusService.list();
   }
   
   /**
   * Get one campus by ID.
   *
   * @param id is the id of the entity
   * @return the list of entity
   */
   @GetMapping("/campuses/{id}")
   @ResponseBody
   public Optional<Campus> getCampusById(@PathVariable String id) {
      return restCampusService.getCampusById(id);

   }

}