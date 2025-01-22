// zod and form imports / dependencies
import * as z from "zod";
// Scheduler functions
import { subtractOneDayFromDate } from './ScheduleFunctions';


// Form Schema for validation through Zod
export const formSchema = z.object({
   academic_year: z.string(),
      occasion: z.string().optional(),
      section: z.string(),
      recording_title: z.string().min(2),
      room: z.string(),
      input: z.string(),
      capture_quality: z.string(),
      stream_quality: z.string().optional(),
      presenter: z.string(),
      guest_presenter: z.string().optional(),
      start_date: z.coerce.date().min(subtractOneDayFromDate(), { message: "Please choose a date in the future."}),
      start_time: z.preprocess(input => `${input}:00`,
         z.string().time()),
         end_time: z.preprocess(input => `${input}:00`,
            z.string().time()),
            availability: z.string(),
            availability_date: z.coerce.date().min(subtractOneDayFromDate(), { message: "Please choose a date in the future."}),
            live_stream_toggle: z.boolean(),
            group: z.string().optional(),
      requested_by: z.string().optional(),
   })
   .refine((data) => data.end_time > data.start_time, {
      message: "End time cannot be earlier than start time.",
      path: ["end_time"],
   });

const date = new Date();

export const defaultValues = {
               "occasion": "1",
               "start_date": date,
               "live_stream_toggle": false,
               "input": "[ADV] Audio/Display-1/Display-2",
               "capture_quality": "High Quality",
               "availability": "Immediately",
               "recording_title": "",
               "availability_date": date,
               "stream_quality": "High Quality",
            }


// Dropdown options for video availability
export const availability_options = [
   {
      value: "Immediate",
      label: "Immediate",
   },
   {
      value: "Never",
      label: "Never",
   },
   {
      value: "Manual",
      label: "Manual",
   },
];
