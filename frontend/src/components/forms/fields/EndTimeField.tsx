import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const EndTimeField: React.FC = () => {
  const form = useFormContext();
  return (
    <FormField
    control={form.control}
    name="end_time"
    render={({ field }) => (
       <FormItem>
       <FormLabel className="my-2 font-bold">End time (24 hr clock)</FormLabel>
       <FormControl>
          <Input                                         
          type="Time"
          // onChangeCapture={handleChange}
          {...field} />
       </FormControl>
       <FormDescription>Enter the end time of the recording.</FormDescription>
       <FormMessage />
       </FormItem>
    )}
 />
  )
}

export default EndTimeField