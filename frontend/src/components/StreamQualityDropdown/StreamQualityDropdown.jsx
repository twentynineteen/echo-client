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
      value: "Standard Quality",
      label: "Standard Quality",
   },
   {
      value: "High Quality",
      label: "High Quality",
   },
   {
      value: "Highest Quality",
      label: "Highest Quality",
   },
];

function StreamQualityDropdown() {
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
         className="w-full justify-between"
      >
         {value
            ? options.find((quality) => quality.value === value)?.label
            : "Select quality..."}
         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
      <Command>
         <CommandInput placeholder="Search quality..." />
         <CommandList>
            <CommandEmpty>No quality found.</CommandEmpty>
            <CommandGroup>
            {options.map((quality) => (
               <CommandItem
                  key={quality.value}
                  value={quality.value}
                  onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                  }}
               >
                  <Check
                  className={cn(
                     "mr-2 h-4 w-4",
                     value === quality.value ? "opacity-100" : "opacity-0"
                  )}
                  />
                  {quality.label}
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

export default StreamQualityDropdown