package dev.danmills.echo_client.service;

import org.springframework.stereotype.Service;

import com.echo360.sdk.model.objects.Department;
import com.echo360.sdk.model.requests.ListRequest;
import com.echo360.sdk.services.DepartmentService;
import com.echo360.sdk.util.Echo360Exception;

import dev.danmills.echo_client.persistence.entity.EchoLogger;

@Service
public class RESTDepartmentService {
   private final Echo360ApiService echo360ApiService;
   private static final EchoLogger log = new EchoLogger();
  
   // Constructor 
   public RESTDepartmentService(Echo360ApiService echo360ApiService) {
         this.echo360ApiService = echo360ApiService;
     
      }

      /**
       * This Java function retrieves a list of departments with a specified limit and offset.
      * 
      * @return The `getDepartments` method returns a `ListRequest` object containing a list of `Department`
      * objects.
      */
      public ListRequest<Department> getDepartments() throws Echo360Exception {
         log.logString("GetDepartments called...");
   
         DepartmentService departmentService = new DepartmentService(echo360ApiService.echo360Api());
         int limit = 500;
         String offset = "";
         ListRequest<Department> departmentList = departmentService.list(limit, offset);
         return departmentList;
      }   

      /**
      * This Java function retrieves a list of departments with a specified limit and offset, filtered by the organizationId parameter.
      * 
      * @return The `getDepartmentsByOrg` method returns a `ListRequest` object containing a list of `Department`
      * objects.
      */
      public ListRequest<Department> getDepartmentsByOrg(String organizationId) throws Echo360Exception {
         log.logString("GetDepartmentsByOrg called...");
   
         DepartmentService departmentService = new DepartmentService(echo360ApiService.echo360Api());
         int limit = 500;
         String offset = "";
         ListRequest<Department> departmentList = departmentService.list(organizationId, limit, offset);
         return departmentList;
      }   

      /**
      * This Java function retrieves a department specified by it's ID.
      * 
      * @return The `getDepartmentById` method returns a `Department` object
      */
      public Department getDepartmentById(String departmentId) throws Echo360Exception {
         log.logString("GetDepartmentById called...");
   
         DepartmentService departmentService = new DepartmentService(echo360ApiService.echo360Api());
         Department department = departmentService.get(departmentId);

         return department;
      }   
   }
