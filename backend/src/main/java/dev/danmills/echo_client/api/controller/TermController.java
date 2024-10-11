package dev.danmills.echo_client.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.echo360.sdk.model.objects.Term;
import com.echo360.sdk.model.requests.ListRequest;
import com.echo360.sdk.util.Echo360Exception;

import dev.danmills.echo_client.persistence.entity.EchoLogger;
import dev.danmills.echo_client.service.RESTTermService;

@RestController
public class TermController {
   private final RESTTermService restTermService;
   private static final EchoLogger log = new EchoLogger();

   public TermController(RESTTermService restTermService) {
      this.restTermService = restTermService;
   }

   /**
   * Get all of the Terms.
   *
   * @return the list of entities
   */
  @GetMapping("/terms")
  @ResponseBody
  public ListRequest<Term> getTerms() throws Echo360Exception {
   log.logString("Attempting to get terms");
   return restTermService.getTerms();
  }

     /**
   * Get one Term by ID.
   *
   * @param id is the id of the entity
   * @return the Term entity
   */
   @GetMapping("/terms/{id}")
   @ResponseBody
   public Term getTermById(@PathVariable String id) throws Echo360Exception {
      return restTermService.getTermById(id);

   }
}
