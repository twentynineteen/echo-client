import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import React from 'react'

function InputRadio() {
  return (
   <RadioGroup defaultValue="option-one">
   <div className="flex items-center space-x-2">
     <RadioGroupItem value="option-one" id="option-one" />
     <Label htmlFor="option-one">[ADD] Audio/Display-1/Display-2</Label>
   </div>
   <div className="flex items-center space-x-2">
     <RadioGroupItem value="option-two" id="option-two" />
     <Label htmlFor="option-two">[AD] Audio/Display-1</Label>
   </div>
   <div className="flex items-center space-x-2">
     <RadioGroupItem value="option-three" id="option-three" />
     <Label htmlFor="option-three">[AD] Audio/Display-2</Label>
   </div>
   <div className="flex items-center space-x-2">
     <RadioGroupItem value="option-four" id="option-four" />
     <Label htmlFor="option-four">[A] Audio Only</Label>
   </div>
 </RadioGroup>
  )
}

export default InputRadio