// zod and form imports / dependencies
import { Button } from "@/@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/@/components/ui/form";
import { getRooms } from "@/components/Schedule/ScheduleFunctions";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DropdownItems, Nullable } from "@/types";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {
   messageDisabled: Nullable<boolean>;
   disabled: boolean;
}


const RoomField: React.FC<Props> = (props: Props) => {
   const { messageDisabled, disabled } = props;
   const [room, setRoom] = React.useState<DropdownItems[]>([]);

   // add list of users to user state - mapping echo 360 users to dropdown items
   const populateRooms = async () => {
      try {
         const map: DropdownItems[] = await getRooms();
         setRoom(map);
      } catch (err) {
         console.error(err);
      }
   }
   
   // populate users on page load
   React.useEffect(() => {
      populateRooms();
   },[]);

   if (room == undefined) {
      console.error("Couldn't find rooms");
   }
   
   const form = useFormContext();
   return (
      <FormField 
         control={form.control}
         name="room"
         render={({ field }) => (
            <FormItem className="flex flex-col">
               {messageDisabled ? "" : <FormLabel className="my-3 font-bold">Room</FormLabel>}
               <Popover>
                  <PopoverTrigger asChild>
                     <FormControl>
                        <Button 
                           variant="outline"
                           role="combobox"   
                           className="w-full justify-between p-3"
                           disabled={disabled}
                        >
                           {field.value ? room.find((room) => room.value === field.value)?.label
                           : "Select room..."}
                           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                        </Button>
                     </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-3 bg-background">
                     <Command className="bg-background">
                     <CommandInput placeholder="Search room..." />
                        <CommandList>
                           <CommandEmpty>No room found.</CommandEmpty>
                           <CommandGroup>
                              {room.map((room) => (
                              <CommandItem
                                 key={room.value}
                                 value={room.label}
                                 className="pointer-events-auto" // bugfix for Sheet form
                                 onSelect={() => {
                                    form.setValue("room", room.value);
                                 }}
                              >
                                 <Check
                                    className={cn(
                                    "mr-2 h-4 w-4",
                                    room.value === field.value
                                       ? "opacity-100"
                                       : "opacity-0"
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
               {messageDisabled ? "" : <FormDescription className="pb-3">This the room where the recording is taking place.</FormDescription>}
               <FormMessage />
            </FormItem>
         )}
      />
   )
}

export default RoomField