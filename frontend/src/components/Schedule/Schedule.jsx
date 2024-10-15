import { DatePicker } from "@/components/DatePicker/DatePicker";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import * as React from 'react';
import AvailabilityDropdown from "../AvailabilityDropdown/AvailabilityDropdown";
import GroupDropdown from '../GroupDropdown/GroupDropdown';
import InputDropdown from "../InputDropdown/InputDropdown";
import LiveStreamDropdown from "../LiveStreamDropdown/LiveStreamDropdown";
import ModuleDropdown from '../ModuleDropdown/ModuleDropdown';
import OccasionDropdown from '../OccasionDropdown/OccasionDropdown';
import PresenterDropdown from "../PresenterDropdown/PresenterDropdown";
import RoomDropdown from "../RoomDropdown/RoomDropdown";
import StreamQualityDropdown from "../StreamQualityDropdown/StreamQualityDropdown";

function Schedule() {
   const [date, setDate] = React.useState(new Date());

  return (
   <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 items-center">
      <div className="grid grid-cols-1 gap-4 max-w-7xl">
         <div className="justify-left">
            <p className="text-3xl">Schedule a recording</p>
         </div>
         <div className="">
            <div className="grid grid-cols-2 gap-4 justify-stretch mx-3">
               <div className="grid grid-cols-1">
                  <div className="grid grid-cols-2">
                     <div>
                        <div className="module">Module Code</div>
                        <ModuleDropdown />
                     </div>
                     <div>
                        <div className="occasion">Occasion</div>
                        <OccasionDropdown />
                     </div>
                  </div>
                  <div className="my-2">
                     <div className="group">Group</div>
                     <GroupDropdown />
                  </div>
                  <div className="my-2">
                     <div className="recording-title">Recording Title</div>
                     <Input placeholder="Enter title here" className="my-2 bg-inherit w-120 h-9"/>
                  </div>
                  <div className="my-2">
                     <div className="start-date text-center py-3">Start Date</div>
                     <div className="grid grid-cols-2 gap-4 content-center">
                        <div className="left my-2 text-center">
                           <DatePicker className="bg-inherit"/>
                        </div>
                        <div className="right text-center content-center">
                           <div className="start ">
                              <p>Start time</p>
                              <Input type="time" placeholder="00:00" className="my-3 bg-inherit"/>
                           </div>
                           <div className="end my-3">
                              <p>End time</p>
                              <Input type="time" placeholder="00:00" className="my-3 bg-inherit"/>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="my-2">
                     <div className="room py-3">Room</div>
                     <RoomDropdown />
                  </div>
                  <div className="my-2">
                     <div className="presenter py-3">Presenter</div>
                     <PresenterDropdown />
                  </div>
                  <div className="my-2">
                     <div className="guest py-3">Guest Presenter</div>
                     <PresenterDropdown />
                  </div>
               </div>

               <div className="grid col-start-2">
                  <div className="grid grid-cols-2">
                     <div className="availability col-start-1">
                        <div className="">Availability</div>
                        <AvailabilityDropdown />
                        <div className="my-2">Live Stream</div>
                        <LiveStreamDropdown />
                        <div className="my-2">Stream Quality</div>
                        <StreamQualityDropdown />
                     </div>
                     <div className="occasion col-start-2 mx-auto">
                        <DatePicker className="bg-inherit" />
                     </div>
                  </div>

                  <div className="">
                     <p className="my-2">Input</p>
                     <InputDropdown />
                  </div>
                  <div className="">
                     <p className="py-3" >Capture Quality</p>
                     <StreamQualityDropdown />
                     </div>
                  <div className="my-2">
                     <p className="py-3" >Requested by</p>
                     <Input className="bg-inherit" placeholder="Input name here"/>
                  </div>
                  <div className="my-2 grid grid-cols-2">
                     <div className="mx-auto ">submit</div>
                     <div className="mx-auto">clear</div>
                  </div>
               </div>

            </div>
            <div className="grid grid-cols-2 gap-4 schedule-container-r col-start-2">
               footer
            </div>
         </div>

      </div>
   </div>
  )
}

export default Schedule