package dev.danmills.echo_client.service;

import org.springframework.stereotype.Service;

import com.echo360.sdk.model.objects.Campus;
import com.echo360.sdk.model.requests.ListRequest;
import com.echo360.sdk.services.CampusService;
import com.echo360.sdk.util.Echo360Exception;

import dev.danmills.echo_client.persistence.entity.EchoLogger;

@Service
public class RESTCampusService {
   
   private final Echo360ApiService echo360ApiService;
   private static final EchoLogger log = new EchoLogger();
  
   // Constructor 
   public RESTCampusService(Echo360ApiService echo360ApiService) {
         this.echo360ApiService = echo360ApiService;
     
      }

   /**
   * Method to call echo 360 Api for campuses.
   *
   * @return the list of entities
   */
   public ListRequest<Campus> getCampuses() throws Echo360Exception {

      log.logString("getCampusRequest called...");
      
      CampusService campusService = new CampusService(echo360ApiService.echo360Api());
      int limit = 500;
      String offset = "";
      ListRequest<Campus> campusList = campusService.list(limit, offset);
      return campusList;
   }

   /**
   * Method to call echo 360 Api for campus by ID.
   *
   * @return the single campus entity
   */
   public Campus getCampusById(String id) throws Echo360Exception {

      log.logString("getCampusById called...");

      CampusService campusService = new CampusService(echo360ApiService.echo360Api());
      Campus campus = campusService.get(id);

      return campus;
   }

}
