
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/@/components/ui/form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Nullable } from "@/types";
import { useFormContext } from "react-hook-form";

type Props = {
   messageDisabled: Nullable<boolean>;
   disabled: boolean;
}

export const RoomInputField: React.FC<Props> = (props: Props) => {
   const { messageDisabled, disabled } = props;
   const form = useFormContext();
   return (
      <FormField
         control={form.control}
         name="input"
         render={({ field }) => (
            <FormItem className="space-y-3">
            {messageDisabled ? "" : <FormLabel className="my-3 font-bold">Input</FormLabel>}
            <FormControl>
               <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                  disabled={disabled}
               >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                     <RadioGroupItem value="[ADV] Audio/Display-1/Display-2" />
                  </FormControl>
                  <FormLabel className="font-normal">
                     [ADV] Audio/Display-1/Display-2
                  </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                     <RadioGroupItem value="[AV] Audio/Display-1" />
                  </FormControl>
                  <FormLabel className="font-normal">
                     [AV] Audio/Display-1
                  </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                     <RadioGroupItem value="[AD] Audio/Display-2" />
                  </FormControl>
                  <FormLabel className="font-normal">
                  [AD] Audio/Display-2
                  </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                     <RadioGroupItem value="[A] Audio Only" />
                  </FormControl>
                  <FormLabel className="font-normal">[A] Audio Only</FormLabel>
                  </FormItem>
               </RadioGroup>
            </FormControl>
            <FormMessage />
            </FormItem>
         )}
      />
   )
}

export default RoomInputField