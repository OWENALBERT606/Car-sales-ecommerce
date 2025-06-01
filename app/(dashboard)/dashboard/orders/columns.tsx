"use client";

import Image from "next/image";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Category, Order } from "@prisma/client";
export const columns: ColumnDef<Order>[] = [
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
    accessorKey: "user.firstName",
    header: ({ column }) => <SortableColumn column={column} title="First Name" />,
  },
   {
    accessorKey: "user.lastName",
    header: ({ column }) => <SortableColumn column={column} title="Last Name" />,
  },
  
   {
    accessorKey: "status",
    header: ({ column }) => <SortableColumn column={column} title="Order Status" />,
  },
   {
    accessorKey: "total",
    header: ({ column }) => <SortableColumn column={column} title="Amount" />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <ActionColumn
          row={row}
          model="order"
          editEndpoint={`/dashboard/orders/${order.id}`}
          id={order.id}
        />
      );
    },
  },
];
