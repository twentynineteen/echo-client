package dev.danmills.echo_client.model;

import java.util.concurrent.TimeUnit;

public class Token {
   String tokenType;
   String accessToken;
   TimeUnit expiresIn;
   String refreshToken;
   
   public Token(String tokenType, String accessToken, TimeUnit expiresIn, String refreshToken) {
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

   public TimeUnit getExpiresIn() {
      return expiresIn;
   }

   public void setExpiresIn(TimeUnit expiresIn) {
      this.expiresIn = expiresIn;
   }

   public String getRefreshToken() {
      return refreshToken;
   }

   public void setRefreshToken(String refreshToken) {
      this.refreshToken = refreshToken;
   }

   
}
