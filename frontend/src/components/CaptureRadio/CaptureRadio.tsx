import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


function CaptureRadio() {
  return (
   <RadioGroup defaultValue="option-one">
   <div className="flex items-center space-x-2">
     <RadioGroupItem value="option-one" id="option-one" />
     <Label htmlFor="option-one">Highest Quality</Label>
   </div>
   <div className="flex items-center space-x-2">
     <RadioGroupItem value="option-two" id="option-two" />
     <Label htmlFor="option-two">High Quality</Label>
   </div>
   <div className="flex items-center space-x-2">
     <RadioGroupItem value="option-three" id="option-three" />
     <Label htmlFor="option-three">Standard Quality</Label>
   </div>
 </RadioGroup>
  )
}

export default CaptureRadio