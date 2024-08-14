package dev.danmills.echo_client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.client.RestTemplate;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
public class RestSpringBootController {

   // Autowire the Environment object for accessing environment variables
   @Autowired
   private Environment environment;
   
   @RequestMapping("/hello")
   public String hello() {
       return "Hello world";
   }

   @GetMapping(value = "/callclienthello")
   private String getHelloClient() {
      String uri = "http://localhost:8080/hello";
      RestTemplate restTemplate = new RestTemplate();
      String result = restTemplate.getForObject(uri, String.class);
      return result;
   }
   
   // This request sends a manual call to the echo API for an access token before printing to the console
   // TO DO - turn string response into token class which can be verified and used as a session cookie
   // This needs to be removed and built into a method that is only called in the event of a missing or invalid token
   @GetMapping("/token")
   @ResponseBody
   public String getToken() {
      // Echo 360 endpoint to generate a new access token
      String uri = "https://echo360.org.uk/oauth2/access_token";
      String grantType = "client_credentials";
      
      // Pull Echo 360 client secrets from environment - secrets.properties
      String clientId = environment.getProperty("env.data.clientId");
      String clientSecret = environment.getProperty("env.data.clientSecret");

      // Concatenate uri and params into request
      String request = uri + "?grant_type=" + grantType
                        + "&client_id=" + clientId
                        + "&client_secret=" + clientSecret;

      // Send acess token request via rest template
      RestTemplate restTemplate = new RestTemplate();
      String result = restTemplate.postForObject(request, null, String.class);

      return result;
   }
   
   // // GET Campuses endpoint using hard coded token
   // @GetMapping("/campuses")
   // @ResponseBody
   // public String getCampuses() {
         
   //    // Hard coded access token before implementation of refresh / access token middleware function
   //       Token access_token = new Token("TOKEN_HERE");

   //       String uri = "https://echo360.org.uk/public/api/v1/campuses?access_token=" + access_token.getToken();

   //       RestTemplate restTemplate = new RestTemplate();
   //       String result = restTemplate.getForObject(uri, String.class);
   //       // Campus result = restTemplate.getForObject(uri, Campus.class);

   //       System.out.println(result.toString());
   //    return result;
   //    // return result.toString();
   // }
   
}
