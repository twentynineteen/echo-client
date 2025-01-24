import { FormControl, FormField, FormItem, FormMessage } from '@/@/components/ui/form';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import React from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  fieldName: string,
  disabled?: boolean,
}

const DatePicker: React.FC<Props> = (props: Props) => {
  const { fieldName, disabled } = props;
  const form = useFormContext();

  return (
    <FormField
      
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  disabled={disabled}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-8" />
                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                </Button>
              </FormControl >
            </PopoverTrigger>
            <PopoverContent className="bg-background">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                className="pointer-events-auto" // bugfix for Sheet form
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default DatePicker
