package dev.danmills.echo_client.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.echo360.sdk.util.Echo360Exception;
import com.echo360.sdk.v2.model.objects.Schedule;
import com.echo360.sdk.v2.model.requests.ListRequest;

import dev.danmills.echo_client.persistence.entity.EchoLogger;
import dev.danmills.echo_client.service.RESTScheduleService;

@RestController
public class ScheduleController {
   private final RESTScheduleService restScheduleService;
   private static final EchoLogger log = new EchoLogger();

   public ScheduleController(RESTScheduleService restScheduleService) {
      this.restScheduleService = restScheduleService;
   }

   /**
   * Get all of the Schedules.
   *
   * @return the list of entities
   */
  @GetMapping("/schedules")
  @ResponseBody
  public ListRequest<Schedule> getSchedules() throws Echo360Exception {
   log.logString("Attempting to get Schedules");
   return restScheduleService.getSchedules();
  }
}
