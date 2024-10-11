package dev.danmills.echo_client.service;

import org.springframework.stereotype.Service;

import com.echo360.sdk.model.objects.User;
import com.echo360.sdk.model.requests.ListRequest;
import com.echo360.sdk.services.UserService;
import com.echo360.sdk.util.Echo360Exception;

import dev.danmills.echo_client.persistence.entity.EchoLogger;

@Service
public class RESTUserService {
   private final Echo360ApiService echo360ApiService;
   private static final EchoLogger log = new EchoLogger();

   public RESTUserService(Echo360ApiService echo360ApiService) {
      this.echo360ApiService = echo360ApiService;
   }

   /**
   * This function retrieves a list of users with a specified limit and offset.
   * 
   * @return The `getUsers` method returns a `ListRequest` object containing a list of `User`
   * objects.
   */
   public ListRequest<User> getUsers() throws Echo360Exception {
      log.logString("getUsers called... ");

      UserService userService = new UserService(echo360ApiService.echo360Api());
      int limit = 500;
      String offset = "";
      ListRequest<User> userList = userService.list(limit, offset);
      return userList;
   }

   /**
   * This function retrieves a user specified by its ID or email address.
   * 
   * @return The `getUserByIdOrEmail` method returns a `User` object
   */
   public User getUserByIdOrEmail(String IdOrEmail) throws Echo360Exception {
      log.logString("getUserByIdOrEmail called...");

      UserService userService = new UserService(echo360ApiService.echo360Api());
      return userService.get(IdOrEmail);
   }
}
