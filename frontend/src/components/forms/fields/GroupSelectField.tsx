import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const GroupSelectField: React.FC = () => {
   const form = useFormContext();
  return (
      <FormField
         control={form.control}
         name="group"
         render={({ field }) => (
            <FormItem>
               <FormLabel className="my-3 font-bold">Group</FormLabel>
               <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                     <SelectTrigger className="w-[250px]">
                     <SelectValue placeholder="Select a group" />
                     </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-background  p-3">
                     <SelectGroup>
                        <SelectLabel className="font-bold text-lg">Postgraduate</SelectLabel>
                        <SelectItem value="behavioural-pg">Behavioural PG</SelectItem>
                        <SelectItem value="business-pg">Business PG</SelectItem>
                        <SelectItem value="central-banking">Central Banking</SelectItem>
                        <SelectItem value="dba-office">DBA Office</SelectItem>
                        <SelectItem value="exec-ed">Executive Education</SelectItem>
                        <SelectItem value="exec-mba">Exec MBA</SelectItem>
                        <SelectItem value="finance-pg">Finance PG</SelectItem>
                        <SelectItem value="ftmba">FTMBA</SelectItem>
                        <SelectItem value="glomba">GLOMBA</SelectItem>
                        <SelectItem value="management-pg">Management PG</SelectItem>
                        <SelectItem value="marketing-pg">Marketing PG</SelectItem>
                        <SelectItem value="mim">MIM</SelectItem>
                        <SelectItem value="mint">MINT</SelectItem>
                        <SelectItem value="shard">SHARD</SelectItem>

                     </SelectGroup>
                     <SelectGroup>
                        <SelectLabel className="font-bold text-lg">Undergraduate</SelectLabel>
                        <SelectItem value="ug-student-experience">UG Student Experience</SelectItem>
                        <SelectItem value="undergraduate">Undergraduate Resource</SelectItem>
                     </SelectGroup>
                  </SelectContent>
               </Select>
                  <FormDescription>Optional - Choose the group who requested this booking</FormDescription>
               <FormMessage />
            </FormItem>
         )}
      />
  )
}

export default GroupSelectField