import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "../ui/data-table-column-header";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { client, headers } from "@/lib/utils";
import { Schedule } from "@/types";
import { AxiosResponse } from "axios";
import React from "react";
import { RecordingSheet } from "../RecordingSheet/RecordingSheet";


// function to collect recording for editing
const getScheduleById = async (id: string)=> {
   try {
      const request: AxiosResponse = await client.get(`/schedules/${id}`, headers);                                               
                                                return request.data;
      } catch(err) {
         console.error(err);
      }

}

export const columns: ColumnDef<Schedule>[] = [
   {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
   },
   {
      accessorKey: "id",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="ID" />
       ),
   },
   {
      accessorKey: "name",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Recording Title" />
       ),
   },
   {
      accessorKey: "startDate",
      header: ({ column }) => (
             <DataTableColumnHeader column={column} title="Start Date" />
         ),
   },
   {
      accessorKey: "startTime",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Start Time" />
       ),
   },
   {
      accessorKey: "endTime",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="End Time" />
       ),
   },
   {
      accessorKey: "sections.0.courseIdentifier",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Course Identifier" />
       ),
   },
   {
      accessorKey: "sections.0.termName",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Term Name" />
       ),
   },
   {
      accessorKey: "sections.0.sectionName",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Section Name" />
       ),
   },
   {
      accessorKey: "sections.0.availability.availability",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Availability" />
       ),
   },
   {
      accessorKey: "sections.0.availability.concreteTime",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Availability Date" />
       ),
   },
   {
      accessorKey: "venue.roomName",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Room" />
       ),
   },
   {
      accessorKey: "presenter.userEmail",
      header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Presenter"/>
         ),
   },
   {
      id: "actions",
      cell: ({ row }) => {
         const recording = row.original

         // State to track visibility
         const [isVisible, setIsVisible] = React.useState(false); // React does not like hooks usage not in a component

         // State to track current recording Id
         const [selectedId, setSelectedId] = React.useState<Schedule>(); // React does not like hooks usage not in a component. 

         // Toggle visibility on click
         const toggleVisibility = () => {
            setIsVisible((prevState) => !prevState);
         };


   
         return (
            <DropdownMenu >
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background p-3 w-full"  >
               <DropdownMenuLabel className="font-bold">Actions</DropdownMenuLabel>
               <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(recording.id)}
               >
                  Copy recording ID
               </DropdownMenuItem>
               {/* <DropdownMenuSeparator /> */}
               <DropdownMenuItem 
                  onClick={() => navigator.clipboard.writeText(recording.startDate ? recording.startDate : "")}
               >
                  Copy recording Start Date
                  </DropdownMenuItem>
               <DropdownMenuSeparator />
               <DropdownMenuItem
                  onClick={async () => {
                     // setSelectedId(recording.id);
                     setSelectedId(await getScheduleById(recording.id));
                     toggleVisibility();

                  }}
               >
                  Edit recording
               </DropdownMenuItem>
               <DropdownMenuItem>View schedule details</DropdownMenuItem>
            </DropdownMenuContent>
            {isVisible && <RecordingSheet selectedId={selectedId} toggleVisibility={toggleVisibility} /> }
            </DropdownMenu>
         )
      },
      },
]