package dev.danmills.echo_client.persistence.entity;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties
public class Campuses {
   @JsonProperty("data")
   public ArrayList<Campus> data;
   @JsonProperty("has_more")
   private boolean hasMore;

   public ArrayList<Campus> getData() { return data; }
   public void setData(ArrayList<Campus> value) { this.data = value; }

   public boolean getHasMore() { return hasMore; }
   public void setHasMore(boolean value) { this.hasMore = value; }
}