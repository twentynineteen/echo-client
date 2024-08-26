package dev.danmills.echo_client.api.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import dev.danmills.echo_client.persistence.entity.Campus;
import dev.danmills.echo_client.persistence.entity.TimeZone;
// import dev.danmills.echo_client.repository.CampusRepository;

import dev.danmills.echo_client.service.RESTTokenService;



@RestController
public class CampusController {
   
   // private final CampusRepository campusRepository;
   // declare Token Service for calls to echo 360 API
   private final RESTTokenService restTokenService;
   private final ObjectMapper objectMapper;

   // Constructor 
   public CampusController(
      RESTTokenService restTokenService, 
      // CampusRepository campusRepository,
      ObjectMapper objectMapper
      ) {
      this.restTokenService = restTokenService;
      // this.campusRepository = campusRepository;
      this.objectMapper = objectMapper;
   }

   // GET Campuses endpoint using the redis client token
   @GetMapping("/campuses")
   @ResponseBody
   public List<Campus> getCampuses() {
      return getCampusRequest();
   }

   
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

   JsonNode getCampuses(JsonNode json) {
   return Optional.ofNullable(json)
            .map(j -> j.get("data"))
            .orElseThrow(() -> new IllegalArgumentException("Invalid JSON Object"));
   }
   
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