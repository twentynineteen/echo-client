package dev.danmills.echo_client.api.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.echo360.sdk.model.objects.User;
import com.echo360.sdk.model.requests.ListRequest;
import com.echo360.sdk.util.Echo360Exception;

import dev.danmills.echo_client.persistence.entity.EchoLogger;
import dev.danmills.echo_client.service.RESTUserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
   private final RESTUserService restUserService;
   private static final EchoLogger log = new EchoLogger();

   public UserController(RESTUserService restUserService) {
      this.restUserService = restUserService;
   }

   /**
   * Get all of the Users.
   *
   * @return the list of entities
   */
  @GetMapping("/users")
  @ResponseBody
  public ListRequest<User> getUsers() throws Echo360Exception {
   log.logString("Attempting to get Users");
   return restUserService.getUsers();
  }

   /**
   * Get one user by ID or Email address.
   *
   * @param id is the id or email address of the entity
   * @return the user entity
   */
   @GetMapping("/users/{id}")
   @ResponseBody
   public User getUserByIdOrEmail(@PathVariable String id) throws Echo360Exception {
      return restUserService.getUserByIdOrEmail(id);

   }
}
