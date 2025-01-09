"use client"
import { AxiosResponse } from 'axios'
import * as React from 'react'
import type { DropdownItems, Inputs, Room, Schedule, SchedulePresenter, ScheduleSection, Venue } from '../../types'
// Scheduler functions
import { convertCaptureQuality, convertDateToDateString, createSchedule, getInputs, getPresenter, getSection, getVenue, removeSeconds } from './ScheduleFunctions'
// Shadcn components and dependencies
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/@/components/ui/form"
import { useToast } from "@/@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react"

// zod and form imports / dependencies
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { availability_options, defaultValues, formSchema } from "../Schedule/ScheduleUtils"


import AcademicYearCard from '../forms/fields/AcademicYearCard'
import CaptureQualityField from '../forms/fields/CaptureQualityField'
import PresenterField from '../forms/fields/PresenterField'
import RoomField from '../forms/fields/RoomField'
import RoomInputField from '../forms/fields/RoomInputField'

export default function Schedule() {

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
                           <div className="room gap-3 mr-3 ml-3">
                              <RoomField />
                           </div>
                           <Separator />
                           <div className="truncate">
                              <div className="container-inputs flex flex-col lg:flex-row justify-between pb-5 px-3">
                                 <div className="room-input gap-3 mt-3">
                                   <RoomInputField />
                                 </div>
                                 <div className="capture-quality gap-3 mt-3 mr-16">
                                    <CaptureQualityField />
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="presenters border rounded-lg p-3 mb-3">
                           <div className="presenter gap-3 mx-3 mb-3">
                              <PresenterField />
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
                                             // onChangeCapture={handleChange}
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
                                                // onChangeCapture={handleChange}
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
                                             // onChangeCapture={handleChange}
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

