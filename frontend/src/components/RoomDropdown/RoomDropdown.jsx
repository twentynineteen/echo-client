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

const rooms = [
   {
      value: "28eb8977-f1ef-433b-b34d-acd3df15c2c3",
      label: "0.006",
   },
   {
      value: "2b95913f-f2f5-478c-9ace-4aa61efca6f3",
      label: "0.013",
   },
];

function RoomDropdown() {
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
         className="w-[200px] justify-between"
      >
         {value
            ? rooms.find((room) => room.value === value)?.label
            : "Select room..."}
         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
      <Command>
         <CommandInput placeholder="Search room..." />
         <CommandList>
            <CommandEmpty>No room found.</CommandEmpty>
            <CommandGroup>
            {rooms.map((room) => (
               <CommandItem
                  key={room.value}
                  value={room.value}
                  onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                  }}
               >
                  <Check
                  className={cn(
                     "mr-2 h-4 w-4",
                     value === room.value ? "opacity-100" : "opacity-0"
                  )}
                  />
                  {room.label}
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

export default RoomDropdown