package dev.danmills.echo_client.api.controller;

import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.echo360.sdk.model.requests.AuthRequest;
import com.echo360.sdk.util.Echo360Exception;

import dev.danmills.echo_client.service.SDKTokenService;

@RestController
public class RestSpringBootController {

   // Declare rest services for methods
   private final SDKTokenService sdkTokenService;   

   public RestSpringBootController (SDKTokenService sdkTokenService) {
      this.sdkTokenService = sdkTokenService;
   }

   @RequestMapping("/")
   public String hello() {
       return "Hello, World!";
   }
   
   // This needs to be removed and built into a method that is only called in the event of a missing or invalid token
   @GetMapping("/token")
   @ResponseBody
   @Async
   public AuthRequest getToken() throws Echo360Exception {

      // request new String access_token
      AuthRequest newToken = sdkTokenService.returnToken();
      // String result = "Token is: " + newToken;

      return newToken;
   }
   
}

