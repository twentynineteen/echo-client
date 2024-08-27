package dev.danmills.echo_client.persistence.entity;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties
public class Courses {
   @JsonProperty("data")
   public ArrayList<Course> data;
   @JsonProperty("has_more")
   private boolean hasMore;
   @JsonProperty("next")
   public String next;
   
   public ArrayList<Course> getData() { return data; }
   public void setData(ArrayList<Course> value) { this.data = value; }

   public boolean getHasMore() { return hasMore; }
   public void setHasMore(boolean value) { this.hasMore = value; }
   
   public String getNext() { return next; }
   public void setNext(String value) { this.next = value; }
}
