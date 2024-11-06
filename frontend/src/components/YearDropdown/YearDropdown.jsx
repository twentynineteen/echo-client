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
import terms from '../../assets/terms.json';

const years = terms.data.map((term) => {
   return {
      value: term.id,
      label: term.name,
   }
})

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
         className="w-full justify-between p-3"
      >
         {value
            ? years.find((year) => year.value === value)?.label
            : "Select year..."}
         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-3  bg-background">
      <Command className="bg-background">
         {/* <CommandInput className="bg-background" placeholder="Search year..." /> */}
         <CommandList>
            <CommandEmpty>No year found.</CommandEmpty>
            <CommandGroup className="max-h-60 overflow-y-auto p-3 ">
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