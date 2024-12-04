package dev.danmills.echo_client.api.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.echo360.sdk.model.objects.Department;
import com.echo360.sdk.model.requests.ListRequest;
import com.echo360.sdk.util.Echo360Exception;

import dev.danmills.echo_client.persistence.entity.EchoLogger;
import dev.danmills.echo_client.service.RESTDepartmentService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class DepartmentController {
   private final RESTDepartmentService restDepartmentService;
   private static final EchoLogger log = new EchoLogger();

   public DepartmentController(RESTDepartmentService restDepartmentService) {
      this.restDepartmentService = restDepartmentService;
   }

   /**
   * Get all of the departments.
   *
   * @return the list of entities
   */
  @GetMapping("/departments")
  @ResponseBody
  public ListRequest<Department> getDepartments() throws Echo360Exception {
   log.logString("Attempting to get departments");
   return restDepartmentService.getDepartments();
  }

   /**
   * Get one department by ID.
   *
   * @param id is the id of the entity
   * @return the course entity
   */
   @GetMapping("/departments/{id}")
   @ResponseBody
   public Department getDepartmentById(@PathVariable String id) throws Echo360Exception {
      return restDepartmentService.getDepartmentById(id);

   }

   /**
   * Get a list of departments by the organization ID.
   *
   * @param id is the id of the entity
   * @return the course entity
   */
  @GetMapping("/departments/organizations/{id}")
  @ResponseBody
  public ListRequest<Department> getDepartmentsByOrg(@PathVariable String id) throws Echo360Exception {
     return restDepartmentService.getDepartmentsByOrg(id);

  }

}
