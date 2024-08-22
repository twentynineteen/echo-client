package dev.danmills.echo_client.service;

import dev.danmills.echo_client.repository.TokenRepository;

public class TokenService {
   TokenRepository tokenRepository;

   public TokenService(TokenRepository tokenRepository) {
      this.tokenRepository = tokenRepository;
   }
}
