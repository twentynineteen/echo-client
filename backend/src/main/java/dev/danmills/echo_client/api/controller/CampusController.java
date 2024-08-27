package dev.danmills.echo_client.api.controller;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import dev.danmills.echo_client.persistence.entity.Campus;
import dev.danmills.echo_client.persistence.entity.Campuses;
import dev.danmills.echo_client.service.RESTCampusService;

@RestController
public class CampusController {
   
   private final RESTCampusService restCampusService;

   private static final Logger log = LoggerFactory.getLogger(CampusController.class);

   // Constructor 
   public CampusController(RESTCampusService restCampusService) {
      this.restCampusService = restCampusService;
   }

   /**
   * Get all of the campuses.
   *
   * @return the list of entities
   */
   @GetMapping("/campuses")
   @ResponseBody
   public Campuses getCampuses() throws JsonMappingException, JsonProcessingException {
      log.info("Attempting to get campuses");
      return restCampusService.getCampusRequest();
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