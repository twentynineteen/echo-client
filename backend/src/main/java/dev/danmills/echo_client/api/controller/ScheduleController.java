package dev.danmills.echo_client.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.echo360.sdk.util.Echo360Exception;
import com.echo360.sdk.v2.model.objects.Schedule;
import com.echo360.sdk.v2.model.objects.SchedulePresenter;
import com.echo360.sdk.v2.model.objects.ScheduleSection;
import com.echo360.sdk.v2.model.objects.ScheduleVenue;
import com.echo360.sdk.v2.model.requests.ListRequest;

import dev.danmills.echo_client.persistence.entity.EchoLogger;
import dev.danmills.echo_client.service.RESTScheduleService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
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

  @GetMapping("/schedules/{id}")
  @ResponseBody
  public Schedule getScheduleById(@PathVariable String id) throws Echo360Exception {
   log.logString("Attempting to get Schedules");
   return restScheduleService.getScheduleById(id);
  }
  @DeleteMapping("/schedules/{id}")
  @ResponseBody
  public ResponseEntity<Boolean> deleteSchedule(@PathVariable String id) throws Echo360Exception {
   log.logString("Attempting to delete Schedule");
   return restScheduleService.deleteSchedule(id);
  }

  @PostMapping("/schedules/update")
  @ResponseBody
  public ResponseEntity<Schedule> updateSchedule(@RequestBody Schedule scheduleObject) throws Echo360Exception {
   log.logString("Attempting to update schedule");
   return restScheduleService.updateSchedule(scheduleObject);
  }
  
  @PostMapping("/schedules/create")
  @ResponseBody
  public ResponseEntity<Schedule> postSchedule(@RequestBody Schedule scheduleObject) throws Echo360Exception {
   log.logString("Attempting to create a new Schedule");
   
   String startTime = scheduleObject.startTime;
   String startDate = scheduleObject.startDate;
   String endTime = scheduleObject.endTime;
   ScheduleSection[] sections = scheduleObject.sections;
   String name = scheduleObject.name;
   ScheduleVenue venue = scheduleObject.venue;
   SchedulePresenter presenter = scheduleObject.presenter;
   String input1 = scheduleObject.input1;
   String input2 = scheduleObject.input2;
   String captureQuality = scheduleObject.captureQuality;

   
   Schedule schedule = new Schedule(
      startTime,
      startDate,
      endTime,
      sections,
      name,
      venue,
      presenter,
      input1,
      input2,
      captureQuality
      
   );
   return restScheduleService.postSchedule(schedule);
  }
}
