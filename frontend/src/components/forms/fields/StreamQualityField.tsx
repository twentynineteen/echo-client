import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

import { useFormContext } from "react-hook-form";

const StreamQualityField: React.FC = () => {
   const form = useFormContext();
  return (
      <FormField
         control={form.control}
         name="stream_quality"
         render={({ field }) => (
            <FormItem className="space-y-3">
            <FormLabel className="my-2 font-bold">Stream Quality</FormLabel>
            <FormControl>
               <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
               >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                     <RadioGroupItem value="High Quality" />
                  </FormControl>
                  <FormLabel className="font-normal">
                     High Quality
                  </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                     <RadioGroupItem value="Standard Quality" />
                  </FormControl>
                  <FormLabel className="font-normal">
                  Standard Quality
                  </FormLabel>
                  </FormItem>
               </RadioGroup>
            </FormControl>
            <FormMessage />
            </FormItem>
         )}
      />
   )
}

export default StreamQualityField