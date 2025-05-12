"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { DataTablePagination } from "./data-table-pagination";
import { getUserType } from "./HelperFunctions/GetUserTypeFunction";

export function DataTable({
  columns,
  data = [],
  allowRowSelect = false,
  customContent = "",
}) {
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const userType = getUserType();

  const bgColor = userType === "user" ? "bg-[#006988]" : "bg-[#00A481]";

  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: allowRowSelect ? setRowSelection : undefined,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
  });

  const rows = table.getRowModel().rows || [];
  const hasRows = rows.length > 0;

  return (
    <div>
      {/* <div className="mb-[35px] mt-[14px] flex items-center justify-between">
        <div>
          <p className="text-[20px] font-medium leading-[28px] text-[#DEDEDE]">
            {title}
          </p>
        </div>
        <div className="flex items-center gap-[44px]">
          <InputSearch
            placeholder={`Search ${title}`}
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="bg-[#032031]"
          />
          {customContent}
        </div>
      </div> */}

      {customContent && (
        <div className="mb-3 flex justify-end">{customContent}</div>
      )}

      <Table className="text-[14px] font-medium leading-[20px] text-white">
        {hasRows && (
          <TableHeader className={`${bgColor}`}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="border-none hover:bg-transparent"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    style={{
                      minWidth: header?.column?.columnDef?.size,
                      maxWidth: header?.column?.columnDef?.size,
                    }}
                    className="text-[16px] font-medium leading-[22px] text-white"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
        )}
        <TableBody>
          {hasRows ? (
            rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={"bg-[#0A2A3C]"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className={"p-7"}
                    style={{
                      minWidth: cell?.column?.columnDef?.size,
                      maxWidth: cell?.column?.columnDef?.size,
                    }}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="pt-3 text-center">
                No data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="mt-3 flex items-center justify-end">
        {hasRows && allowRowSelect && (
          <div className="flex-1 text-[14px] font-medium leading-[20px] text-[#0A2A3C]">
            {table.getFilteredSelectedRowModel().rows?.length || 0} of{" "}
            {table.getFilteredRowModel().rows?.length || 0} row(s) selected.
          </div>
        )}
        {hasRows && <DataTablePagination table={table} />}
      </div>
    </div>
  );
}
