package dev.danmills.echo_client.api.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.echo360.sdk.model.objects.Room;
import com.echo360.sdk.model.requests.ListRequest;
import com.echo360.sdk.util.Echo360Exception;

import dev.danmills.echo_client.persistence.entity.EchoLogger;
import dev.danmills.echo_client.service.RESTRoomService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {
   private final RESTRoomService restRoomService;
   private static final EchoLogger log = new EchoLogger();

   public RoomController(RESTRoomService restRoomService) {
      this.restRoomService = restRoomService;
   }

   /**
   * Get all of the rooms.
   *
   * @return the list of entities
   */
   @GetMapping("/rooms")
   @ResponseBody
   public ListRequest<Room> getRooms() throws Echo360Exception {
      log.logString("Attempting to get rooms");
       return restRoomService.getRooms();
   }

   /**
   * Get the room by its ID.
   *
   * @return the single entity
   */
  @GetMapping("/rooms/{id}")
  @ResponseBody
  public Room getRoomById(@PathVariable String id) throws Echo360Exception {
     log.logString("Attempting to get rooms");
      return restRoomService.getRoomById(id);
  }

   /**
   * Get all of the rooms by their building ID.
   *
   * @return the list of entities
   */
  @GetMapping("/rooms/buildings/{id}")
  @ResponseBody
  public ListRequest<Room> getRoomdByBuildingId(@PathVariable String id) throws Echo360Exception {
   log.logString("Attempting to get rooms");
   return restRoomService.getRoomsByBuildingId(id);
  }
}
