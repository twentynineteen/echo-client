import { Button } from '@/@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import React from 'react';
import { useFormContext } from 'react-hook-form';

// type Props = {
//    selectedDate: string;
//    value: string;
// }

const RecordingDateField: React.FC = () => {
   const form = useFormContext();
  return (
      <FormField
         control={form.control}
         name="start_date"
         render={({ field }) => (
            <FormItem className="flex flex-col">
               <FormLabel className="my-2 font-bold">Recording Date</FormLabel>
               <Popover modal>
                  <PopoverTrigger asChild>
                     <FormControl>
                        <Button
                           variant={"outline"}
                           className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                           )}
                        >
                           {field.value ? (
                              format(field.value, "PPP")
                           ) : (
                              <span>Pick a date</span>
                           )}
                           <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                     </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background" align="start">
                     <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        autoFocus
                     />
                  </PopoverContent>
               </Popover>
               <FormDescription>Select the date of recording from the calendar.</FormDescription>
               <FormMessage />
            </FormItem>
         )}
      />
  )
}

export default RecordingDateField