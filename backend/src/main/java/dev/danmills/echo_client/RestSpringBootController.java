package dev.danmills.echo_client;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import dev.danmills.echo_client.model.Token;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@RestController
public class RestSpringBootController {
   
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
   
   @GetMapping("/campuses")
   @ResponseBody
   public String getCampuses() {
         // Hard coded access token before implementation of refresh / access token middleware function

         Token access_token = new Token("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJFY2hvMzYwIiwiZXhwIjoxNzIyMTExNzcxLCJjb250ZW50Ijp7ImNsaWVudElkIjoiYTVlZTA5Y2MtZjVhMS00YTM5LThkMzctZmViZDkwYmU2ODdmIiwiYXV0aERhdGEiOnsiaW5zdGl0dXRpb25JZCI6ImM3MWQ3ZmZkLTU2NzktNDU1ZC1iZjZiLTdlZThkY2QxOTg0NyJ9LCJjcmVhdGVkQXQiOnsieWVhciI6MjAyNCwibW9udGgiOjcsImRheSI6Mjd9fX0.gAr9R14y-XmX90Em28q27FN2oRFnuQKHZvkRaCZq1SzE9C3cR-c6r2-sZOcx79GKKnkYpyWcq7D_WVjhueW9lQ");


         String uri = "https://echo360.org.uk/public/api/v1/campuses?access_token=" + access_token.getToken();

         RestTemplate restTemplate = new RestTemplate();
         String result = restTemplate.getForObject(uri, String.class);
      return result;
   }
   
}
