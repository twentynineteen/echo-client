import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";

const RecordingTitleField = () => {
   
   const form = useFormContext();
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [title, setTitle] = React.useState("");

   // onChange handler to update input box state
   // stops console error due to uncontrolled inputs
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   setTitle(event.target.value);
   }

   return (
      <FormField
      control={form.control}
      name="recording_title"
      render={({ field }) => (
         <FormItem>
         <FormLabel className="my-2 font-bold">Recording Title</FormLabel>
         <FormControl>
            <Input 
            placeholder="Week 1 - introduction to course"
            onChangeCapture={handleChange}
            type=""
            {...field}
             />
         </FormControl>
         <FormDescription className="">This is the video title as seen by students.</FormDescription>
         <FormMessage />
         </FormItem>
      )}
   />
   )
}

export default RecordingTitleField