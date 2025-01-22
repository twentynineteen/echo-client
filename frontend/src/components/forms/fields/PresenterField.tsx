import React from "react";
// zod and form imports / dependencies
import { Button } from "@/@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/@/components/ui/form";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DropdownItems } from "@/types";

import { getUsers } from "@/components/Schedule/ScheduleFunctions";
import { Nullable } from "@/types";
import { Check, ChevronsUpDown } from "lucide-react";
import { useFormContext } from "react-hook-form";

type Props = {
   messageDisabled: Nullable<boolean>;
}


const PresenterField: React.FC<Props> = (props: Props) => {
   const { messageDisabled } = props;
   const [user, setUser] = React.useState<DropdownItems[]>([]);

   // add list of users to user state - mapping echo 360 users to dropdown items
   const populateUsers = async () => {
      try {
         const map: DropdownItems[] = await getUsers();
         setUser(map);
      } catch (err) {
         console.error(err);
      }
   }
   
   // populate users on page load
   React.useEffect(() => {
      populateUsers();
   },[]);

   if (user == undefined) {
      console.error("Couldn't find users");
   }

   const form = useFormContext();

   return (
      <FormField 
         control={form.control}
         name="presenter"
         render={({ field }) => (
            <FormItem className="flex flex-col">
               { messageDisabled ? "" : <FormLabel className="my-2 font-bold">Presenter</FormLabel> }
               <Popover>
                  <PopoverTrigger asChild>
                     <FormControl>
                        <Button 
                           variant="outline"
                           role="combobox"   
                           className="w-full justify-between p-3"
                        >
                           {field.value ? user.find((presenter) => presenter.value === field.value)?.label
                           : "Select presenter..."}
                           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                        </Button>
                     </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-3 bg-background">
                     <Command className="bg-background">
                     <CommandInput placeholder="Search presenter..." />
                        <CommandList>
                           <CommandEmpty>No presenter found.</CommandEmpty>
                           <CommandGroup>
                              {user.map((presenter) => (
                              <CommandItem
                                 key={presenter.value}
                                 value={presenter.label}
                                 className="pointer-events-auto" // bugfix for Sheet form
                                 onSelect={() => {
                                    form.setValue("presenter", presenter.value);
                                 }}
                              >
                                 <Check
                                    className={cn(
                                    "mr-2 h-4 w-4",
                                    presenter.value === field.value
                                       ? "opacity-100"
                                       : "opacity-0"
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
               {messageDisabled ? "" : <FormDescription>This is the main presenter on the recording.</FormDescription>}
               <FormMessage />
            </FormItem>
         )}
      />
  )
}

export default PresenterField