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

const years = [
   {
      value: "2023/24",
      label: "2023/24",
   },
   {
      value: "2024/25",
      label: "2024/25",
   },
   {
      value: "2025/26",
      label: "2025/26",
   },

];

function YearDropdown() {
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
            ? years.find((year) => year.value === value)?.label
            : "Select year..."}
         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
      <Command>
         <CommandInput placeholder="Search year..." />
         <CommandList>
            <CommandEmpty>No year found.</CommandEmpty>
            <CommandGroup>
            {years.map((year) => (
               <CommandItem
                  key={year.value}
                  value={year.value}
                  onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                  }}
               >
                  <Check
                  className={cn(
                     "mr-2 h-4 w-4",
                     value === year.value ? "opacity-100" : "opacity-0"
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

         </div>
  )
}

export default YearDropdown