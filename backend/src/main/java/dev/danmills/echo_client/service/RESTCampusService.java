package dev.danmills.echo_client.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

<<<<<<< HEAD
import com.echo360.sdk.Echo360Api;
import com.echo360.sdk.model.objects.Campus;
import com.echo360.sdk.model.requests.AuthRequest;
import com.echo360.sdk.util.Echo360Exception;
import com.echo360.sdk.util.Logger;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import dev.danmills.echo_client.persistence.entity.Campuses;
=======
import com.fasterxml.jackson.databind.ObjectMapper;

import dev.danmills.echo_client.api.controller.CampusController;
import dev.danmills.echo_client.persistence.entity.Campus;

import dev.danmills.echo_client.persistence.entity.RESTResponse;
>>>>>>> 9d4211069a4e90ea38fb6d6b7698dc4a49876788

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
   * The `list()` function in Java initializes an Echo360Api object, retrieves authentication
   * credentials, and logs token logStringrmation, handling any Echo360Exception that may occur.
   */
   
   public void list() throws Echo360Exception {
      try {
            // Pull Echo 360 client secrets from environment - secrets.properties
         String clientId = environment.getProperty("env.data.clientId");
         String clientSecret = environment.getProperty("env.data.clientSecret");
         String baseUrl = "https://echo360.org.uk";
          Echo360Api echoSDK = new Echo360Api(baseUrl, clientId, clientSecret, (com.echo360.sdk.util.Logger) log);
          AuthRequest authReturn = echoSDK.getCurrentCredentials();

          log.logString("=========================================");
          log.logString("Token Type: " + authReturn.token_type);
          log.logString("Access Token: " + authReturn.access_token);
          log.logString("Refresh Token: " + authReturn.refresh_token);
          log.logString("Token Expires: " + authReturn.expires_in);
       
      }catch (Echo360Exception e){
          log.logString("[" + e.getErrorType() + "] Error Message: " + e.getMessage());
      }
      
   }

   /**
   * Method to call echo 360 Api for campuses.
   * Uses restTokenService middleware to collect access token
   *
   * @return the list of entities
   */
<<<<<<< HEAD
   public Campuses getCampuses() throws JsonMappingException, JsonProcessingException {
      log.logString("getCampusRequest called...");
=======
   public RESTResponse<Campus> getCampuses() {
      log.info("getCampusRequest called...");
>>>>>>> 9d4211069a4e90ea38fb6d6b7698dc4a49876788
      String access_token = restTokenService.tokenMiddleware();
      String base = "https://echo360.org.uk";
      String query = "?access_token=";
      String endpoint = "/public/api/v1/campuses";
      String uri = base + endpoint + query + access_token;
      // TODO: A Recursive REST Client / Handler class that collects API paginated responses.

      RestTemplate restTemplate = new RestTemplate(); 
<<<<<<< HEAD
      String responseEntity = restTemplate.getForObject(uri, String.class);
      log.logString("ResponseEntity is successfully found. ");
=======
      @SuppressWarnings("unchecked")
      RESTResponse<Campus> responseEntity = restTemplate.getForObject(uri, RESTResponse.class);
      log.info("ResponseEntity is successfully found. ");   

      return responseEntity;
   }

   @SuppressWarnings("null")
   public ArrayList<Campus> getPaginated(String uri) {
      String accessToken = restTokenService.tokenMiddleware();
      String base = "https://echo360.org.uk";
      String query = "&access_token=";

      ArrayList<Campus> campus = new ArrayList<>();
      RestTemplate restTemplate = new RestTemplate();
>>>>>>> 9d4211069a4e90ea38fb6d6b7698dc4a49876788
      
      @SuppressWarnings("unchecked")
      RESTResponse<Campus> responseEntity = restTemplate.getForObject(uri, RESTResponse.class);
      campus.addAll(responseEntity.getData());
         if (responseEntity.isHasMore()) {
            String newUri  = base + responseEntity.getNext() + query + accessToken;
            return getPaginated(newUri);
         } else {
            return campus;
         }
   }

   public ArrayList<Campus> getPaginatedCampuses() {
      log.info("Collecting Campuses using paginated response");
      String accessToken = restTokenService.tokenMiddleware();
      String base = "https://echo360.org.uk";
      String query = "&access_token=";
      String endpoint = "/public/api/v1/campuses?limit=100";
      String uri = base + endpoint + query + accessToken;

      ArrayList<Campus> campuses = getPaginated(uri);


      return campuses;
   }

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
<<<<<<< HEAD
      log.logString("ResponseEntity is successfully found. ");
=======
      try {
         log.info("ResponseEntity is successfully found: " + responseEntity.getName());
      } catch (Exception e) {
         log.info("Could not find a valid response: " + e);
      }
>>>>>>> 9d4211069a4e90ea38fb6d6b7698dc4a49876788
      Optional<Campus> campus = Optional.ofNullable(responseEntity);

      return campus;
   }

}
