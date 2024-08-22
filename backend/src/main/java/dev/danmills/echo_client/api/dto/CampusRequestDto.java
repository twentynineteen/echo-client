package dev.danmills.echo_client.api.dto;

import lombok.Builder;

@Builder
public class CampusRequestDto {
   private String id;
   private String institutionId;
   private String name;
}
