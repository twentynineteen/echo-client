package dev.danmills.echo_client.persistence.entity;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties
public class RESTResponse<T> {
   @JsonProperty("data")
   private ArrayList<T> data;
   @JsonProperty("has_more")
   private boolean hasMore;
   @JsonProperty("next")
   private String next;

   public RESTResponse(ArrayList<T> data, boolean hasMore, String next) {
      super();
   }

   public RESTResponse(ArrayList<T> data, boolean hasMore) {
      super();
   }

   public RESTResponse() {
      super();
   }

}
