import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/@/components/ui/form';
import { Input } from '@/components/ui/input';

import React from 'react';
import { useFormContext } from 'react-hook-form';

const RequestedByField: React.FC = () => {
   const form = useFormContext();
  return (
   <FormField
   control={form.control}
   name="requested_by"
   render={({ field }) => (
      <FormItem>
         <FormLabel className="my-3 font-bold">Requested by</FormLabel>
         <FormControl>
            <Input 
            placeholder="Input name here"
            // onChangeCapture={handleChange}
            type=""
            {...field} />
         </FormControl>
         <FormDescription>This is the name of the person requesting the booking.</FormDescription>
         <FormMessage />
      </FormItem>
   )}
/>
  )
}

export default RequestedByField