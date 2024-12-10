"use-client"

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
import { Schedule } from "@/types";

type Nullable<T> = T | null;

// define the shape of input data
type Sections = {
   courseId: Nullable<string>
   courseIdentifier: Nullable<string>
   courseExternalId: Nullable<string>
   termId: Nullable<string>
   termName: Nullable<string>
   termExternalId: Nullable<string>
   sectionId: Nullable<string>
   sectionName: Nullable<string>
   sectionExternalId: Nullable<string>
   availability: Availability
};

type Availability = {
   availability: Nullable<string>
   relativeDelay: Nullable<number>
   concreteTime: Nullable<string>
   unavailabilityDelay: Nullable<number>
}

type Venue = {
   campusId: Nullable<string>
   campusName: Nullable<string>
   campusExternalId: Nullable<string>
   buildingId: Nullable<string>
   buildingName: Nullable<string>
   buildingExternalId: Nullable<string>
   roomId: Nullable<string>
   roomName: Nullable<string>
   roomExternalId: Nullable<string>
}

type Presenter = {
   userId: Nullable<string>
   userEmail: Nullable<string>
   fullName: Nullable<string>
   userExternalId: Nullable<string>
}

export type Recording = {
   id: string
   startDate: string
   startTime: string
   endDate: Nullable<string>
   endTime: string
   daysOfWeek: Nullable<string>
   exclusionDates: Nullable<string>
   sections: Sections[]
   name: Nullable<string>
   externalId: Nullable<string>
   venue: Nullable<Venue>
   presenter: Nullable<Presenter>
   guestPresenter: Nullable<string>
   shouldCaption: Nullable<boolean>
   shouldStreamLive: Nullable<boolean>
   shouldAutoPublish: Nullable<boolean>
   shouldRecurCapture: Nullable<boolean>
   input1: Nullable<string>
   input2: Nullable<string>
   captureQuality: Nullable<string>
   streamQuality: Nullable<string>
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
         const payment = row.original
   
         return (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background p-3 w-full">
               <DropdownMenuLabel className="font-bold">Actions</DropdownMenuLabel>
               <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(payment.id)}
               >
                  Copy recording ID
               </DropdownMenuItem>
               <DropdownMenuSeparator />
               <DropdownMenuItem>View section</DropdownMenuItem>
               <DropdownMenuItem>View schedule details</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
         )
      },
      },
]