package dev.danmills.echo_client.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.echo360.sdk.Echo360Api;
import com.echo360.sdk.model.requests.AuthRequest;
import com.echo360.sdk.util.Echo360Exception;
import com.echo360.sdk.util.Logger;

@Service
public class SDKTokenService {

   @Autowired
   private Environment environment;

   private static String clientSecret;
   private static String clientId;
  
   public SDKTokenService(Environment environment) {
      this.environment = environment;
      SDKTokenService.clientId = environment.getProperty("env.data.clientId");
      SDKTokenService.clientSecret = environment.getProperty("env.data.clientSecret");
   }
   
   private static final Logger log = new Logger();
   
   static String base = "https://echo360.org.uk";
   // Pull Echo 360 client secrets from environment - secrets.properties
   
   public static void list() throws Echo360Exception {
      try {
         Echo360Api echoSDK = new Echo360Api(base, clientId, clientSecret, log);
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

   public String returnTokenString() throws Echo360Exception {
      try {
          // Pull Echo 360 client secrets from environment - secrets.properties
          log.logString("=========================");
          log.logString("Client ID = " + clientId);
          Echo360Api echoSDK = new Echo360Api(base, clientId, clientSecret, log);
          AuthRequest authReturn = echoSDK.getCurrentCredentials();
          String tokenString = authReturn.access_token;
          log.logString("=========================");
          log.logString(tokenString);

          return tokenString;
      } catch (Echo360Exception e) {
         String messageString = "[" + e.getErrorType() + "] Error Message: " + e.getMessage();
         log.logString(messageString);
         return messageString;
      }
      
   }


}
