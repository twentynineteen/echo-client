import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetDescription,
   SheetFooter,
   SheetHeader,
   SheetTitle,
} from "@/@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Schedule } from "@/types";
import React from "react";

interface RecordingProps {
   selectedId: Schedule;
}

export const RecordingSheet: React.FC<RecordingProps> = ({selectedId}) => {

   
   // set inputs as controlled to allow changes to recording
   const recording = selectedId;

   // recording name state for input box
   const [recordingName, setRecordingName] = React.useState(recording.name || "");

  // onChange handler to update input box state
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   setRecordingName(event.target.value);
  }

  return (
    <Sheet key="right" defaultOpen={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit recording</SheetTitle>
          <SheetDescription>
            Make changes to your recording here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="recordingId" className="text-right">
             ID
            </Label>
            <Input id="recordingId" value={recording.id} className="col-span-3" disabled/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={recordingName} className="col-span-3" onChange={handleChange}/>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
