package dev.danmills.echo_client.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.echo360.sdk.model.objects.Organization;
import com.echo360.sdk.model.requests.ListRequest;
import com.echo360.sdk.util.Echo360Exception;

import dev.danmills.echo_client.persistence.entity.EchoLogger;
import dev.danmills.echo_client.service.RESTOrganizationService;


@RestController
public class OrganizationController {
   private final RESTOrganizationService restOrganizationService;
   private static final EchoLogger log = new EchoLogger();

   public OrganizationController(RESTOrganizationService restOrganizationService) {
      this.restOrganizationService = restOrganizationService;
   }

   @GetMapping("/organizations")
   @ResponseBody
   public ListRequest<Organization> getOrganizations() throws Echo360Exception {
      log.logString("Attempting to get organizations");
       return restOrganizationService.getOrganizations();
   }
   
}
