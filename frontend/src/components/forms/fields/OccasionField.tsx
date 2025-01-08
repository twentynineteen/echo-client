import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/@/components/ui/form";
import { getRange } from '@/components/Schedule/ScheduleFunctions';
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DropdownItems } from '@/types';
import { Check, ChevronsUpDown } from "lucide-react";
import { useFormContext } from 'react-hook-form';

// Build an array of integers for occasion numbers and map to a list of dropdown items for Occasion field
const array = getRange(10);
const occasions: DropdownItems[] = array.map((item: number) => {
   return {
      value: item.toString(),
      label: item.toString(),
   }
});

const OccasionField = () => {
   
   
   const form = useFormContext();

  return (
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
            <FormDescription className="pb-3">This is for modules with more than one occasion at WBS.</FormDescription>
            <FormMessage />
         </FormItem>
      )}
      />
  )
}

export default OccasionField;