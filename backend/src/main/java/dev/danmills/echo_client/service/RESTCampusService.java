package dev.danmills.echo_client.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import dev.danmills.echo_client.persistence.entity.Campus;
import dev.danmills.echo_client.persistence.entity.TimeZone;

@Service
public class RESTCampusService {
   
   // private final CampusRepository campusRepository;
   
   // declare Token Service for calls to echo 360 API
   private final RESTTokenService restTokenService;
   
   private final ObjectMapper objectMapper;
   
   // Constructor 
   public RESTCampusService(
         // CampusRepository campusRepository,
         RESTTokenService restTokenService, 
         ObjectMapper objectMapper
         ) {
            // this.campusRepository = campusRepository;
      this.restTokenService = restTokenService;
      this.objectMapper = objectMapper;
   }

   /**
    * The function retrieves campus data from an API, processes it, saves it to a repository, and returns
    * all campuses.
    * 
    * @return The `getCampusRequest` method is returning a list of `Campus` objects. The method retrieves
    * campus data from an external API, processes the data, saves it to a repository, and then returns all
    * campuses from the repository.
    */
   public List<Campus> getCampusRequest() {
      String access_token = restTokenService.getAccessTokenStringFromRedis();

      String uri = "https://echo360.org.uk/public/api/v1/campuses?access_token=" + access_token;

      List<Campus> campuses = new ArrayList<>();
      JsonNode json;

      RestTemplate restTemplate = new RestTemplate();
      String responseEntity = restTemplate.getForObject(uri, String.class);
      
      try (InputStream inputStream = TypeReference.class.getResourceAsStream(responseEntity)) {
         json = objectMapper.readValue(inputStream, JsonNode.class);
      } catch (IOException e) {
         throw new RuntimeException("Failed to read Campus data", e);
      }

      JsonNode nodes = getCampuses(json);
      for (JsonNode campus : nodes) {
         campuses.add(createCampusFromNode(campus));
      }

      // campusRepository.saveAll(campuses);

      return campuses;
   }

   /**
    * The function `getCampuses` returns the "data" field from a JSON object or throws an exception if the
    * JSON object is invalid.
    * 
    * @param json The `json` parameter is a JSON object that contains data related to campuses. The
    * `getCampuses` method is designed to extract the "data" field from this JSON object. If the "data"
    * field is present, it will return that field as a JsonNode. If the "data
    * @return The `getCampuses` method returns the "data" field from the provided JSON object. If the JSON
    * object is null or does not contain a "data" field, it will throw an `IllegalArgumentException` with
    * the message "Invalid JSON Object".
    */
   JsonNode getCampuses(JsonNode json) {
      return Optional.ofNullable(json)
               .map(j -> j.get("data"))
               .orElseThrow(() -> new IllegalArgumentException("Invalid JSON Object"));
   }

   /**
    * The function `createCampusFromNode` extracts data from a JSON node to create a Campus object with
    * specific attributes.
    * 
    * @param nodes The `createCampusFromNode` method takes a `JsonNode` object as a parameter. This
    * `JsonNode` object is expected to have a structure containing data related to a campus. The method
    * extracts specific fields from this `JsonNode` object to create a `Campus` object.
    * @return An instance of the `Campus` class is being returned, created using the data extracted from
    * the provided `JsonNode` object.
    */
   private Campus createCampusFromNode(JsonNode nodes) {
      JsonNode data = nodes.get("data");
      String id = data.get("id").asText();
      String institutionId = data.get("institutionId").asText();
      String name = data.get("name").asText();
      String timeZone = data.get("timeZone").asText();
      long timeZoneOffsetMinutes = data.get("timeZoneOffsetMinutes").asLong();

      TimeZone convertedTimeZone = TimeZone.valueOf(timeZone);

      return new Campus(id, institutionId, name, convertedTimeZone, timeZoneOffsetMinutes);
   }

}
