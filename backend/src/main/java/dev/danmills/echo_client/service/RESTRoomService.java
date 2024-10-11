package dev.danmills.echo_client.service;

import org.springframework.stereotype.Service;

import com.echo360.sdk.model.objects.Room;
import com.echo360.sdk.model.requests.ListRequest;
import com.echo360.sdk.services.RoomService;
import com.echo360.sdk.util.Echo360Exception;

import dev.danmills.echo_client.persistence.entity.EchoLogger;

@Service
public class RESTRoomService {
   private final Echo360ApiService echo360ApiService;
   private static final EchoLogger log = new EchoLogger();

   public RESTRoomService(Echo360ApiService echo360ApiService) {
      this.echo360ApiService = echo360ApiService;
   }

   /**
    * This function retrieves a list of rooms with a specified limit and offset.
   * 
   * @return The `getRooms` method returns a `ListRequest` object containing a list of `Room`
   * objects.
   */
   public ListRequest<Room> getRooms() throws Echo360Exception {
      log.logString("getRooms called... ");

      RoomService roomService = new RoomService(echo360ApiService.echo360Api());
      int limit = 500;
      String offset = "";
      ListRequest<Room> roomList = roomService.list(limit, offset);
      return roomList;
   }

   /**
   * This function retrieves a list of rooms with a specified limit and offset, filtered by its building ID.
   * 
   * @return The `getRoomsByBuildingId` method returns a `ListRequest` object containing a list of `Room`
   * objects.
   */
   public ListRequest<Room> getRoomsByBuildingId(String buildingId) throws Echo360Exception {
      log.logString("getRoomsByBuildingId called... ");

      RoomService roomService = new RoomService(echo360ApiService.echo360Api());
      int limit = 500;
      String offset = "";
      ListRequest<Room> roomList = roomService.list(buildingId, limit, offset);
      return roomList;
   }

   /**
   * This function retrieves a room specified by its ID.
   * 
   * @return The `getRoomById` method returns a `Room` object
   */
   public Room getRoomById(String roomId) throws Echo360Exception {
      log.logString("GetRoomById called...");

      RoomService roomService = new RoomService(echo360ApiService.echo360Api());
      Room room = roomService.get(roomId);

      return room;
   }   
}
