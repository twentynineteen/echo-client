"use client"

import * as React from "react"

import {
   ColumnDef,
   ColumnFiltersState,
   SortingState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table"

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableViewOptions } from "./data-table-view-options"


interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[]
   data: TData[]
}

export function DataTable<TData, TValue>({
   columns,
   data,
}: DataTableProps<TData, TValue>) {
   const [sorting, setSorting] = React.useState<SortingState>([])   
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
   const [rowSelection, setRowSelection] = React.useState({})

   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      onRowSelectionChange: setRowSelection,
      state: {
         sorting,
         columnFilters,
         rowSelection,
      }
   })
   return (
      <div>
         
         {/* Filter content by... */}
         <div className="flex items-center py-4">
          <span className="w-16 font-bold p-3">Filter</span>
        <Input
          placeholder="Filter dates..."
          value={(table.getColumn("startDate")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("startDate")?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-background p-3"
        />
      </div>
         {/* Table content */}
         <div className="rounded-md border">
            <Table className="text-xs">
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead key={header.id}>
                                 {header.isPlaceholder ? null : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                 )}
                              </TableHead>
                           )
                        })}
                     </TableRow>
                  ))}
               </TableHeader>
               <TableBody>
                  {table.getRowModel().rows?.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        >
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                           No results.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>
         {/* Pagination buttons */}
         <div className="flex items-center justify-end space-x-2 py-4">
            <Button
               variant="outline"
               size="sm"
               onClick={() => table.previousPage()}
               disabled={!table.getCanPreviousPage()}
            >
               Previous
            </Button>
            <Button
               variant="outline"
               size="sm"
               onClick={() => table.nextPage()}
               disabled={!table.getCanNextPage()}
            >
               Next
            </Button>
      {/* Show number of selected rows */}
         <div className="flex-1 text-sm text-muted-foreground p-3">
            <DataTablePagination table={table} />
            <DataTableViewOptions table={table} />

         </div>
         <div>
         </div>
      </div>
      </div>
   )
}