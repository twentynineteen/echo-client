package dev.danmills.echo_client.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.echo360.sdk.model.objects.Section;
import com.echo360.sdk.model.requests.ListRequest;
import com.echo360.sdk.util.Echo360Exception;

import dev.danmills.echo_client.persistence.entity.EchoLogger;
import dev.danmills.echo_client.service.RESTSectionService;

@RestController
public class SectionController {
   private final RESTSectionService restSectionService;
   private static final EchoLogger log = new EchoLogger();

   public SectionController(RESTSectionService restSectionService) {
      this.restSectionService = restSectionService;
   }

   /**
   * Get all of the Schedules.
   *
   * @return the list of entities
   */
  @GetMapping("/sections")
  @ResponseBody
  public ListRequest<Section> getSections() throws Echo360Exception {
   log.logString("Attempting to get Sections");
   return restSectionService.getSections();
  }
}
