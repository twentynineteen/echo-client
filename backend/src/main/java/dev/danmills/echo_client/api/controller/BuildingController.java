package dev.danmills.echo_client.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.echo360.sdk.model.objects.Building;
import com.echo360.sdk.model.requests.ListRequest;
import com.echo360.sdk.util.Echo360Exception;

import dev.danmills.echo_client.persistence.entity.EchoLogger;
import dev.danmills.echo_client.service.RESTBuildingService;

@RestController
public class BuildingController {
   private final RESTBuildingService restBuildingService;
   private static final EchoLogger log = new EchoLogger();

   public BuildingController(RESTBuildingService restBuildingService) {
      this.restBuildingService = restBuildingService;
   }

   /**
   * Get all of the Buildings.
   *
   * @return the list of entities
   */
  @GetMapping("/buildings")
  @ResponseBody
  public ListRequest<Building> getBuildings() throws Echo360Exception {
   log.logString("Attempting to get Buildings");
   return restBuildingService.getBuildings();
  }

   /**
   * Get one Building by ID.
   *
   * @param id is the id of the entity
   * @return the building entity
   */
   @GetMapping("/buildings/{id}")
   @ResponseBody
   public Building getBuildingById(@PathVariable String id) throws Echo360Exception {
      return restBuildingService.getBuildingById(id);

   }

   /**
   * Get a list of Buildings by the organization ID.
   *
   * @param id is the id of the entity
   * @return the list of building entities
   */
  @GetMapping("/buildings/campuses/{id}")
  @ResponseBody
  public ListRequest<Building> getBuildingsByCampusId(@PathVariable String id) throws Echo360Exception {
     return restBuildingService.getBuildingsByCampusId(id);

  }   
}
