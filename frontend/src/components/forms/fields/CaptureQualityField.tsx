import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useFormContext } from "react-hook-form";

const CaptureQualityField = () => {

   const form = useFormContext();
   
   return (
      <FormField
         control={form.control}
         name="capture_quality"
         render={({ field }) => (
            <FormItem className="space-y-3">
            <FormLabel className="my-3 font-bold">Capture Quality</FormLabel>
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

export default CaptureQualityField