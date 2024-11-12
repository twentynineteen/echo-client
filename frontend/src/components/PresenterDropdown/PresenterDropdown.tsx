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
import users from "../../assets/users.json";

const presenters = users.data.map((user) => {
   return {
      email: user.email,
      value: user.firstName + " " + user.lastName,
      label: user.firstName + " " + user.lastName,
   }
})

export default function PresenterDropdown() {
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
            ? presenters.find((presenter) => presenter.value === value)?.label
            : "Select presenter..."}
         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-background">
      <Command className="grid grid-cols- p-3 bg-background">
         <CommandInput className="bg-background" placeholder="Search presenter..." />
         <CommandList>
            <CommandEmpty>No presenter found.</CommandEmpty>
            <CommandGroup className="max-h-60 overflow-y-auto p-3">
            {presenters.map((presenter) => (
               <CommandItem
                  key={presenter.value}
                  value={presenter.value}
                  onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                  }}
               >
                  <Check
                  className={cn(
                     "mr-2 h-4 w-4",
                     value === presenter.value ? "opacity-100" : "opacity-0"
                  )}
                  />
                  {presenter.label}
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
