package dev.danmills.echo_client;

import static org.junit.Assert.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class RestSpringBootControllerTests {
   
   RestSpringBootController controller;

   // boiler plate to set up multiple tests further down the line
   @BeforeEach
   void setUp() {
   }
   
   
   @Test
   void testGetCampuses() {  
      //checks getCampuses method by ensuring response is not empty
      //improve in future by confirming status code of 200
      controller = new RestSpringBootController();
      String campus = controller.getCampuses();  

      // Assert campus list is not empty.
      assertTrue(!campus.isEmpty());

}
}
