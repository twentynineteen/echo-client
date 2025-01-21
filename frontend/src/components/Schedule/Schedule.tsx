import * as React from 'react'
import type { Schedule } from '../../types'
// Scheduler functions
import { createSchedule } from './ScheduleFunctions'
// Shadcn components and dependencies
import { Form } from "@/@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// zod and form imports / dependencies
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { defaultValues, formSchema } from "../Schedule/ScheduleUtils"


import AcademicYearCard from '../forms/fields/AcademicYearCard'
import AvailabilityDateField from '../forms/fields/AvailabilityDateField'
import AvailabilityField from '../forms/fields/AvailabilityField'
import CaptureQualityField from '../forms/fields/CaptureQualityField'
import EndTimeField from '../forms/fields/EndTimeField'
import GroupSelectField from '../forms/fields/GroupSelectField'
// import LiveStreamField from '../forms/fields/LiveStreamField'
import AvailabilityCard from '../forms/fields/AvailabilityCard'
import PresenterField from '../forms/fields/PresenterField'
import RecordingDateField from '../forms/fields/RecordingDateField'
import RequestedByField from '../forms/fields/RequestedByField'
import RoomField from '../forms/fields/RoomField'
import RoomInputField from '../forms/fields/RoomInputField'
import StartTimeField from '../forms/fields/StartTimeField'
// import StreamQualityField from '../forms/fields/StreamQualityField'

const Schedule: React.FC = () => {

   const form = useForm < z.infer < typeof formSchema >> ({
      resolver: zodResolver(formSchema),
      defaultValues: defaultValues
   });

   function onSubmit(values: z.infer < typeof formSchema > ) {
      try {
        createSchedule(values);        
      } catch (error) {
        console.error("Form submission error", error);        
      }
    }

  return (
   <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 items-center h-full pb-6 sm:flex-wrap lg:flex-row">
      <div className="gap-4 max-w-7xl">
         <div className="page-header">
            <p className="text-3xl">Schedule a recording</p>
         </div>
         <div className="form-wrapper">
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="">
                  <div className="form-container-master flex flex-col lg:flex-row justify-center gap-4 mx-3 mt-6">
                     <div className="form-container">
                        <AcademicYearCard />
                        <div className="room-inputs-container border p-3 mb-3 rounded-lg">
                           <div className="room gap-3 mr-3 ml-3 mb-2">
                              <RoomField messageDisabled={false} />
                           </div>
                           <Separator />
                           <div className="truncate">
                              <div className="container-inputs flex flex-col lg:flex-row justify-between pb-5 px-3">
                                 <div className="room-input gap-3 mt-3">
                                   <RoomInputField messageDisabled={false}/>
                                 </div>
                                 <div className="capture-quality gap-3 mt-3 mr-16">
                                    <CaptureQualityField />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="form-container-2">
                        <div className="presenters border rounded-lg p-3 mb-3">
                           <div className="presenter gap-3 mx-3 mb-3">
                              <PresenterField messageDisabled={false}/>
                           </div>
                        </div>
                        <div className="recording-date border rounded-lg pt-3 mb-3">
                           <div className="flex flex-col lg:flex-row justify-evenly mr-6 ml-3 px-3 gap-3">
                              <div className="recording-date-left ml-1">
                                 <RecordingDateField />
                              </div>
                              <div className="recording-date-right mr-6">
                                 <div className="start my-3">
                                    <StartTimeField messageDisabled={false}/>
                                 </div>
                                 <div className="end_time my-3">
                                    <EndTimeField messageDisabled={false}/>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="availability border rounded-lg p-3 mb-3">
                           <AvailabilityCard />
                        </div>
                        {/* <div className="live-stream border rounded-lg p-3 mb-3">
                           <div className="flex flex-col lg:flex-row justify-between gap-3 px-3 pt-2 pb-3">
                              <div className="basis-1/2 mr-3">
                                 <LiveStreamField />
                              </div>
                              <div className="basis-1/2">
                                 <div className="stream-quality">
                                    <StreamQualityField />
                                 </div>
                              </div>
                           </div>
                        </div> */}
                        <div className="optional-fields border rounded-lg p-3 mb-3">
                           <div className="flex flex-col lg:flex-row justify-evenly gap-3 px-3 ">
                              {/* group dropdown */}
                              <div className="group-select">
                                 <GroupSelectField />
                              </div>
                              {/* requested by - input */}
                              <div className="requested-by grow">
                                 <RequestedByField />
                              </div>
                           </div>
                        </div>
                        <div className="submission-buttons text-center">
                           <Button type="submit">Submit</Button>  
                        </div>
                     </div>
                  </div>
               </form>
            </Form>
         </div>
      </div>
   </div>
)
}

export default Schedule
