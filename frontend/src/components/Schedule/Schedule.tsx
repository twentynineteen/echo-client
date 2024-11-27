"use client"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"

import { Separator } from "@/components/ui/separator"
import {
   Switch
} from "@/components/ui/switch"
import { cn } from "@/lib/utils"

import axios, { AxiosResponse } from 'axios'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import * as React from 'react'

import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"

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

import terms from '../../assets/terms.json'

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
   stream_quality: z.string().optional(),
   presenter: z.string(),
   guest_presenter: z.string().optional(),
   start_date: z.coerce.date(),
   start_time: z.string(),
   end_time: z.string(),
   availability: z.string(),
   availability_date: z.coerce.date(),
   live_stream_toggle: z.boolean(),
   group: z.string().optional(),
   requested_by: z.string().optional(),
 });


export default function Schedule() {
   const [date, setDate] = React.useState(new Date());
   const [sections, setSections] = React.useState<dropdownItems[]>([]);
   const [academicYear, setAcademicYear] = React.useState<dropdownItems[]>([]);
   const [sectionDisabled, setSectionDisabled] = React.useState<boolean>(false);

   // Function to toggle disabled states
   const toggleDisabled = () => {
      setSectionDisabled((prevDisabled) => !prevDisabled);
   }

   // axios set up
   const client = axios.create({
      baseURL: 'http://localhost:8080',
   });
   // initialise type required for section list
   type dropdownItems = {
      value: string;
      label: string;
   }
   // initialise type pulled from api for section
   type section = {
      id: string;
      courseId: string;
      termId: string;
      scheduleIds: string[];
      sectionNumber: string;
      externalId: string;
      instructorId: string;
      description: string;
      lessonCount: number;
      userCount: string;
      secondaryInstructorIds: string[];
      lmsCourseIds: string[];
      lmsCourses: string[];
   }
   // get sections async call to backend api
   const getSections = async () => {
      try {
         const searchResponse: AxiosResponse = await client.get('/sections', {
            headers: { 'X-API-KEY': 'DwightSchrute' }
         });
         // convert section array to type dropdownItems array from response data object
         const foundSections: section[] = Object.values(searchResponse.data['data']);
         // map sections to state for dropdown menu
         const mapped: dropdownItems[] = foundSections.map((item) => {
            return {
               value: item.id,
               label: item.sectionNumber,
            }
         });
         setSections(mapped);
      } catch(err) {
         console.log(err);
      }
   };

   // call getSections on page load for section dropdown items
   React.useEffect(()=>{
      getSections()
   },[]);
   

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

   const availability_options = [
      {
         value: "Immediately",
         label: "Immediately",
      },
      {
         value: "Never",
         label: "Never",
      },
      {
         value: "Manual",
         label: "Manual",
      },
   ];

   const form = useForm < z.infer < typeof formSchema >> ({
      resolver: zodResolver(formSchema),
      defaultValues: {
         "occasion": "1",
         "start_date": date,
      }
    });

   function convertFormToSchedule(values: z.infer < typeof formSchema > ) {
      // TODO
      // A function to convert the form submission into suitable echo 360 submission format
      // generate an external id using "MODULECODE-DDMMYY-HH:MM-ROOM" format
      // parse start date to 'dd/mm/yyyy' format
      // parse start time to 'hh:mm:ss' format
      // calculate duration by removing start time from end time - end time not required
      // collect building name and campus name from values.room
      // get presenter email from id - repeat for guest
      // get course identifier from ???
      // format availability if manual
      // format input options for input 1 and 2
      // Create a schedule availability object inside schedule section object
      // parameters for ScheduleAvailability - True, False, concreteTime
      // ScheduleSection : [ScheduleSection(values.section, ScheduleAvailability())], 

      // Schedule(
      //    java.lang.String startTime, 
      //    java.lang.String startDate, 
      //    java.lang.Integer durationMinutes, 
      //    ScheduleSection[] sections, 
      //    java.lang.String name, 
      //    java.lang.String roomId, 
      //    java.lang.String instructorId, 
      //    java.lang.String input1, 
      //    java.lang.String input2, 
      //    java.lang.String captureQuality
      // )

      

      const externalId = "IB9HY0-010524-13:00:00M2";
      const schedule = {
         externalId: externalId,
         name: values.recording_title,
         startDate: "dd/mm/yyyy",
         startTime: "13:00",
         durationMinutes: "14:00",
         roomId: values.room,
         instructorId: values.presenter,
         guestInstructor: values.guest_presenter,
         termId: values.academic_year,
         ScheduleSection : [ScheduleSection(values.section, ScheduleAvailability())],
         "Availability": "Concrete | 2024-05-10",
         shouldCaption: "TRUE",
         shouldStreamLive: values.live_stream_toggle,
         input1: "",
         input2: "",
         captureQuality: values.capture_quality,
         streamQuality: values.stream_quality,
      };
      return schedule;
   }

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
         <div className="page-header">
            <p className="text-3xl">Schedule a recording</p>
         </div>
         <div className="form-wrapper">
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="">
                  <div className="form-container-master flex flex-col lg:flex-row justify-center gap-4 mx-3 mt-6">
                     <div className="form-container">
                        <div className="year-module-title border p-3 mb-3 rounded-lg">
                           <div className="year-occasion-row flex justify-around gap-3 mr-3 ml-3">
                              <div className="academic-year grow">
                                 <FormField 
                                    control={form.control}
                                    name="academic_year"
                                    render={({ field }) => (
                                       <FormItem className="flex flex-col">
                                          <FormLabel className="my-2 font-bold">Academic Year</FormLabel>
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
                                                               toggleDisabled();
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
                                          <FormLabel className="my-2 font-bold">Occasion</FormLabel>
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
                                          <FormDescription className="pb-3">This is the term that will be used in the booking.</FormDescription>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                    />
                              </div>
                           </div>
                           <div className="section gap-3 mr-3 ml-3 ">
                              <FormField 
                                 control={form.control}
                                 name="section"
                                 render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                       <FormLabel className="my-2 font-bold">Section</FormLabel>
                                       <Popover>
                                          <PopoverTrigger asChild>
                                             <FormControl>
                                                <Button 
                                                   variant="outline"
                                                   role="combobox"   
                                                   className="w-full justify-between p-3"
                                                   disabled={!sectionDisabled}
                                                >
                                                   {field.value ? sections.find((section) => section.value === field.value)?.label
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
                                                      {sections.map((section) => (
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
                                       <FormDescription className="pb-3">{!sectionDisabled ? "This is disabled until you have selected an academic year" : "This is the section where the recording will be kept."}</FormDescription>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                                 />
                                 {/* <p>{sections ? sections.id : "none found"}</p> */}
                           </div>
                           <div className="recording-title gap-3 mr-3 ml-3">
                              <FormField
                                 control={form.control}
                                 name="recording_title"
                                 render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="my-2 font-bold">Recording Title</FormLabel>
                                    <FormControl>
                                       <Input 
                                       placeholder="Week 1 - introduction to course"
                                       
                                       type=""
                                       {...field} />
                                    </FormControl>
                                    <FormDescription className="">This is the video title as seen by students.</FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                        </div>
                        <div className="room-inputs-container border p-3 mb-3 rounded-lg">
                           <div className="room gap-3 mr-3 ml-3">
                              <FormField 
                                 control={form.control}
                                 name="room"
                                 render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                       <FormLabel className="my-3 font-bold">Room</FormLabel>
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
                                       <FormDescription className="pb-3">This the room where the recording is taking place.</FormDescription>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                                 />
                           </div>
                           <Separator />
                           <div className="truncate">
                              <div className="container-inputs flex flex-col lg:flex-row justify-between pb-5 px-3">
                                 <div className="room-input gap-3 mt-3">
                                    <FormField
                                       control={form.control}
                                       name="input"
                                       render={({ field }) => (
                                          <FormItem className="space-y-3">
                                          <FormLabel className="my-3 font-bold">Input</FormLabel>
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
                                 <div className="capture-quality gap-3 mt-3 mr-16">
                                    <FormField
                                       control={form.control}
                                       name="capture_quality"
                                       render={({ field }) => (
                                          <FormItem className="space-y-3">
                                          <FormLabel className="my-3 font-bold">Capture Quality</FormLabel>
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

                           </div>
                        </div>
                        <div className="presenters border rounded-lg p-3 mb-3">
                           <div className="presenter gap-3 mx-3 mb-3">
                              <FormField 
                                 control={form.control}
                                 name="presenter"
                                 render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                       <FormLabel className="my-2 font-bold">Presenter</FormLabel>
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
                           <div className="guest-presenter gap-3 mx-3">
                              <FormField 
                                 control={form.control}
                                 name="guest_presenter"
                                 render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                       <FormLabel className="my-2 font-bold">Guest Presenter</FormLabel>
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
                        <div className="recording-date border rounded-lg pt-3 mb-3">
                           <div className="flex flex-col lg:flex-row justify-evenly mr-6 ml-3 px-3 gap-3">
                              <div className="recording-date-left ml-1">
                                 <FormField
                                    control={form.control}
                                    name="start_date"
                                    render={({ field }) => (
                                       <FormItem className="flex flex-col">
                                          <FormLabel className="my-2 font-bold">Recording Date</FormLabel>
                                          <Popover>
                                             <PopoverTrigger asChild>
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
                                             </PopoverTrigger>
                                             <PopoverContent className="w-auto p-0 bg-background" align="start">
                                                <Calendar
                                                   mode="single"
                                                   selected={field.value}
                                                   onSelect={field.onChange}
                                                   autoFocus
                                                />
                                             </PopoverContent>
                                          </Popover>
                                          <FormDescription>Select the date of recording from the calendar.</FormDescription>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="recording-date-right mr-6">
                                 {/* Calendar options and time inputs here */}
                                 <div className="start my-3">
                                    <FormField
                                       control={form.control}
                                       name="start_time"
                                       render={({ field }) => (
                                          <FormItem>
                                          <FormLabel className="my-2 font-bold">Start time (24 hr clock)</FormLabel>
                                          <FormControl>
                                             <Input 
                                             type="Time"
                                             {...field} />
                                          </FormControl>
                                          <FormDescription>Enter the start time of the recording.</FormDescription>
                                          <FormMessage />
                                          </FormItem>
                                       )}
                                    />
                                 </div>
                                 <div className="end_time my-3">
                                    <FormField
                                          control={form.control}
                                          name="end_time"
                                          render={({ field }) => (
                                             <FormItem>
                                             <FormLabel className="my-2 font-bold">End time (24 hr clock)</FormLabel>
                                             <FormControl>
                                                <Input                                         
                                                type="Time"
                                                {...field} />
                                             </FormControl>
                                             <FormDescription>Enter the end time of the recording.</FormDescription>
                                             <FormMessage />
                                             </FormItem>
                                          )}
                                       />
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="availability border rounded-lg p-3 mb-3">
                           <div className="flex flex-col lg:flex-row justify-between gap-4">
                              <div className="select-availability gap-3 mx-3">
                                 {/* switch */}                      
                                 <FormField 
                                    control={form.control}
                                    name="availability"
                                    render={({ field }) => (
                                       <FormItem className="flex flex-col">
                                          <FormLabel className="my-2 font-bold">Availability</FormLabel>
                                          <Popover>
                                             <PopoverTrigger asChild>
                                                <FormControl>
                                                   <Button 
                                                      variant="outline"
                                                      role="combobox"   
                                                      className="w-full justify-between p-3"
                                                   >
                                                      {field.value ? availability_options.find((availability) => availability.value === field.value)?.label
                                                      : "Select availability..."}
                                                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                   </Button>
                                                </FormControl>
                                             </PopoverTrigger>
                                             <PopoverContent className="w-full p-3 bg-background">
                                                <Command className="bg-background">
                                                {/* <CommandInput placeholder="Search availability..." /> */}
                                                   <CommandList>
                                                      <CommandEmpty>No availability found.</CommandEmpty>
                                                      <CommandGroup>
                                                         {availability_options.map((availability) => (
                                                         <CommandItem
                                                            key={availability.value}
                                                            value={availability.label}
                                                            onSelect={() => {
                                                               form.setValue("availability", availability.value);
                                                            }}
                                                         >
                                                            <Check
                                                               className={cn(
                                                               "mr-2 h-4 w-4",
                                                               availability.value === field.value
                                                                  ? "opacity-100"
                                                                  : "opacity-0"
                                                               )}
                                                            />
                                                            {availability.label}
                                                         </CommandItem>
                                                         ))}
                                                      </CommandGroup>
                                                   </CommandList> 
                                                </Command>
                                             </PopoverContent>
                                          </Popover>
                                          <FormDescription>Set when this recording is made available to students.</FormDescription>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                    />
                              </div>
                              <div className="availability-date gap-3 mr-16">
                                 {/* datepicker if set to manual */}
                                 <FormField
                                       control={form.control}
                                       name="availability_date"
                                       render={({ field }) => (
                                          <FormItem className="flex flex-col">
                                             <FormLabel className="my-2 font-bold">Availability Date</FormLabel>
                                             <Popover>
                                                <PopoverTrigger asChild>
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
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0 bg-background" align="start">
                                                   <Calendar
                                                      mode="single"
                                                      selected={field.value}
                                                      onSelect={field.onChange}
                                                      autoFocus
                                                   />
                                                </PopoverContent>
                                             </Popover>
                                             <FormDescription>Select the date of release.</FormDescription>
                                             <FormMessage />
                                          </FormItem>
                                       )}
                                    />
                              </div>
                           </div>
                        </div>
                        <div className="live-stream border rounded-lg p-3 mb-3">
                           <div className="flex flex-col lg:flex-row justify-between gap-3 px-3 pt-2 pb-3">
                              <div className="basis-1/2 mr-3">
                                 {/* switch */}
                                 <FormField
                                    control={form.control}
                                    name="live_stream_toggle"
                                    render={({ field }) => (
                                       <FormItem className="flex flex-row items-center justify-between mb-3 mr-3">
                                          <div className="space-y-0.5">
                                             <FormLabel className="my-3 font-bold">Live Stream</FormLabel>
                                             <FormDescription>Is this session going to be streamed live?</FormDescription>
                                          </div>
                                          <FormControl>
                                             <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                // disabled
                                                aria-readonly
                                             />
                                          </FormControl>
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="basis-1/2">
                                 {/* Stream quality */}
                                 <div className="stream-quality">
                                    <FormField
                                       control={form.control}
                                       name="stream_quality"
                                       render={({ field }) => (
                                          <FormItem className="space-y-3">
                                          <FormLabel className="my-2 font-bold">Stream Quality</FormLabel>
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
                           </div>
                        </div>
                        <div className="optional-fields border rounded-lg p-3 mb-3">
                           <div className="flex flex-col lg:flex-row justify-evenly gap-3 px-3 ">
                              {/* group dropdown */}
                              <div className="group-select">
                                 <FormField
                                    control={form.control}
                                    name="group"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel className="my-3 font-bold">Group</FormLabel>
                                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                                             <FormControl>
                                                <SelectTrigger className="w-[250px]">
                                                <SelectValue placeholder="Select a group" />
                                                </SelectTrigger>
                                             </FormControl>
                                             <SelectContent className="bg-background  p-3">
                                                <SelectGroup>
                                                   <SelectLabel className="font-bold text-lg">Postgraduate</SelectLabel>
                                                   <SelectItem value="behavioural-pg">Behavioural PG</SelectItem>
                                                   <SelectItem value="business-pg">Business PG</SelectItem>
                                                   <SelectItem value="central-banking">Central Banking</SelectItem>
                                                   <SelectItem value="dba-office">DBA Office</SelectItem>
                                                   <SelectItem value="exec-ed">Executive Education</SelectItem>
                                                   <SelectItem value="exec-mba">Exec MBA</SelectItem>
                                                   <SelectItem value="finance-pg">Finance PG</SelectItem>
                                                   <SelectItem value="ftmba">FTMBA</SelectItem>
                                                   <SelectItem value="glomba">GLOMBA</SelectItem>
                                                   <SelectItem value="management-pg">Management PG</SelectItem>
                                                   <SelectItem value="marketing-pg">Marketing PG</SelectItem>
                                                   <SelectItem value="mim">MIM</SelectItem>
                                                   <SelectItem value="mint">MINT</SelectItem>
                                                   <SelectItem value="shard">SHARD</SelectItem>

                                                </SelectGroup>
                                                <SelectGroup>
                                                   <SelectLabel className="font-bold text-lg">Undergraduate</SelectLabel>
                                                   <SelectItem value="ug-student-experience">UG Student Experience</SelectItem>
                                                   <SelectItem value="undergraduate">Undergraduate Resource</SelectItem>
                                                </SelectGroup>
                                             </SelectContent>
                                          </Select>
                                             <FormDescription>Optional - Choose the group who requested this booking</FormDescription>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              {/* requested by - input */}
                              <div className="requested-by grow">
                                 <FormField
                                    control={form.control}
                                    name="requested_by"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel className="my-3 font-bold">Requested by</FormLabel>
                                          <FormControl>
                                             <Input 
                                             placeholder="Input name here"
                                             
                                             type=""
                                             {...field} />
                                          </FormControl>
                                          <FormDescription>This is the name of the person requesting the booking.</FormDescription>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
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

