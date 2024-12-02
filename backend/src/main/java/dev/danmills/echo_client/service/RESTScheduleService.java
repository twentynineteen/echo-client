package dev.danmills.echo_client.service;

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

   public Schedule postSchedule(Schedule scheduleObject) throws Echo360Exception {
      log.logString("postSchedule called... ");

      ScheduleService scheduleService = new ScheduleService(echo360ApiService.echo360Api());
      Schedule createSchedule = scheduleService.create(scheduleObject);
      return createSchedule;

   }
}
