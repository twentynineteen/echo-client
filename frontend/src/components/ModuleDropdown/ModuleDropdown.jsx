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

const modules = [
   {
      value: "IB123",
      label: "IB1230",
   },
   {
      value: "IBtest",
      label: "IBtest",
   },
];
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
                        className="w-full justify-between"
                     >
                        {value
                           ? modules.find((module) => module.value === value)?.label
                           : "Select module..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                     </Button>
                     </PopoverTrigger>
                     <PopoverContent className="w-[200px] p-0">
                     <Command>
                        <CommandInput placeholder="Search module..." />
                        <CommandList>
                           <CommandEmpty>No module found.</CommandEmpty>
                           <CommandGroup>
                           {modules.map((module) => (
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