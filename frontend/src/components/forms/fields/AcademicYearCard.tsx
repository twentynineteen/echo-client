import React from "react";
// zod and form imports / dependencies
import { Button } from "@/@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/@/components/ui/form";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DropdownItems } from "@/types";

import { getSections, getYears } from "@/components/Schedule/ScheduleFunctions";
import { Check, ChevronsUpDown } from "lucide-react";
import { useFormContext } from "react-hook-form";
import OccasionField from "./OccasionField";
import RecordingTitleField from "./RecordingTitleField";

const AcademicYearCard = () => {
   // AcademicYearCard is used instead of individual Field components so that the selected year can unlock relevant section call
   // without the use of a global state manager to pass props up

   const [year, setYear] = React.useState<DropdownItems[]>([]);
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [selectedAcademicYear, setSelectedAcademicYear] = React.useState<string>("");
   const [sectionDisabled, setSectionDisabled] = React.useState<boolean>(false);

   
   const [sections, setSections] = React.useState<DropdownItems[]>([]);

   // Function to toggle disabled state in Section dropdown
   // Only required to enable dropdown on selected year
   const enableSectionDropdown = () => {
      setSectionDisabled(true);
   }

   // add list of users to user state - mapping echo 360 users to dropdown items
   const populateSections = async (year: string) => {
      try {
         const map: DropdownItems[] = await getSections(year);
         setSections(map);
      } catch (err) {
         console.error(err);
      }
   }

   // add list of users to user state - mapping echo 360 users to dropdown items
   const populateYears = async () => {
      try {
         const map: DropdownItems[] = await getYears();
         setYear(map);
      } catch (err) {
         console.error(err);
      }
   }
   
   // populate users on page load
   React.useEffect(() => {
      populateYears();
   },[]);

   if (year == undefined) {
      console.error("Couldn't find years");
   }

   if (sections == undefined) {
      console.error("Couldn't find Sections");
   }

   const form = useFormContext();

   return (
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
                                          {field.value ? year.find((year) => year.value === field.value)?.label
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
                                             {year.map((year) => (
                                             <CommandItem
                                                key={year.value}
                                                value={year.label}
                                                onSelect={() => {
                                                   form.setValue("academic_year", year.value);
                                                   enableSectionDropdown();
                                                   setSelectedAcademicYear(year.value)
                                                   populateSections(year.value);
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
                     <OccasionField />
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
                  {/* <SectionsField /> */}
                     {/* <p>{sections ? sections.id : "none found"}</p> */}
               </div>
               <div className="recording-title gap-3 mr-3 ml-3">
                  <RecordingTitleField />
               </div>
            </div>
   )
}

export default AcademicYearCard