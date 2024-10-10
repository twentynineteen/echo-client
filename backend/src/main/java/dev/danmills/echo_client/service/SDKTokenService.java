package dev.danmills.echo_client.service;


import org.springframework.stereotype.Service;

import com.echo360.sdk.Echo360Api;
import com.echo360.sdk.model.requests.AuthRequest;
import com.echo360.sdk.util.Echo360Exception;
import com.echo360.sdk.util.Logger;

@Service
public class SDKTokenService {

  private static Echo360ApiService echo360ApiService;

   public SDKTokenService() {

   }
   
   private static final Logger log = new Logger();
   
   public static void list() throws Echo360Exception {
      try {
         Echo360Api echoSDK = echo360ApiService.echo360Api();
         AuthRequest authReturn = echoSDK.getCurrentCredentials();
         log.logString("=========================");
         log.logString("Token Type: " + authReturn.token_type);
         log.logString("Access Token: " + authReturn.access_token);
         log.logString("Refresh Token: " + authReturn.refresh_token);
         log.logString("Token Expires: " + authReturn.expires_in);
   
      } catch (Echo360Exception e){
         log.logString("[" + e.getErrorType() + "] Error Message: " + e.getMessage());
      }

   }

   public AuthRequest returnTokenString() throws Echo360Exception {

      // Pull Echo 360 client secrets from environment - secrets.properties
      log.logString("=========================");
      Echo360Api echoSDK = echo360ApiService.echo360Api();
      AuthRequest authReturn = echoSDK.getCurrentCredentials();
      String tokenString = authReturn.access_token;
      log.logString("=========================");
      log.logString(tokenString);

         

      return authReturn;
   }


}
