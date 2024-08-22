package dev.danmills.echo_client.service;


import dev.danmills.echo_client.api.dto.TokenRequestDto;
import dev.danmills.echo_client.persistence.entity.Token;
import dev.danmills.echo_client.persistence.repository.TokenRepository;

public class TokenService {

   private final TokenRepository tokenRepository;

   public TokenService(TokenRepository tokenRepository) {
      this.tokenRepository = tokenRepository;
   }

   public TokenRequestDto getToken() {
      Token tokenEntity = tokenRepository.findToken();

      return TokenRequestDto.builder()
                  .accessToken(tokenEntity.getAccessToken())
                  .refreshToken(tokenEntity.getRefreshToken())
                  .build();
   }
}
