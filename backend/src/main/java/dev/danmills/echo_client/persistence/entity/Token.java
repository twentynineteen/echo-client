package dev.danmills.echo_client.persistence.entity;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Token {
   @JsonProperty
   String tokenType;
   @JsonProperty
   String accessToken;
   @JsonProperty
   String expiresIn;
   @JsonProperty
   String refreshToken;

   @JsonCreator
   public Token(
      @JsonProperty("token_type")String tokenType, 
      @JsonProperty("access_token")String accessToken, 
      @JsonProperty("expires_in")String expiresIn, 
      @JsonProperty("refresh_token")String refreshToken) {
         super();
         this.tokenType = tokenType;
         this.accessToken = accessToken;
         this.expiresIn = expiresIn;
         this.refreshToken = refreshToken;
   }

   public String getTokenType() {
      return tokenType;
   }

   public void setTokenType(String tokenType) {
      this.tokenType = tokenType;
   }

   public String getAccessToken() {
      return accessToken;
   }

   public void setAccessToken(String accessToken) {
      this.accessToken = accessToken;
   }

   public String getExpiresIn() {
      return expiresIn;
   }

   public void setExpiresIn(String expiresIn) {
      this.expiresIn = expiresIn;
   }

   public String getRefreshToken() {
      return refreshToken;
   }

   public void setRefreshToken(String refreshToken) {
      this.refreshToken = refreshToken;
   }

   
}
