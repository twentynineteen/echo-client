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

const groups = [
   {
      value: "BehaviouralPG",
      label: "BehaviouralPG",
   },
   {
      value: "FinancePG",
      label: "FinancePG",
   },
];

function GroupDropdown() {
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
            ? groups.find((group) => group.value === value)?.label
            : "Select group..."}
         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
      <Command>
         <CommandInput placeholder="Search group..." />
         <CommandList>
            <CommandEmpty>No group found.</CommandEmpty>
            <CommandGroup>
            {groups.map((group) => (
               <CommandItem
                  key={group.value}
                  value={group.value}
                  onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                  }}
               >
                  <Check
                  className={cn(
                     "mr-2 h-4 w-4",
                     value === group.value ? "opacity-100" : "opacity-0"
                  )}
                  />
                  {group.label}
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

export default GroupDropdown