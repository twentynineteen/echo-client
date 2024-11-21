"use client"
import { DatePicker } from "@/components/DatePicker/DatePicker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"

import AvailabilityDropdown from "@/components/AvailabilityDropdown/AvailabilityDropdown"
import CaptureRadio from "@/components/CaptureRadio/CaptureRadio"
import GroupSelect from '@/components/GroupSelect/GroupSelect'
import InputRadio from "@/components/InputRadio/InputRadio"
import LiveStreamSwitch from "@/components/LiveStreamSwitch/LiveStreamSwitch"
import ModuleDropdown from '@/components/ModuleDropdown/ModuleDropdown'
import OccasionDropdown from '@/components/OccasionDropdown/OccasionDropdown'
import PresenterDropdown from "@/components/PresenterDropdown/PresenterDropdown"
import RoomDropdown from "@/components/RoomDropdown/RoomDropdown"
import { Separator } from "@/components/ui/separator"
import YearDropdown from "@/components/YearDropdown/YearDropdown"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import * as React from 'react'

import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/@/components/ui/form"

import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList
} from "@/components/ui/command"

import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover"
import {
   zodResolver
} from "@hookform/resolvers/zod"
import {
   Check,
   ChevronsUpDown
} from "lucide-react"
import {
   useForm
} from "react-hook-form"
import * as z from "zod"

import sections from '../../assets/sections.json'
import terms from '../../assets/terms.json'

// Module dropdown uses 'sections' data from echo360 SDK
const sectionList = sections.data.map((section) => {
   return {
      value: section.id,
      id: section.id,
      label: section.sectionNumber,
   }
}) 

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import rooms from '../../assets/rooms.json'

const roomList = rooms.data.map((room) => {
   return {
      value: room.id,
      label: room.name,
      buildingId: room.buildingId,
      roomId: room.id,
   }
})

import users from "../../assets/users.json"

const presenters = users.data.map((user) => {
   return {
      email: user.email,
      value: user.id,
      label: user.firstName + " " + user.lastName,
      id: user.id,
   }
})

const formSchema = z.object({
   academic_year: z.string(),
   occasion: z.string().optional(),
   section: z.string(),
   recording_title: z.string(),
   room: z.string(),
   input: z.string(),
   capture_quality: z.string(),
   presenter: z.string(),
   guest_presenter: z.string().optional(),
   start_date: z.coerce.date(),
 });


export default function Schedule() {
   const [date, setDate] = React.useState(new Date());

   const years = terms.data.map((term) => {
      return {
         value: term.id,
         label: term.name,
      }
   });

   const occasions = [
      {
         value: "1",
         label: "1",
      },
      {
         value: "2",
         label: "2",
      },
      {
         value: "3",
         label: "3",
      },
      {
         value: "4",
         label: "4",
      },
      {
         value: "5",
         label: "5",
      },
      {
         value: "6",
         label: "6",
      },
      {
         value: "7",
         label: "7",
      },
      {
         value: "8",
         label: "8",
      },
      {
         value: "9",
         label: "9",
      },
   ];

   const form = useForm < z.infer < typeof formSchema >> ({
      resolver: zodResolver(formSchema),
      defaultValues: {
         "occasion": "1",
         "start_date": new Date(),
      }
    });

   function onSubmit(values: z.infer < typeof formSchema > ) {
      try {
        console.log(values);
        
      } catch (error) {
        console.error("Form submission error", error);
        
      }
    }
   

  return (
     <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 items-center h-full pb-6 sm:flex-wrap lg:flex-row">
      
      <div className="gap-4 max-w-7xl">
         <div className="">
            <p className="text-3xl">Schedule a recording</p>
         </div>
         <div className="form-wrapper border rounded-lg p-3">
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="">
                  <div className="form-container">
                     <div className="year-module-title">
                        <div className="year-occasion-row flex justify-around gap-3 mr-3 ml-3">
                           <div className="academic-year">
                              <FormField 
                                 control={form.control}
                                 name="academic_year"
                                 render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                       <FormLabel>Academic Year</FormLabel>
                                       <Popover>
                                          <PopoverTrigger asChild>
                                             <FormControl>
                                                <Button 
                                                   variant="outline"
                                                   role="combobox"   
                                                   className="w-full justify-between p-3"
                                                >
                                                   {field.value ? years.find((year) => year.value === field.value)?.label
                                                   : "Select year..."}
                                                   <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                </Button>
                                             </FormControl>
                                          </PopoverTrigger>
                                          <PopoverContent className="w-full p-3 bg-background">
                                             <Command className="bg-background">
                                             <CommandInput placeholder="Search year..." />
                                                <CommandList>
                                                   <CommandEmpty>No year found.</CommandEmpty>
                                                   <CommandGroup>
                                                      {years.map((year) => (
                                                      <CommandItem
                                                         key={year.value}
                                                         value={year.label}
                                                         onSelect={() => {
                                                            form.setValue("academic_year", year.value);
                                                         }}
                                                      >
                                                         <Check
                                                            className={cn(
                                                            "mr-2 h-4 w-4",
                                                            year.value === field.value
                                                               ? "opacity-100"
                                                               : "opacity-0"
                                                            )}
                                                         />
                                                         {year.label}
                                                      </CommandItem>
                                                      ))}
                                                   </CommandGroup>
                                                </CommandList> 
                                             </Command>
                                          </PopoverContent>
                                       </Popover>
                                       <FormDescription>This is the term that will be used in the booking.</FormDescription>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                                 />
                           </div>
                           <div className="occasion">
                              <FormField 
                                 control={form.control}
                                 name="occasion"
                                 render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                       <FormLabel>Occasion</FormLabel>
                                       <Popover>
                                          <PopoverTrigger asChild>
                                             <FormControl>
                                                <Button 
                                                   variant="outline"
                                                   role="combobox"   
                                                   className="w-full justify-between p-3"
                                                >
                                                   {field.value ? occasions.find((occasion) => occasion.value === field.value)?.label
                                                   : "Select occasion..."}
                                                   <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                </Button>
                                             </FormControl>
                                          </PopoverTrigger>
                                          <PopoverContent className="w-full p-3 bg-background">
                                             <Command className="bg-background">
                                             <CommandInput placeholder="Search occasion..." />
                                                <CommandList>
                                                   <CommandEmpty>No occasion found.</CommandEmpty>
                                                   <CommandGroup>
                                                      {occasions.map((occasion) => (
                                                      <CommandItem
                                                         key={occasion.value}
                                                         value={occasion.label}
                                                         onSelect={() => {
                                                            form.setValue("occasion", occasion.value);
                                                         }}
                                                      >
                                                         <Check
                                                            className={cn(
                                                            "mr-2 h-4 w-4",
                                                            occasion.value === field.value
                                                               ? "opacity-100"
                                                               : "opacity-0"
                                                            )}
                                                         />
                                                         {occasion.label}
                                                      </CommandItem>
                                                      ))}
                                                   </CommandGroup>
                                                </CommandList> 
                                             </Command>
                                          </PopoverContent>
                                       </Popover>
                                       <FormDescription>This is the term that will be used in the booking.</FormDescription>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                                 />
                           </div>
                        </div>
                        <div className="section">
                           <FormField 
                              control={form.control}
                              name="section"
                              render={({ field }) => (
                                 <FormItem className="flex flex-col">
                                    <FormLabel>Section</FormLabel>
                                    <Popover>
                                       <PopoverTrigger asChild>
                                          <FormControl>
                                             <Button 
                                                variant="outline"
                                                role="combobox"   
                                                className="w-full justify-between p-3"
                                             >
                                                {field.value ? sectionList.find((section) => section.value === field.value)?.label
                                                : "Select section..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                             </Button>
                                          </FormControl>
                                       </PopoverTrigger>
                                       <PopoverContent className="w-full p-3 bg-background">
                                          <Command className="bg-background">
                                          <CommandInput placeholder="Search section..." />
                                             <CommandList>
                                                <CommandEmpty>No section found.</CommandEmpty>
                                                <CommandGroup>
                                                   {sectionList.map((section) => (
                                                   <CommandItem
                                                      key={section.value}
                                                      value={section.label}
                                                      onSelect={() => {
                                                         form.setValue("section", section.value);
                                                      }}
                                                   >
                                                      <Check
                                                         className={cn(
                                                         "mr-2 h-4 w-4",
                                                         section.value === field.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                         )}
                                                      />
                                                      {section.label}
                                                   </CommandItem>
                                                   ))}
                                                </CommandGroup>
                                             </CommandList> 
                                          </Command>
                                       </PopoverContent>
                                    </Popover>
                                    <FormDescription>This is the section where the recording will be kept.</FormDescription>
                                    <FormMessage />
                                 </FormItem>
                              )}
                              />
                        </div>
                        <div className="recording-title">
                           <FormField
                              control={form.control}
                              name="recording_title"
                              render={({ field }) => (
                                 <FormItem>
                                 <FormLabel>Recording Title</FormLabel>
                                 <FormControl>
                                    <Input 
                                    placeholder="Week 1 - introduction to course"
                                    
                                    type=""
                                    {...field} />
                                 </FormControl>
                                 <FormDescription>This is the video title as seen by students.</FormDescription>
                                 <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>
                     </div>
                     <div className="room-inputs-container">
                        <div className="room">
                           <FormField 
                              control={form.control}
                              name="room"
                              render={({ field }) => (
                                 <FormItem className="flex flex-col">
                                    <FormLabel>Room</FormLabel>
                                    <Popover>
                                       <PopoverTrigger asChild>
                                          <FormControl>
                                             <Button 
                                                variant="outline"
                                                role="combobox"   
                                                className="w-full justify-between p-3"
                                             >
                                                {field.value ? roomList.find((room) => room.value === field.value)?.label
                                                : "Select room..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                             </Button>
                                          </FormControl>
                                       </PopoverTrigger>
                                       <PopoverContent className="w-full p-3 bg-background">
                                          <Command className="bg-background">
                                          <CommandInput placeholder="Search room..." />
                                             <CommandList>
                                                <CommandEmpty>No room found.</CommandEmpty>
                                                <CommandGroup>
                                                   {roomList.map((room) => (
                                                   <CommandItem
                                                      key={room.value}
                                                      value={room.label}
                                                      onSelect={() => {
                                                         form.setValue("room", room.value);
                                                      }}
                                                   >
                                                      <Check
                                                         className={cn(
                                                         "mr-2 h-4 w-4",
                                                         room.value === field.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                         )}
                                                      />
                                                      {room.label}
                                                   </CommandItem>
                                                   ))}
                                                </CommandGroup>
                                             </CommandList> 
                                          </Command>
                                       </PopoverContent>
                                    </Popover>
                                    <FormDescription>This the room where the recording is taking place.</FormDescription>
                                    <FormMessage />
                                 </FormItem>
                              )}
                              />
                        </div>
                        <Separator />
                        <div className="room-input">
                           <FormField
                              control={form.control}
                              name="input"
                              render={({ field }) => (
                                 <FormItem className="space-y-3">
                                 <FormLabel>Input</FormLabel>
                                 <FormControl>
                                    <RadioGroup
                                       onValueChange={field.onChange}
                                       defaultValue={field.value}
                                       className="flex flex-col space-y-1"
                                    >
                                       <FormItem className="flex items-center space-x-3 space-y-0">
                                       <FormControl>
                                          <RadioGroupItem value="[ADD] Audio/Display-1/Display-2" />
                                       </FormControl>
                                       <FormLabel className="font-normal">
                                          [ADD] Audio/Display-1/Display-2
                                       </FormLabel>
                                       </FormItem>
                                       <FormItem className="flex items-center space-x-3 space-y-0">
                                       <FormControl>
                                          <RadioGroupItem value="[AD] Audio/Display-1" />
                                       </FormControl>
                                       <FormLabel className="font-normal">
                                          [AD] Audio/Display-1
                                       </FormLabel>
                                       </FormItem>
                                       <FormItem className="flex items-center space-x-3 space-y-0">
                                       <FormControl>
                                          <RadioGroupItem value="[AD] Audio/Display-2" />
                                       </FormControl>
                                       <FormLabel className="font-normal">
                                       [AD] Audio/Display-2
                                       </FormLabel>
                                       </FormItem>
                                       <FormItem className="flex items-center space-x-3 space-y-0">
                                       <FormControl>
                                          <RadioGroupItem value="[A] Audio Only" />
                                       </FormControl>
                                       <FormLabel className="font-normal">[A] Audio Only</FormLabel>
                                       </FormItem>
                                    </RadioGroup>
                                 </FormControl>
                                 <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>
                        <div className="capture-quality">
                           <FormField
                              control={form.control}
                              name="capture_quality"
                              render={({ field }) => (
                                 <FormItem className="space-y-3">
                                 <FormLabel>Capture Quality</FormLabel>
                                 <FormControl>
                                    <RadioGroup
                                       onValueChange={field.onChange}
                                       defaultValue={field.value}
                                       className="flex flex-col space-y-1"
                                    >
                                       <FormItem className="flex items-center space-x-3 space-y-0">
                                       <FormControl>
                                          <RadioGroupItem value="Highest Quality" />
                                       </FormControl>
                                       <FormLabel className="font-normal">
                                          Highest Quality
                                       </FormLabel>
                                       </FormItem>
                                       <FormItem className="flex items-center space-x-3 space-y-0">
                                       <FormControl>
                                          <RadioGroupItem value="High Quality" />
                                       </FormControl>
                                       <FormLabel className="font-normal">
                                          High Quality
                                       </FormLabel>
                                       </FormItem>
                                       <FormItem className="flex items-center space-x-3 space-y-0">
                                       <FormControl>
                                          <RadioGroupItem value="Standard Quality" />
                                       </FormControl>
                                       <FormLabel className="font-normal">
                                       Standard Quality
                                       </FormLabel>
                                       </FormItem>
                                    </RadioGroup>
                                 </FormControl>
                                 <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>
                     </div>
                     <div className="presenters">
                        <div className="presenter">
                           <FormField 
                              control={form.control}
                              name="presenter"
                              render={({ field }) => (
                                 <FormItem className="flex flex-col">
                                    <FormLabel>Presenter</FormLabel>
                                    <Popover>
                                       <PopoverTrigger asChild>
                                          <FormControl>
                                             <Button 
                                                variant="outline"
                                                role="combobox"   
                                                className="w-full justify-between p-3"
                                             >
                                                {field.value ? presenters.find((presenter) => presenter.value === field.value)?.label
                                                : "Select presenter..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                             </Button>
                                          </FormControl>
                                       </PopoverTrigger>
                                       <PopoverContent className="w-full p-3 bg-background">
                                          <Command className="bg-background">
                                          <CommandInput placeholder="Search presenter..." />
                                             <CommandList>
                                                <CommandEmpty>No presenter found.</CommandEmpty>
                                                <CommandGroup>
                                                   {presenters.map((presenter) => (
                                                   <CommandItem
                                                      key={presenter.value}
                                                      value={presenter.label}
                                                      onSelect={() => {
                                                         form.setValue("presenter", presenter.value);
                                                      }}
                                                   >
                                                      <Check
                                                         className={cn(
                                                         "mr-2 h-4 w-4",
                                                         presenter.value === field.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                         )}
                                                      />
                                                      {presenter.label}
                                                   </CommandItem>
                                                   ))}
                                                </CommandGroup>
                                             </CommandList> 
                                          </Command>
                                       </PopoverContent>
                                    </Popover>
                                    <FormDescription>This is the main presenter on the recording.</FormDescription>
                                    <FormMessage />
                                 </FormItem>
                              )}
                              />
                        </div>
                        <div className="guest-presenter">
                           <FormField 
                              control={form.control}
                              name="guest_presenter"
                              render={({ field }) => (
                                 <FormItem className="flex flex-col">
                                    <FormLabel>Guest Presenter</FormLabel>
                                    <Popover>
                                       <PopoverTrigger asChild>
                                          <FormControl>
                                             <Button 
                                                variant="outline"
                                                role="combobox"   
                                                className="w-full justify-between p-3"
                                             >
                                                {field.value ? presenters.find((presenter) => presenter.value === field.value)?.label
                                                : "Select presenter..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                             </Button>
                                          </FormControl>
                                       </PopoverTrigger>
                                       <PopoverContent className="w-full p-3 bg-background">
                                          <Command className="bg-background">
                                          <CommandInput placeholder="Search presenter..." />
                                             <CommandList>
                                                <CommandEmpty>No presenter found.</CommandEmpty>
                                                <CommandGroup>
                                                   {presenters.map((presenter) => (
                                                   <CommandItem
                                                      key={presenter.value}
                                                      value={presenter.label}
                                                      onSelect={() => {
                                                         form.setValue("guest_presenter", presenter.value);
                                                      }}
                                                   >
                                                      <Check
                                                         className={cn(
                                                         "mr-2 h-4 w-4",
                                                         presenter.value === field.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                         )}
                                                      />
                                                      {presenter.label}
                                                   </CommandItem>
                                                   ))}
                                                </CommandGroup>
                                             </CommandList> 
                                          </Command>
                                       </PopoverContent>
                                    </Popover>
                                    <FormDescription>This is the guest presenter on the recording (optional).</FormDescription>
                                    <FormMessage />
                                 </FormItem>
                              )}
                              />
                        </div>
                     </div>
                  </div>
                  <div className="form-container-2">
                     <div className="recording-date">
                        <div className="recording-date-left">
                        <FormField
                           control={form.control}
                           name="start_date"
                           render={({ field }) => (
                           <FormItem className="flex flex-col">
                              <FormLabel>Recording Date</FormLabel>
                                 <div className="calendar-left">
                                    <Calendar
                                       mode="single"
                                       selected={field.value}
                                       onSelect={field.onChange}
                                       autoFocus
                                    />
                                 </div>
                                 <div className="calendar-right">
                                    <FormControl>
                                       <Button
                                          variant={"outline"}
                                          className={cn(
                                             "w-[240px] pl-3 text-left font-normal",
                                             !field.value && "text-muted-foreground"
                                          )}
                                       >
                                          {field.value ? (
                                             format(field.value, "PPP")
                                          ) : (
                                             <span>Pick a date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                       </Button>
                                    </FormControl>
                                    <FormDescription>Your date of birth is used to calculate your age.</FormDescription>
                                    <FormMessage />
                                 </div>
                           </FormItem>
                           )}
                        />
                        </div>
                        <div className="recording-date-right">
                              {/* Calendar options and time inputs here */}
                        </div>
                     </div>
                     <div className="availability">
                              {/* switch */}
                              {/* datepicker */}
                     </div>
                     <Separator />
                     <div className="live-stream">
                              {/* switch */}
                              {/* options */}
                     </div>
                     <div className="optional-fields">
                        {/* group dropdown */}
                        {/* requested by - input */}
                     </div>
                  </div>
                     <Button type="submit">Submit</Button>
               </form>
            </Form>
         </div>
         <div className="scheduler-wrapper pt-4">

            <div className="scheduler-container flex flex-col lg:flex-row justify-center gap-4 mx-3 mt-6" >
               <div className="scheduler-left-side p-0 ">
                  <div className="module-container border p-3 mb-3 rounded-lg">
                     <div className="flex justify-around gap-3 mr-3 ml-3 ">
                        <div className="grow">
                           <div className="my-2 font-bold">Academic Year</div>

                           <YearDropdown />
                        </div>
                        <div>
                           <div className="my-2 font-bold">Occasion</div>
                           <OccasionDropdown />
                        </div>
                     </div>
                     <div className="gap-3 mr-3 ml-3">
                        <div className="module my-2 font-bold">Module / Section</div>
                        <ModuleDropdown />
                     </div>
                     <div className="gap-3 mr-3 ml-3 ">
                        <div className="recording-title my-2 font-bold">Recording Title</div>
                        <Input placeholder="Enter title here" className="bg-inherit h-9"/>
                     </div>
                     {/* <div className="my-2 gap-3 mr-3 ml-3">
                        <div className="pb-2">Room</div>
                        <RoomDropdown />
                     </div> */}
                  </div>
                  <div className="wrapper-room border rounded-lg mt-3">
                     <div className="container-room pb-3">
                        <div className="my-2 gap-3 mr-3 ml-3 mt-3 px-3">
                           <div className="pb-2 font-bold">Room</div>
                           <RoomDropdown />
                        </div>
                     </div>
                     <Separator />
                     <div className="container-inputs flex flex-col lg:flex-row justify-evenly pb-5 px-3">
                        <div className="gap-3 mr-3 ml-3">
                           <p className="my-3 font-bold">Input</p>
                           <div className="">
                              <InputRadio />
                           </div>
                        </div>
                        <div className="gap-3 mr-3 ml-3">
                           <p className="my-3 font-bold" >Capture Quality</p>
                           <div className="">
                              <CaptureRadio />
                           </div>
                        </div>
                     </div>
                 </div>
                 <div className="presenters border rounded-lg mb-3 pb-3 mt-3">
                     <div className="my-2 gap-3 mr-3 ml-3 px-3">
                        <div className="presenter py-3 font-bold">Presenter</div>
                        <PresenterDropdown />
                     </div>
                     <div className="my-2 gap-3 mr-3 ml-3 px-3">
                        <div className="guest py-3 font-bold">Guest Presenter</div>
                        <PresenterDropdown />
                     </div>
                  </div>
                 
               </div>

               <div className="scheduler-right-side">
               <div className="border rounded-lg">
                     <div className="flex flex-col lg:flex-row gap-4 mx-3">
                        <div className="left text-center">
                           <Calendar 
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              className="my-3" 
                              // footer={
                              //    date ? `Selected: ${date.toLocaleDateString()}` : "Pick a day."
                              //  }
                         
                           />
                        </div>
                        <div className="right text-center content-center ml-6">
                           <div className="date my-3 w-[250px]">
                              <p className=" font-bold">Recording Date</p>
                              <Button
                                 variant={"outline"}
                                 className={cn(
                                    "w-full justify-start text-left font-normal my-3",
                                    !date && "text-muted-foreground"
                                 )}
                              >
                                 <CalendarIcon className="mr-2 h-4 w-8" />
                                 {date ? format(date, "PPP") : <span>Pick a date</span>}
                              </Button>
                           </div>
                           <div className="start ">
                              <p className=" font-bold">Start time (24 hr clock)</p>
                              <Input type="Time" placeholder="00:00" className="my-3 bg-inherit"/>
                           </div>
                           <div className="end my-3">
                              <p className=" font-bold">End time (24 hr clock)</p>
                              <Input type="time" placeholder="00:00" className="my-3 bg-inherit"/>
                           </div>
                        </div>
                     </div>
                  </div>
                  
                  <div className="border pb-5 mb-3 mt-3 rounded-lg">
                     <div className="flex flex-col lg:flex-row justify-evenly gap-3 px-3 pt-2 ">
                        <div className="availability basis-1/2 px-3">
                           <div className="my-2 font-bold">Availability</div>
                           <AvailabilityDropdown />
                        </div>
                        <div className="occasion mt-10 basis-1/2 pr-2">
                           <DatePicker 
                              // className="bg-inherit" 
                           />
                        </div>
                     </div>
                  </div>
                  <div className="live-stream border pb-3 mt-3 rounded-lg px-3">
                     <div className="flex flex-col lg:flex-row justify-evenly gap-3 px-3 pt-2 pb-3">
                        <div className="basis-1/2">
                           <div className="my-2 font-bold">Live Stream</div>
                           {/* <LiveStreamDropdown /> */}
                           <LiveStreamSwitch />
                        </div>
                        <div className="basis-1/2">
                           <div className="my-2 font-bold">Stream Quality</div>
                           <CaptureRadio />
                        </div>
                     </div>
                  </div>
                  <div className="programme-container border pb-3 mt-3 rounded-lg px-3">
                     <div className="flex flex-col lg:flex-row justify-evenly gap-3 px-3 ">
                        <div className="">
                           <div className="my-2 font-bold">Group</div>
                           <GroupSelect />   
                        </div>
                        <div className="grow">
                           <div className="my-2 font-bold">Requested by</div>
                           <Input placeholder="Input name here"/>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-row my-3 gap-3">
                     <div className="mx-auto text-center"><Button variant="outline" className="w-[250px] bg-muted hover:bg-green-600" >Submit</Button></div>
                     <div className="mx-auto"><Button variant="outline" className="w-[250px] hover:bg-muted">Clear</Button></div>
                  </div>
               </div>

            </div>
         </div>
      </div>
   </div>
  )
}

