package dev.danmills.echo_client.persistence.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Campus {
    @JsonProperty("id")
    private String id;
    @JsonProperty("institutionId")
    private String institutionId;
    @JsonProperty("name")
    private String name;
    @JsonProperty("timeZone")
    private TimeZone timeZone;
    @JsonProperty("timeZoneOffsetMinutes")
    private long timeZoneOffsetMinutes;

    public String getId() { return id; }
    public void setId(String value) { this.id = value; }

    public String getInstitutionId() { return institutionId; }
    public void setInstitutionId(String value) { this.institutionId = value; }

    public String getName() { return name; }
    public void setName(String value) { this.name = value; }

    public TimeZone getTimeZone() { return timeZone; }
    public void setTimeZone(TimeZone value) { this.timeZone = value; }

    public long getTimeZoneOffsetMinutes() { return timeZoneOffsetMinutes; }
    public void setTimeZoneOffsetMinutes(long value) { this.timeZoneOffsetMinutes = value; }
}

