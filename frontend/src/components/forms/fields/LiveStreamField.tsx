import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Nullable } from "@/types";
import React from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
   messageDisabled: Nullable<boolean>;
}


const LiveStreamField: React.FC<Props> = (props: Props) => {
   const { messageDisabled } = props;
   const form = useFormContext();
   return (
      <FormField
         control={form.control}
         name="live_stream_toggle"
         render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between mb-3 mr-3">
               <div className="space-y-0.5">
                  { messageDisabled ? "" : <FormLabel className="my-3 font-bold">Live Stream</FormLabel>}
                  { messageDisabled ? "" : <FormDescription>Is this session going to be streamed live?</FormDescription>}
               </div>
               <FormControl>
                  <Switch
                     checked={field.value}
                     onCheckedChange={field.onChange}
                     // disabled
                     aria-readonly
                  />
               </FormControl>
            </FormItem>
         )}
      />
  )
}

export default LiveStreamField