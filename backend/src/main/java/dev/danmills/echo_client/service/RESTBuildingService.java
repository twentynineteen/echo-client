package dev.danmills.echo_client.service;

import org.springframework.stereotype.Service;

import com.echo360.sdk.model.objects.Building;
import com.echo360.sdk.model.requests.ListRequest;
import com.echo360.sdk.services.BuildingService;
import com.echo360.sdk.util.Echo360Exception;

import dev.danmills.echo_client.persistence.entity.EchoLogger;

@Service
public class RESTBuildingService {
   private final Echo360ApiService echo360ApiService;
   private static final EchoLogger log = new EchoLogger();

   public RESTBuildingService(Echo360ApiService echo360ApiService) {
      this.echo360ApiService = echo360ApiService;
   }

   /**
   * This function retrieves a list of buildings with a specified limit and offset.
   * 
   * @return The `getBuildings` method returns a `ListRequest` object containing a list of `Building`
   * objects.
   */
   public ListRequest<Building> getBuildings() throws Echo360Exception {
      log.logString("getBuildings called... ");

      BuildingService buildingService = new BuildingService(echo360ApiService.echo360Api());
      int limit = 500;
      String offset = "";
      ListRequest<Building> buildingList = buildingService.list(limit, offset);
      return buildingList;
   }

   /**
   * This function retrieves a list of buildings with a specified limit and offset filtered by the campus ID.
   * 
   * @return The `getBuildingsByCampusId` method returns a `ListRequest` object containing a list of `Building`
   * objects.
   */
   public ListRequest<Building> getBuildingsByCampusId(String campusId) throws Echo360Exception {
      log.logString("getBuildingsByCampusId called... ");

      BuildingService buildingService = new BuildingService(echo360ApiService.echo360Api());
      int limit = 500;
      String offset = "";
      ListRequest<Building> buildingList = buildingService.list(campusId, limit, offset);
      return buildingList;
   }

   /**
   * This function retrieves a building specified by its ID.
   * 
   * @return The `getBuildingById` method returns a `Building` object
   */
   public Building getBuildingById(String buildingId) throws Echo360Exception {
      log.logString("getBuildingById called...");

      BuildingService buildingService = new BuildingService(echo360ApiService.echo360Api());
      return buildingService.get(buildingId);
   }
}
