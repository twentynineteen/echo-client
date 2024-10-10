package dev.danmills.echo_client.persistence.entity;

import com.echo360.sdk.util.Logger;


public class EchoLogger extends Logger {
    public EchoLogger() {
    }
    
    @Override
    public void logString(String s)
    {
       System.out.println(s);
   }
}
