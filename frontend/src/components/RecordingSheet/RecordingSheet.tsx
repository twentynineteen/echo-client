// import { FormControl } from "@/@/components/ui/form";
import { Form } from "@/@/components/ui/form";
import { Label } from "@/@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/@/components/ui/sheet";
import { useToast } from "@/@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Schedule, ScheduleSection } from "@/types";
import React from "react";
import { client, headers } from "../../lib/utils";

import { Input } from "../ui/input";

// zod and form imports / dependencies
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import DatePicker from "../DatePicker/DatePicker";
import { formSchema } from "../RecordingSheet/RecordingSheetUtils";
import AvailabilityField from "../forms/fields/AvailabilityField";
import EndTimeField from "../forms/fields/EndTimeField";
import LiveStreamField from "../forms/fields/LiveStreamField";
import PresenterField from "../forms/fields/PresenterField";
import RoomField from "../forms/fields/RoomField";
import RoomInputField from "../forms/fields/RoomInputField";
import StartTimeField from "../forms/fields/StartTimeField";


interface RecordingProps {
   selectedId: Schedule;
   toggleVisibility: () => void; // Passes in toggle from parent component, updating state on component mount
}

export const RecordingSheet: React.FC<RecordingProps> = ({selectedId, toggleVisibility }) => {

  console.log(selectedId);
  // const sections: ScheduleSection[] = [];
  // if (selectedId.sections.length > 0) {
  //   sections.push(selectedId.sections[0]);
  //   return sections;
  // };

  const [sections, setSections] = React.useState(selectedId.sections);
  console.log(sections[0]);



  // recording name state for input box
  const [recording, setRecording] = React.useState({
       captureQuality: selectedId.captureQuality,
       daysOfWeek: selectedId.daysOfWeek,              
       endDate: selectedId.endDate,                   
       endTime: selectedId.endTime,                    
       exclusionDates: selectedId.exclusionDates,          
       externalId: selectedId.externalId,         
       guestPresenter: selectedId.guestPresenter,            
       id: selectedId.id,                         
       input1: selectedId.input1,                     
       input2: selectedId.input2,                     
       name: selectedId.name,                
       presenter: selectedId.presenter || {fullName: "", userEmail: "", userExternalId: "", userId: ""},       
       sections: sections,        
       shouldAutoPublish: selectedId.shouldAutoPublish,         
       shouldCaption: selectedId.shouldCaption,             
       shouldRecurCapture: selectedId.shouldRecurCapture,        
       shouldStreamLive: selectedId.shouldStreamLive,        
       startDate: selectedId.startDate,             
       startTime: selectedId.startTime,              
       streamQuality: selectedId.streamQuality,    
       venue: selectedId.venue,
       availability: sections[0].availability?.availability,
       availabilityDate: sections[0].availability?.concreteTime,
      //  availability: selectedId.sections[0].availability || {availability: "", concreteTime: null, relativeDelay: 0, unavailabilityDelay: 0},
  });
  
  // Update recording state - then send request to echo 360 api
  const saveChanges = () => {
    setRecording(prevState => ({
      ...prevState,
      name: recording.name,
      presenter: recording.presenter,
    }));
    updateRecording(recording);
    // window.location.reload(); // basic req to force page reload after submission
  };

  // 
  const handleDeleteRecording = () => {
    deleteRecording(recording);
    window.location.reload(); // basic req to force page reload after submission
  }

  // Toast setup for save changes notification
  const { toast } = useToast();

  const updateRecording = async (recording: Schedule) => {

    // check recording data can be edited first
    const requestDate = Date.parse(recording.startDate || "1900-01-01");
    const today = Date.now();
    if (requestDate < today) {
      
      toast({
        title: `Unable to change recordings from the past`,
        description: `Date Error: Recording in past`,
        variant: "destructive"
      })
      return;
    }
    // update request to echo 360
    await client.post(`/schedules/update`, recording, headers)
                                              .then(function (response) {
                                                  // convert 201 status to success if response is successful
                                                  const status = response.status == 201 ? "Success!" : response.status;
                                                  toast({
                                                    title: `Form submission status: ${status}`,
                                                    description: `${recording.name} - ${recording.startDate} - ${recording.startTime} - ${recording.endTime}`,
                                                    variant: "success"
                                                  })
                                                })
                                                .catch(function (error) {
                                                  console.log(error);
                                                  // convert 400 status to failed if response is unsuccessful
                                                  const status = error.status == 400 ? "Failed" : error.status;
                                                  toast({
                                                    title: `Form submission status: ${status}`,
                                                    description: `${error.code}: ${error.message}`,
                                                    variant: "destructive"
                                                  })
                                                });
  }

  const deleteRecording = async (recording: Schedule) => {
    console.log("attempting to delete a recording");
    // check recording data can be edited first
    const requestDate = Date.parse(recording.startDate || "1900-01-01");
    const today = Date.now();
    if (requestDate < today) {
      
      toast({
        title: `Unable to delete recordings from the past`,
        description: `Date Error: Recording in past`,
        variant: "destructive"
      })
      return;
    }
    // delete request to echo 360
    await client.delete(`/schedules/${recording.id}`, headers)
                                              .then(function (response) {
                                                  // convert 201 status to success if response is successful
                                                  const status = response.status == 201 ? "Success!" : response.status;
                                                  toast({
                                                    title: `Form submission status: ${status}`,
                                                    description: `${recording.name} - ${recording.startDate} - ${recording.startTime} - ${recording.endTime}`,
                                                    variant: "success"
                                                  })
                                                })
                                                .catch(function (error) {
                                                  console.log(error);
                                                  // convert 400 status to failed if response is unsuccessful
                                                  const status = error.status == 400 ? "Failed" : error.status;
                                                  toast({
                                                    title: `Form submission status: ${status}`,
                                                    description: `${error.code}: ${error.message}`,
                                                    variant: "destructive"
                                                  })
                                                });
  }


  // onChange handler to update input box state
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
   setRecording(prevState => ({
    ...prevState,
    name: event.target.value
  }));
  }


  
  // // onChange handler to update input box state
  // const handleChangePresenter = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   // console.log(event.target.value);
  //  setRecording(prevState => ({
  //   ...prevState,
  //   presenter: {
  //     fullName: recording.presenter.fullName, 
  //     userEmail: event.target.value, 
  //     userExternalId: recording.presenter.userExternalId, 
  //     userId: recording.presenter.userId
  //   }
  // }));
  // }
  // 

  // return undefined if start date is not found in recording
  const startDate = recording.startDate ? new Date(recording.startDate) : undefined ;
  const availabilityDate = sections[0].availability?.concreteTime ? new Date(sections[0].availability?.concreteTime) : undefined ;

  const defaultValues = {
               "occasion": "1",
               "start_date": startDate,
               "start_time": recording.startTime,
               "end_time": recording.endTime,
               "availability": sections[0].availability?.availability,
               "availability_date": availabilityDate,
               "live_stream_toggle": recording.shouldStreamLive,
               "presenter": recording.presenter.fullName,
               "room": recording.venue.roomName,
               "input": recording.input1,
               "capture_quality": recording.captureQuality,
               "recording_title": recording.name,
               "stream_quality": recording.streamQuality,
            }


  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  });

  // const handleChangeDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setRecording(prevState => ({
  //     ...prevState,
  //     startDate: event?.target.value
  //   }));
  //   console.log(recording.startDate);
  // }

  function onSubmit(values: z.infer < typeof formSchema > ) {
        try {
          console.log(values);       
        } catch (error) {
          console.error("Form submission error", error);        
        }
      }

  return (
    <div>

      <Sheet key="right" 
        defaultOpen={true} 
        onOpenChange={toggleVisibility}
        >
        <SheetContent className="w-[540px] sm:w-[800px]" style={{ maxWidth: '50vw' }}>
          <SheetHeader>
            <SheetTitle>Edit recording</SheetTitle>
            <SheetDescription>
              Make changes to your recording here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>

            <form onSubmit={form.handleSubmit(onSubmit)} >

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recordingId" className="text-right">
                ID
                </Label>
                <Input id="recordingId" value={recording.id} className="col-span-3" disabled/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value={recording.name} className="col-span-3" onChange={handleChangeName}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start-date" className="text-right col-span-1">
                  Date
                </Label>
                <div className="col-span-3">
                  <DatePicker fieldName="start_date"/>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start-time" className="text-right">
                  Start Time
                </Label>
                <div className="col-span-3">
                  <StartTimeField messageDisabled={true} />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="end-time" className="text-right">
                  End Time
                </Label>
                <div className="col-span-3">
                  <EndTimeField messageDisabled={true} />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="availability" className="text-right">
                  Availability
                </Label>
                <div className="col-span-3">
                  <AvailabilityField messageDisabled={true} />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="availability-date" className="text-right">
                  Availability Date
                </Label>
                <div className="col-span-3">
                  <DatePicker fieldName="availability_date"/>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="live-stream" className="text-right">
                  Live Stream
                </Label>
                <div className="col-span-3 ">
                  <LiveStreamField messageDisabled={true} />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="presenter" className="text-right">
                  Presenter
                </Label>
                <div className="col-span-3">
                  <PresenterField messageDisabled={true} />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room" className="text-right">
                  Room
                </Label>
                <div className="col-span-3">
                  <RoomField messageDisabled={true} />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="inputs" className="text-right">
                  Inputs
                </Label>
                <div className="col-span-3">
                  <RoomInputField messageDisabled={true} />
                </div>
              </div>
            </div>
            </form>
          </Form>

          <SheetFooter>
            <div className="form-buttons grid grid-cols-3 items-center gap-4 mt-4">
              <Button 
                type="button" 
                name="delete"
                variant="destructive"
                onClick={handleDeleteRecording}
                className=""
                >
                  Delete Recording
              </Button>
              <SheetClose asChild>
                <Button type="submit" 
                  onClick={saveChanges}
                  >Save changes</Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
