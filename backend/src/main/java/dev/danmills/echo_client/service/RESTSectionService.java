package dev.danmills.echo_client.service;

import org.springframework.stereotype.Service;

import com.echo360.sdk.model.objects.Section;
import com.echo360.sdk.model.requests.ListRequest;
import com.echo360.sdk.services.SectionService;
import com.echo360.sdk.util.Echo360Exception;

import dev.danmills.echo_client.persistence.entity.EchoLogger;

@Service
public class RESTSectionService {

   private final Echo360ApiService echo360ApiService;
   private static final EchoLogger log = new EchoLogger();

   public RESTSectionService(Echo360ApiService echo360ApiService) {
      this.echo360ApiService = echo360ApiService;
   }

   public ListRequest<Section> getSections() throws Echo360Exception {
      log.logString("getSections called... ");

      SectionService sectionService = new SectionService(echo360ApiService.echo360Api());
      int limit = 150;
      String offset = "";
      ListRequest<Section> sectionList = sectionService.list(limit, offset);
      return sectionList;

   }

/**
 * This Java function retrieves a section by its ID using the Echo360 API.
 * 
 * @param id The `id` parameter in the `getSectionById` method is used to specify the unique identifier
 * of the section that you want to retrieve. This identifier is typically used to look up and fetch the
 * specific section from the system or database.
 * @return The method `getSectionById` is returning a `Section` object.
 */
   public Section getSectionById(String id) throws Echo360Exception {
      log.logString("getSectionById called... ");

      SectionService sectionService = new SectionService(echo360ApiService.echo360Api());
      Section section = sectionService.get(id);
      return section;

   }
}
