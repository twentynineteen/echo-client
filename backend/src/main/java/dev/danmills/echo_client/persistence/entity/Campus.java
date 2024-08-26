package dev.danmills.echo_client.persistence.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Campus{
    public String id;
    public String institutionId;
    public String name;
    public String timeZone;
    public int timeZoneOffsetMinutes;


}

