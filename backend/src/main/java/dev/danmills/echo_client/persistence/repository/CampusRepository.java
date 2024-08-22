package dev.danmills.echo_client.persistence.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import dev.danmills.echo_client.persistence.entity.Campus;

import java.util.List;



@Repository
public interface CampusRepository extends CrudRepository <Campus, Object> {
   
   Campus findById(String id);
   
   List<Campus> findByInstitutionId(String institutionId);

   Campus findByName(String name);
}
