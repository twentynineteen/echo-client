import React from "react";
// zod and form imports / dependencies
import { Button } from "@/@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/@/components/ui/form";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { availability_options } from "@/components/Schedule/ScheduleUtils";
import { Nullable } from "@/types";
import { Check, ChevronsUpDown } from "lucide-react";
import { useFormContext } from "react-hook-form";

type Props = {
   messageDisabled: Nullable<boolean>;
}

const AvailabilityField: React.FC<Props> = (props: Props) => {
   const { messageDisabled } = props;
   const form = useFormContext();
   return (
      <FormField 
         control={form.control}
         name="availability"
         render={({ field }) => (
            <FormItem className="flex flex-col">
            { messageDisabled ? "" : <FormLabel className="my-2 font-bold">Availability</FormLabel>}
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
                                 className="pointer-events-auto" // bugfix for Sheet form
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
               {messageDisabled ? "" : <FormDescription>Set when this recording is made available to students.</FormDescription>}
               <FormMessage />
            </FormItem>
         )}
      />
   )
}

export default AvailabilityField