package dev.danmills.echo_client.service;

import org.springframework.stereotype.Service;

import com.echo360.sdk.model.objects.Term;
import com.echo360.sdk.model.requests.ListRequest;
import com.echo360.sdk.services.TermService;
import com.echo360.sdk.util.Echo360Exception;

import dev.danmills.echo_client.persistence.entity.EchoLogger;

@Service
public class RESTTermService {
   private final Echo360ApiService echo360ApiService;
   private static final EchoLogger log = new EchoLogger();

   public RESTTermService(Echo360ApiService echo360ApiService) {
      this.echo360ApiService = echo360ApiService;
   }

   /**
   * This function retrieves a list of terms with a specified limit and offset.
   * 
   * @return The `getTerms` method returns a `ListRequest` object containing a list of `Term`
   * objects.
   */
   public ListRequest<Term> getTerms() throws Echo360Exception {
      log.logString("getTerms called... ");

      TermService termService = new TermService(echo360ApiService.echo360Api());
      int limit = 500;
      String offset = "";
      ListRequest<Term> termList = termService.list(limit, offset);
      return termList;
   }

   /**
   * This function retrieves a term specified by its ID.
   * 
   * @return The `getTermById` method returns a `Term` object
   */
   public Term getTermById(String termId) throws Echo360Exception {
      log.logString("getTermById called...");

      TermService termService = new TermService(echo360ApiService.echo360Api());
      return termService.get(termId);
   }
}
