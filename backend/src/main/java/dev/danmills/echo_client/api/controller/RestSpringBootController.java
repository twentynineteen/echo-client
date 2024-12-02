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

   @GetMapping("/token")
   @ResponseBody
   @Async
   public AuthRequest getToken() throws Echo360Exception {
      AuthRequest newToken = sdkTokenService.returnToken();
      return newToken;
   }
   
}

