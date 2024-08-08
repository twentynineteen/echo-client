package dev.danmills.echo_client.model;


import java.util.UUID;

public class Campus {
    private UUID id;
    private UUID institutionID;
    private String name;
    private TimeZone timeZone;
    private long timeZoneOffsetMinutes;

    public UUID getID() { return id; }
    public void setID(UUID value) { this.id = value; }

    public UUID getInstitutionID() { return institutionID; }
    public void setInstitutionID(UUID value) { this.institutionID = value; }

    public String getName() { return name; }
    public void setName(String value) { this.name = value; }

    public TimeZone getTimeZone() { return timeZone; }
    public void setTimeZone(TimeZone value) { this.timeZone = value; }

    public long getTimeZoneOffsetMinutes() { return timeZoneOffsetMinutes; }
    public void setTimeZoneOffsetMinutes(long value) { this.timeZoneOffsetMinutes = value; }
}

