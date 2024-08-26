package dev.danmills.echo_client.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import dev.danmills.echo_client.persistence.entity.Token;


@Repository
public interface TokenRepository extends CrudRepository<Token, String> {

   Token findToken();

}
