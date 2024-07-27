package dev.danmills.echo_client.model;

public class Token {
   String access_token;

   public Token(String access_token){
      this.access_token = access_token;
   }

   public String getToken() {
      return access_token;
   }
}
