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

const occasions = [
   {
      value: "1",
      label: "1",
   },
   {
      value: "2",
      label: "2",
   },
   {
      value: "3",
      label: "3",
   },
   {
      value: "4",
      label: "4",
   },
   {
      value: "5",
      label: "5",
   },
   {
      value: "6",
      label: "6",
   },
   {
      value: "7",
      label: "7",
   },
   {
      value: "8",
      label: "8",
   },
   {
      value: "9",
      label: "9",
   },
];


function OccasionDropdown() {
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
                           ? occasions.find((occasion) => occasion.value === value)?.label
                           : "Select occasion..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                     </Button>
                     </PopoverTrigger>
                     <PopoverContent className="w-[200px] p-0 bg-background">
                     <Command>
                        <CommandInput className="bg-background" placeholder="Search occasion..." />
                        <CommandList>
                           <CommandEmpty>No occasion found.</CommandEmpty>
                           <CommandGroup>
                           {occasions.map((occasion) => (
                              <CommandItem
                                 key={occasion.value}
                                 value={occasion.value}
                                 onSelect={(currentValue) => {
                                 setValue(currentValue === value ? "" : currentValue)
                                 setOpen(false)
                                 }}
                              >
                                 <Check
                                 className={cn(
                                    "mr-2 h-4 w-4",
                                    value === occasion.value ? "opacity-100" : "opacity-0"
                                 )}
                                 />
                                 {occasion.label}
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

export default OccasionDropdown