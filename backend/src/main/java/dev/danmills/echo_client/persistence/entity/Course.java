package dev.danmills.echo_client.persistence.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Course {
   public String id;
   public String institutionId;
   public String organizationId;
   public String departmentId;
   public String name;
   public String courseIdentifier;
   public int sectionCount;
   public String externalId;

}
