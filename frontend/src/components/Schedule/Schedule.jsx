import { DatePicker } from "@/components/DatePicker/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as React from 'react';
import AvailabilityDropdown from "../AvailabilityDropdown/AvailabilityDropdown";
import CaptureRadio from "../CaptureRadio/CaptureRadio";
import DateCard from "../DateCard/DateCard";
import GroupDropdown from '../GroupDropdown/GroupDropdown';
import GroupSelect from '../GroupSelect/GroupSelect';
import InputDropdown from "../InputDropdown/InputDropdown";
import InputRadio from "../InputRadio/InputRadio";
import LiveStreamDropdown from "../LiveStreamDropdown/LiveStreamDropdown";
import LiveStreamSwitch from "../LiveStreamSwitch/LiveStreamSwitch";
import ModuleDropdown from '../ModuleDropdown/ModuleDropdown';
import OccasionDropdown from '../OccasionDropdown/OccasionDropdown';
import PresenterDropdown from "../PresenterDropdown/PresenterDropdown";
import RoomDropdown from "../RoomDropdown/RoomDropdown";
import StreamQualityDropdown from "../StreamQualityDropdown/StreamQualityDropdown";
import YearDropdown from "../YearDropdown/YearDropdown";

function Schedule() {
   const [date, setDate] = React.useState(new Date());

   const submitForm = () => {
      console.log(date);
   }

  return (
     <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 items-center h-full pb-20">
      
      <div className="grid grid-cols-1 gap-4 max-w-7xl">
         <div className="justify-left">
            <p className="text-3xl">Schedule a recording</p>
         </div>
         <div className="pt-6">
            <div className="grid grid-cols-2 gap-4 justify-stretch mx-3">
               <div className="grid grid-cols-1 border p-3 rounded-lg">
                  <div className="grid grid-cols-2 gap-3 mr-3 ml-3 ">
                     <div className="">
                        <div className="group my-2">Academic Year</div>
                        <YearDropdown />
                     </div>
                     <div>
                        <div className="occasion my-2">Occasion</div>
                        <OccasionDropdown />
                     </div>
                  </div>
                  <div className="gap-3 mr-3 ml-3">
                     <div className="module my-2">Module / Section</div>
                     <ModuleDropdown />
                  </div>
                  <div className="gap-3 mr-3 ml-3">
                     <div className="group my-2">Group</div>
                     <GroupSelect />
                     {/* <GroupDropdown /> */}
                  </div>
                  <div className="mb-3 gap-3 mr-3 ml-3 ">
                     <div className="recording-title my-2">Recording Title</div>
                     <Input placeholder="Enter title here" className="bg-inherit h-9"/>
                  </div>
                  
                  <div className="my-2 gap-3 mr-3 ml-3 border p-3 rounded-lg">
                     <div className="grid grid-cols-2 gap-4 content-center">
                        <div className="left text-center">
                           <p className="pb-3">Recording Date</p>
                           <DatePicker className="bg-inherit my-3"/>
                        </div>
                        <div className="right text-center content-center">
                           <div className="start ">
                              <p>Start time (24 hr clock)</p>
                              <Input type="Time" placeholder="00:00" className="my-3 bg-inherit"/>
                           </div>
                           <div className="end my-3">
                              <p>End time (24 hr clock)</p>
                              <Input type="time" placeholder="00:00" className="my-3 bg-inherit"/>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="my-2 gap-3 mr-3 ml-3">
                     <div className="room py-3">Room</div>
                     <RoomDropdown />
                  </div>
                  <div className="my-2 gap-3 mr-3 ml-3">
                     <div className="presenter py-3">Presenter</div>
                     <PresenterDropdown />
                  </div>
                  <div className="my-2 gap-3 mr-3 ml-3">
                     <div className="guest py-3">Guest Presenter</div>
                     <PresenterDropdown />
                  </div>
               </div>

               <div className="grid col-start-2 border p-3 rounded-lg">
                  <div className="grid grid-cols-2 mr-3 ml-3 gap-3 ">
                     <div className="availability col-start-1">
                        <div className="">
                           <div className="my-2">Availability</div>
                           <AvailabilityDropdown />
                        </div>
                        <div className="mb-2">
                           <div className="my-2">Live Stream</div>
                           {/* <LiveStreamDropdown /> */}
                           <LiveStreamSwitch />
                        </div>
                        <div className="">
                           <div className="my-2">Stream Quality</div>
                           <CaptureRadio />
                           {/* <StreamQualityDropdown /> */}
                        </div>
                     </div>
                     <div className="occasion col-start-2 pt-10">
                        <DatePicker className="bg-inherit" />
                        {/* <Calendar 
                           mode="single"
                           selected={date}
                           onSelect={setDate}
                           className="rounded-md border"
                        /> */}
                     </div>
                  </div>

                  <div className="gap-3 mr-3 ml-3">
                     <p className="my-2">Input</p>
                     {/* <InputDropdown /> */}
                     <InputRadio />
                  </div>
                  <div className="gap-3 mr-3 ml-3">
                     <p className="mb-3" >Capture Quality</p>
                     {/* <StreamQualityDropdown /> */}
                     <CaptureRadio />
                     </div>
                  <div className="my-2 gap-3 mr-3 ml-3">
                     <p className="mb-3" >Requested by</p>
                     <Input className="bg-inherit h-9" placeholder="Input name here"/>
                  </div>
                  <div className="my-2 grid grid-cols-2 gap-3">
                     <div className="mx-auto text-center"><Button variant="outline" className="w-[250px] bg-muted hover:bg-green-600" onClick={submitForm}>Submit</Button></div>
                     <div className="mx-auto"><Button variant="outline" className="w-[250px] hover:bg-muted">Clear</Button></div>
                  </div>
               </div>

            </div>
         </div>
      </div>
   </div>
  )
}

export default Schedule