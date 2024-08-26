package dev.danmills.echo_client.api.controller;

import dev.danmills.echo_client.service.RESTTokenService;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
public class RestSpringBootController {

   // Declare rest services for methods
   private RESTTokenService restTokenService;   

   public RestSpringBootController (RESTTokenService restTokenService) {
      this.restTokenService = restTokenService;
   }

   @RequestMapping("/")
   public String hello() {
       return "Hello, World!";
   }
   
   // This needs to be removed and built into a method that is only called in the event of a missing or invalid token
   @GetMapping("/token")
   @ResponseBody
   @Async
   public String getToken() {

      // request new String access_token
      String newToken = restTokenService.getAccessTokenStringFromRedis();
      String result = "Token is: " + newToken;

      return result;
   }
   
}

