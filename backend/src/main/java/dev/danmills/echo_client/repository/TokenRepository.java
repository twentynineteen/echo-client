package dev.danmills.echo_client.repository;

import org.springframework.data.repository.CrudRepository;

import dev.danmills.echo_client.model.Token;


public interface TokenRepository extends CrudRepository<Token, String> {

   // return access token as string
   String getAccessToken();

   // return refresh token as string
   String getRefreshToken();

}
