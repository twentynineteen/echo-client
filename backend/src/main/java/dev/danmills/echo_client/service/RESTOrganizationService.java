package dev.danmills.echo_client.service;

import org.springframework.stereotype.Service;

import com.echo360.sdk.model.objects.Organization;
import com.echo360.sdk.model.requests.ListRequest;
import com.echo360.sdk.services.OrganizationService;
import com.echo360.sdk.util.Echo360Exception;

import dev.danmills.echo_client.persistence.entity.EchoLogger;

@Service
public class RESTOrganizationService {
   private final Echo360ApiService echo360ApiService;

   public RESTOrganizationService(Echo360ApiService echo360ApiService) {
      this.echo360ApiService = echo360ApiService;
   }

/**
 * The function `getOrganizations` retrieves a list of organizations with a specified limit and offset.
 * 
 * @return The method `getOrganizations()` is returning a `ListRequest` containing `Organization`
 * objects.
 */
   public ListRequest<Organization> getOrganizations() throws Echo360Exception {
      EchoLogger log = new EchoLogger();
      log.logString("getCampusRequest called...");
      
      OrganizationService organizationService = new OrganizationService(echo360ApiService.echo360Api());
      int limit = 500;
      String offset = "";
      ListRequest<Organization> organizationList = organizationService.list(limit, offset);
      return organizationList;
   }

}
