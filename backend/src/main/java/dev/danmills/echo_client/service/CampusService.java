package dev.danmills.echo_client.service;


import dev.danmills.echo_client.api.dto.CampusRequestDto;
import dev.danmills.echo_client.persistence.entity.Campus;
import dev.danmills.echo_client.persistence.repository.CampusRepository;


public class CampusService {
   private final CampusRepository campusRepository;

   public CampusService(CampusRepository campusRepository) {
      this.campusRepository = campusRepository;
   }

   public CampusRequestDto getCampusDtoById(String id) {
      Campus campusEntity = campusRepository.findById(id);

      return CampusRequestDto.builder()
               .name(campusEntity.getName())
               .id(campusEntity.getId())
               .institutionId(campusEntity.getInstitutionId())
               .build();
   }

}
