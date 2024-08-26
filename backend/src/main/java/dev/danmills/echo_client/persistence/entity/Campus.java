package dev.danmills.echo_client.persistence.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Campus (
    String id,
    String institutionId,
    String name,
    TimeZone timeZone,
    long timeZoneOffsetMinutes) {

    public String getId() { return id; }
    public String getInstitutionId() { return institutionId; }
    public String getName() { return name; }
    public TimeZone getTimeZone() { return timeZone; }
    public long getTimeZoneOffsetMinutes() { return timeZoneOffsetMinutes; }
}

