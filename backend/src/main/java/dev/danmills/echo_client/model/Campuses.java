package dev.danmills.echo_client.model;

public class Campuses {
   private Campus[] data;
   private boolean hasMore;

   public Campus[] getData() { return data; }
   public void setData(Campus[] value) { this.data = value; }

   public boolean getHasMore() { return hasMore; }
   public void setHasMore(boolean value) { this.hasMore = value; }
}