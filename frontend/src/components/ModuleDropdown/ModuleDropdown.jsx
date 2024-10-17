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
import sections from '../../assets/sections.json';

// Module dropdown uses 'sections' data from echo360 SDK
const sectionList = sections.data.map((section) => {
   return {
      value: section.id,
      label: section.sectionNumber,
   }
})


function ModuleDropdown() {
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
                           ? sectionList.find((module) => module.value === value)?.label
                           : "Select module..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                     </Button>
                     </PopoverTrigger>
                     <PopoverContent className="w-full p-0 bg-background">
                     <Command className="grid grid-cols- p-3">
                        <CommandInput className="bg-background" placeholder="Search module..." />
                        <CommandList>
                           <CommandEmpty>No module found.</CommandEmpty>
                           <CommandGroup className="max-h-60 overflow-y-auto p-3">
                           {sectionList.map((module) => (
                              <CommandItem
                                 key={module.value}
                                 value={module.value}
                                 onSelect={(currentValue) => {
                                 setValue(currentValue === value ? "" : currentValue)
                                 setOpen(false)
                                 }}
                              >
                                 <Check
                                 className={cn(
                                    "mr-2 h-4 w-4",
                                    value === module.value ? "opacity-100" : "opacity-0"
                                 )}
                                 />
                                 {module.label}
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

export default ModuleDropdown