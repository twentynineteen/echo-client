package dev.danmills.echo_client.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.echo360.sdk.util.Echo360Exception;
import com.echo360.sdk.v2.model.objects.Schedule;
import com.echo360.sdk.v2.model.requests.ListRequest;
import com.echo360.sdk.v2.services.ScheduleService;

import dev.danmills.echo_client.persistence.entity.EchoLogger;

@Service
public class RESTScheduleService {
   // IMPORTANT: This is the class for V2 schedule service in echo360 API
   private final Echo360ApiService echo360ApiService;
   private static final EchoLogger log = new EchoLogger();

   public RESTScheduleService(Echo360ApiService echo360ApiService) {
      this.echo360ApiService = echo360ApiService;
   }

   public ListRequest<Schedule> getSchedules() throws Echo360Exception {
      log.logString("getSchedules called... ");

      ScheduleService scheduleService = new ScheduleService(echo360ApiService.echo360Api());
      int limit = 500;
      String offset = "";
      ListRequest<Schedule> scheduleList = scheduleService.list(limit, offset);
      return scheduleList;

   }

   public Schedule getScheduleById(String id) throws Echo360Exception {
      log.logString("getScheduleById called... ");

      ScheduleService scheduleService = new ScheduleService(echo360ApiService.echo360Api());
      Schedule schedule = scheduleService.get(id);
      return schedule;

   }

   public ResponseEntity<Schedule> postSchedule(Schedule scheduleObject) throws Echo360Exception {
      log.logString("postSchedule called... ");
      ScheduleService scheduleService = new ScheduleService(echo360ApiService.echo360Api());
      try {
         // make the POST request to schedule a new recording
         Schedule createSchedule = scheduleService.create(scheduleObject);
         
         // If successful, return with CREATED status
         return new ResponseEntity<>(createSchedule, HttpStatus.CREATED);
      } catch (Echo360Exception ex) {
         // If there is an error, return BAD_REQUEST status
         log.logString("Echo360Exception thrown in postSchedule call... ");
         // print error message to console for debugging
         log.logString(ex.getServerMessage());
         log.logString(ex.getMessage());
         return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
      } catch (Exception ex) {
         // For any other errors, return BAD_REQUEST
         log.logString("Exception thrown in postSchedule call... ");
         return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
      }

   }

   public ResponseEntity<Schedule> updateSchedule(Schedule scheduleObject) throws Echo360Exception {
      log.logString("updateSchedule called... ");
      ScheduleService scheduleService = new ScheduleService(echo360ApiService.echo360Api());
      try {
         // make the POST request to schedule a new recording
         Schedule updateSchedule = scheduleService.update(scheduleObject);
         
         // If successful, return with updated status
         return new ResponseEntity<>(updateSchedule, HttpStatus.CREATED);
      } catch (Echo360Exception ex) {
         // If there is an error, return BAD_REQUEST status
         log.logString("Echo360Exception thrown in updateSchedule call... ");
         // print error message to console for debugging
         log.logString(ex.getServerMessage());
         log.logString(ex.getMessage());
         return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
      } catch (Exception ex) {
         // For any other errors, return BAD_REQUEST
         log.logString("Exception thrown in updateSchedule call... ");
         return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
      }

   }
}
