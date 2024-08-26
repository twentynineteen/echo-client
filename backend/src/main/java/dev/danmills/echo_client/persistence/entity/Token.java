package dev.danmills.echo_client.persistence.entity;


import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

@RedisHash
public class Token {
   @Id
   private String id;
   @JsonProperty
   String tokenType;
   @JsonProperty
   String accessToken;
   @JsonProperty
   long expiresIn;
   @JsonProperty
   String refreshToken;
   long expiryDate;

   @JsonCreator
   public Token(
      @JsonProperty("token_type")String tokenType, 
      @JsonProperty("access_token")String accessToken, 
      @JsonProperty("expires_in")long expiresIn, 
      @JsonProperty("refresh_token")String refreshToken,
      @JsonProperty("expiry_date")long expiryDate) {
         super();
         this.tokenType = tokenType;
         this.accessToken = accessToken;
         this.expiresIn = expiresIn;
         this.refreshToken = refreshToken;
         this.expiryDate = (System.currentTimeMillis() / 1000) + expiresIn;
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

   public long getExpiresIn() {
      return expiresIn;
   }
   public String getExpiresInString() {
      String string = Long.toString(expiresIn);
      return string;
   }

   public void setExpiresIn(long expiresIn) {
      this.expiresIn = expiresIn;
   }

   public String getRefreshToken() {
      return refreshToken;
   }

   public void setRefreshToken(String refreshToken) {
      this.refreshToken = refreshToken;
   }

   public String getExpiryDate() {
      String string = Long.toString(expiryDate);
      return string;
   }

   
}
