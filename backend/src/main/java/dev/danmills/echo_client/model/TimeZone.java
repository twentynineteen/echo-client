package dev.danmills.echo_client.model;

import java.io.IOException;

public enum TimeZone {
    ANTARCTICA_SOUTH_POLE, EUROPE_DUBLIN, EUROPE_LONDON;

    public String toValue() {
        switch (this) {
            case ANTARCTICA_SOUTH_POLE: return "Antarctica/South_Pole";
            case EUROPE_DUBLIN: return "Europe/Dublin";
            case EUROPE_LONDON: return "Europe/London";
        }
        return null;
    }

    public static TimeZone forValue(String value) throws IOException {
        if (value.equals("Antarctica/South_Pole")) return ANTARCTICA_SOUTH_POLE;
        if (value.equals("Europe/Dublin")) return EUROPE_DUBLIN;
        if (value.equals("Europe/London")) return EUROPE_LONDON;
        throw new IOException("Cannot deserialize TimeZone");
    }
}

