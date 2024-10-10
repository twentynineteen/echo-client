package dev.danmills.echo_client.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.echo360.sdk.Echo360Api;
import com.echo360.sdk.util.Echo360Exception;
import com.echo360.sdk.util.Logger;

@Service
public class Echo360ApiService {

   @Autowired
   private Environment environment;
   
   private static final Logger log = new Logger();
   
   public Echo360ApiService(Environment environment) {
      this.environment = environment;
   }

   public Echo360Api echo360Api() throws Echo360Exception {
      
      final String base = "https://echo360.org.uk";
      final String clientId = environment.getProperty("env.data.clientId");
      final String clientSecret = environment.getProperty("env.data.clientSecret");
      Echo360Api echoSDK = new Echo360Api(base, clientId, clientSecret, log);
      return echoSDK;
   }
   
}
