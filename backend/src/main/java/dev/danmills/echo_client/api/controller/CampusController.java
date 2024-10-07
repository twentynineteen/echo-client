package dev.danmills.echo_client.api.controller;

import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.echo360.sdk.model.objects.Campus;
import com.echo360.sdk.util.Echo360Exception;
import com.echo360.sdk.util.Logger;

import dev.danmills.echo_client.service.RESTCampusService;
import dev.danmills.echo_client.service.SDKTokenService;

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
   // @GetMapping("/campuses")
   // @ResponseBody
   // public Campus getCampuses() throws JsonMappingException, JsonProcessingException, Echo360Exception {
   //    log.logString("Attempting to get campuses");
   //    list();
 
   //    return restCampusService.getCampuses();
   // }

   public void list() throws Echo360Exception {
      log.logString("Attempting to get campuses");
      SDKTokenService.list();
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