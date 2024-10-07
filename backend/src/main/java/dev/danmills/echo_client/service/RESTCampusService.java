package dev.danmills.echo_client.service;

import java.util.Optional;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.echo360.sdk.model.objects.Campus;
import com.echo360.sdk.util.Logger;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class RESTCampusService {
   
   // declare Token Service for calls to echo 360 API
   private final RESTTokenService restTokenService;

   // private static final Logger log = LoggerFactory.getLogger(RESTCampusService.class);
   private static final Logger log = new Logger();
   
   private final ObjectMapper objectMapper;

   // Autowire the Environment object for accessing environment variables
   private final Environment environment;
   
   // Constructor 
   public RESTCampusService(RESTTokenService restTokenService, 
                           ObjectMapper objectMapper, 
                           Environment environment) {
         this.restTokenService = restTokenService;
         this.objectMapper = objectMapper;
         this.environment = environment;         
      }





   /**
   * Method to call echo 360 Api for campuses.
   * Uses restTokenService middleware to collect access token
   *
   * @return the list of entities
   */
   // public Campus getCampuses() throws JsonMappingException, JsonProcessingException {
   //    log.logString("getCampusRequest called...");
   //    String access_token = restTokenService.tokenMiddleware();
   //    String base = "https://echo360.org.uk";
   //    String query = "?access_token=";
   //    String endpoint = "/public/api/v1/campuses";
   //    String uri = base + endpoint + query + access_token;
   //    // TODO: A Recursive REST Client / Handler class that collects API paginated responses.

   //    RestTemplate restTemplate = new RestTemplate(); 
   //    String responseEntity = restTemplate.getForObject(uri, String.class);
   //    log.logString("ResponseEntity is successfully found. ");

      
   //    // @SuppressWarnings("unchecked")
   //    RESTResponse<Campus> responseEntity = restTemplate.getForObject(uri, RESTResponse.class);
   //    Campus.addAll(responseEntity.getData());
   //       if (responseEntity.isHasMore()) {
   //          String newUri  = base + responseEntity.getNext() + query + accessToken;
   //          return getPaginated(newUri);
   //       } else {
   //          return Campus;
   //       }
   // }

   // public ArrayList<Campus> getPaginatedCampuses() {
   //    log.info("Collecting Campuses using paginated response");
   //    String accessToken = restTokenService.tokenMiddleware();
   //    String base = "https://echo360.org.uk";
   //    String query = "&access_token=";
   //    String endpoint = "/public/api/v1/campuses?limit=100";
   //    String uri = base + endpoint + query + accessToken;

   //    ArrayList<Campus> campuses = getPaginated(uri);


   //    return campuses;
   // }

   /**
   * Method to call echo 360 Api for campus by ID.
   * Uses restTokenService middleware to collect access token
   *
   * @return the single campus entity
   */
   @SuppressWarnings("null")
   public Optional<Campus> getCampusById(String id) {
      // Request access token from redis cache via middleware
      log.logString("getCampusById called...");
      String access_token = restTokenService.tokenMiddleware();
      String uri = "https://echo360.org.uk/public/api/v1/campuses/" + id + "?access_token=" + access_token;

      // Request campus from echo 360 and return as campus
      RestTemplate restTemplate = new RestTemplate(); 
      Campus responseEntity = restTemplate.getForObject(uri, Campus.class);
      log.logString("ResponseEntity is successfully found. ");
      Optional<Campus> campus = Optional.ofNullable(responseEntity);

      return campus;
   }

}
