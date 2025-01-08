import React from "react";
// zod and form imports / dependencies
import { Button } from "@/@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/@/components/ui/form";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DropdownItems } from "@/types";

import { getYears } from "@/components/Schedule/ScheduleFunctions";
import { Check, ChevronsUpDown } from "lucide-react";
import { useFormContext } from "react-hook-form";


const YearField = () => {
   const [year, setYear] = React.useState<DropdownItems[]>([]);
   const [selectedAcademicYear, setSelectedAcademicYear] = React.useState<string>("");
   const [sectionDisabled, setSectionDisabled] = React.useState<boolean>(false);

   // Function to toggle disabled state in Section dropdown
   // Only required to enable dropdown on selected year
   const enableSectionDropdown = () => {
      setSectionDisabled(true);
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

   const form = useFormContext();

   return (
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
                                    // getSections(year.value);
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
   )
}

export default YearField