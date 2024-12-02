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
      value: "Behavioural PG",
      label: "Behavioural PG",
   },
   {
      value: "Business PG",
      label: "Business PG",
   },
   {
      value: "Central Banking",
      label: "Central Banking",
   },
   {
      value: "DBA Office",
      label: "DBA Office",
   },
   {
      value: "Exec Ed",
      label: "Exec Ed",
   },
   {
      value: "Exec MBA",
      label: "Exec MBA",
   },
   {
      value: "Finance PG",
      label: "Finance PG",
   },
   {
      value: "FTMBA",
      label: "FTMBA",
   },
   {
      value: "GLOMBA",
      label: "GLOMBA",
   },
   {
      value: "Management PG",
      label: "Management PG",
   },
   {
      value: "Marketing PG",
      label: "Marketing PG",
   },
   {
      value: "MIM",
      label: "MIM",
   },
   {
      value: "MINT",
      label: "MINT",
   },
   {
      value: "SHARD",
      label: "SHARD",
   },
   {
      value: "UG Student Experience",
      label: "UG Student Experience",
   },
   {
      value: "UG",
      label: "UG",
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
         className="w-full justify-between p-3"
      >
         {value
            ? groups.find((group) => group.value === value)?.label
            : "Select group..."}
         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-3 bg-background">
      <Command>
         {/* <CommandInput className="bg-background" placeholder="Search group..." /> */}
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