import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Nullable } from '@/types';
import React from 'react';
import { useFormContext } from 'react-hook-form';

// props is passed in to remove message and labels for use in edit recordings form
type Props = {
   messageDisabled: Nullable<boolean>,
   disabled?: boolean
}

const EndTimeField: React.FC<Props> = (props: Props) => {
   const {messageDisabled, disabled} = props;
   const form = useFormContext();
   return (
      <FormField
         control={form.control}
         name="end_time"
         render={({ field }) => (
            <FormItem>
            {messageDisabled ? "" : <FormLabel className="my-2 font-bold">End time (24 hr clock)</FormLabel>}
            <FormControl>
               <Input                                         
               type="Time"
               disabled={disabled}
               // onChangeCapture={handleChange}
               {...field} />
            </FormControl>
            {messageDisabled ? "" : <FormDescription>Enter the end time of the recording.</FormDescription>}
            <FormMessage />
            </FormItem>
         )}
      />
   )
}

export default EndTimeField