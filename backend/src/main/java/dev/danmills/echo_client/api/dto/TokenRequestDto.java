package dev.danmills.echo_client.api.dto;
import lombok.Builder;

@Builder
public class TokenRequestDto {
   private String accessToken;
   private String refreshToken;
}
