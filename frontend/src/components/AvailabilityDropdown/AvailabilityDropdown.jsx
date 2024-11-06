import { Check, ChevronsUpDown } from "lucide-react";
import * as React from 'react';
 
import { Button } from "@/components/ui/button";
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from "@/components/ui/command";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const options = [
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

function AvailabilityDropdown() {
   const [open, setOpen] = React.useState(false)
   const [value, setValue] = React.useState("")
  return (
   <div className="">
     
   <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
      <Button
         variant="outline"
         role="combobox"
         aria-expanded={open}
         className="w-full justify-between p-3"
      >
         {value
            ? options.find((availability) => availability.value === value)?.label
            : "Select availability..."}
         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-3 bg-background">
      <Command className="bg-background">
         {/* <CommandInput className="bg-background" placeholder="Search availability..." /> */}
         <CommandList>
            <CommandEmpty>No availability found.</CommandEmpty>
            <CommandGroup>
            {options.map((availability) => (
               <CommandItem
                  key={availability.value}
                  value={availability.value}
                  onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                  }}
               >
                  <Check
                  className={cn(
                     "mr-2 h-4 w-4",
                     value === availability.value ? "opacity-100" : "opacity-0"
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

         </div>
  )
}

export default AvailabilityDropdown