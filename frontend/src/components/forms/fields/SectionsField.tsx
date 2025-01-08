import React from "react";
// zod and form imports / dependencies
import { Button } from "@/@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/@/components/ui/form";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DropdownItems } from "@/types";


import { getSections } from "@/components/Schedule/ScheduleFunctions";
import { Check, ChevronsUpDown } from "lucide-react";
import { useFormContext } from "react-hook-form";

const SectionsField = () => {
   const [sections, setSections] = React.useState<DropdownItems[]>([]);
   // const [sectionDisabled, setSectionDisabled] = React.useState<boolean>(false);

   // // Function to toggle disabled state in Section dropdown
   // // Only required to enable dropdown on selected year
   // const enableSectionDropdown = () => {
   //    setSectionDisabled(true);
   // }
   
      // add list of users to user state - mapping echo 360 users to dropdown items
      const populateSections = async () => {
         try {
            const map: DropdownItems[] = await getSections("2024/25");
            setSections(map);
         } catch (err) {
            console.error(err);
         }
      }
      
      // populate Sections on page load
      React.useEffect(() => {
         populateSections();
      },[]);
   
      if (sections == undefined) {
         console.error("Couldn't find Sections");
      }

   const form = useFormContext(); 

   return (
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
                           // disabled={!sectionDisabled}
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
               <FormDescription className="pb-3">
                  {/* {!sectionDisabled ? "This is disabled until you have selected an academic year" : "This is the section where the recording will be kept."} */}
                  </FormDescription>
               <FormMessage />
            </FormItem>
         )}
         />
   )
}

export default SectionsField