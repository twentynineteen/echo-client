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

const inputs = [
   {
      value: "[ADD] Audio/Display-1/Display-2",
      label: "[ADD] Audio/Display-1/Display-2",
   },
   {
      value: "[AD] Audio/Display-1",
      label: "[AD] Audio/Display-1",
   },
   {
      value: "[AD] Audio/Display-2",
      label: "[AD] Audio/Display-2",
   },
   {
      value: "[A] Audio Only",
      label: "[A] Audio Only",
   },
];

function InputDropdown() {
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
            ? inputs.find((input) => input.value === value)?.label
            : "Select input..."}
         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-background">
      <Command>
         <CommandInput className="bg-background" placeholder="Search input..." />
         <CommandList>
            <CommandEmpty>No input found.</CommandEmpty>
            <CommandGroup>
            {inputs.map((input) => (
               <CommandItem
                  key={input.value}
                  value={input.value}
                  onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                  }}
               >
                  <Check
                  className={cn(
                     "mr-2 h-4 w-4",
                     value === input.value ? "opacity-100" : "opacity-0"
                  )}
                  />
                  {input.label}
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

export default InputDropdown