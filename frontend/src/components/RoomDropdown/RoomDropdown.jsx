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
import rooms from '../../assets/rooms.json';

const roomList = rooms.data.map((room) => {
   return {
      value: room.id,
      label: room.name,
   }
})

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
         className="w-full justify-between p-3"
      >
         {value
            ? roomList.find((room) => room.value === value)?.label
            : "Select room..."}
         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-background">
      <Command>
         <CommandInput className="bg-background" placeholder="Search room..." />
         <CommandList>
            <CommandEmpty>No room found.</CommandEmpty>
            <CommandGroup className="max-h-60 overflow-y-auto p-3">
            {roomList.map((room) => (
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