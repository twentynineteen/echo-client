package dev.danmills.echo_client.service;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.echo360.sdk.Echo360Api;
import com.echo360.sdk.model.requests.AuthRequest;
import com.echo360.sdk.util.Echo360Exception;
import com.fasterxml.jackson.databind.ObjectMapper;

import dev.danmills.echo_client.persistence.entity.EchoLogger;

@Service
public class RESTCampusService {
   
   // declare Token Service for calls to echo 360 API
   private final SDKTokenService sdkTokenService;

   // private static final Logger log = LoggerFactory.getLogger(RESTCampusService.class);
   
   // private static final Logger log = new Logger();
   
   private final ObjectMapper objectMapper;

   // Autowire the Environment object for accessing environment variables
   private final Environment environment;
   
   // Constructor 
   public RESTCampusService(SDKTokenService sdkTokenService, 
                           ObjectMapper objectMapper, 
                           Environment environment) {
         this.sdkTokenService = sdkTokenService;
         this.objectMapper = objectMapper;
         this.environment = environment;         
      }



   /**
   * The `list()` function in Java initializes an Echo360Api object, retrieves authentication
   * credentials, and logs token logStringrmation, handling any Echo360Exception that may occur.
   */
   
   public void list() throws Echo360Exception {
      EchoLogger log = new EchoLogger();
      try {
         
            // Pull Echo 360 client secrets from environment - secrets.properties
         String clientId = environment.getProperty("env.data.clientId");
         String clientSecret = environment.getProperty("env.data.clientSecret");
         String baseUrl = "https://echo360.org.uk";
          Echo360Api echoSDK = new Echo360Api(baseUrl, clientId, clientSecret, log);
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

   // /**
   // * Method to call echo 360 Api for campuses.
   // * Uses restTokenService middleware to collect access token
   // *
   // * @return the list of entities
   // */
   // public Campuses getCampuses() throws JsonMappingException, JsonProcessingException {
   //    EchoLogger log = new EchoLogger();
   //    log.logString("getCampusRequest called...");
   //    String access_token = restTokenService.tokenMiddleware();
   //    String base = "https://echo360.org.uk";
   //    String query = "?access_token=";
   //    String endpoint = "/public/api/v1/campuses";
   //    String uri = base + endpoint + query + access_token;
   //    // TODO: A Recursive REST Client / Handler class that collects API paginated responses.

   //    // Request Campuses from echo 360 and return as String.class
   //    RestTemplate restTemplate = new RestTemplate(); 
   //    String responseEntity = restTemplate.getForObject(uri, String.class);
   //    log.logString("ResponseEntity is successfully found. ");
      
   //    // Convert string response to Campuses.class
   //    Campuses campuses = objectMapper.readValue(responseEntity, Campuses.class); 

   //    return campuses;
   // }

   // /**
   // * Method to call echo 360 Api for campus by ID.
   // * Uses restTokenService middleware to collect access token
   // *
   // * @return the single campus entity
   // */
   // public Optional<Campus> getCampusById(String id) {
   //    // Request access token from redis cache via middleware
   //    EchoLogger log = new EchoLogger();
   //    log.logString("getCampusById called...");
   //    String access_token = restTokenService.tokenMiddleware();
   //    String uri = "https://echo360.org.uk/public/api/v1/campuses/" + id + "?access_token=" + access_token;

   //    // Request campus from echo 360 and return as campus
   //    RestTemplate restTemplate = new RestTemplate(); 
   //    Campus responseEntity = restTemplate.getForObject(uri, Campus.class);
   //    log.logString("ResponseEntity is successfully found. ");
   //    Optional<Campus> campus = Optional.ofNullable(responseEntity);

   //    return campus;
   // }

}
