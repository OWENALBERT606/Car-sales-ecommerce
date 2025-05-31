"use client"
import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { useModels } from "@/hooks/useModels";
import { useOrders } from "@/hooks/useOrders";

export default function page() {
  const {orders, error, isLoading } = useOrders();
  if (isLoading) {
    return (
      <div className="p-8">
        <div>Loading Car models...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div>Error loading car models</div>
      </div>
    );
  }
  return (
    <div className="p-8">
      <TableHeader
        title="Car Orders"
        linkTitle="Add order"
        href="/dashboard/orders/new"
        data={orders}
        model="order"
      />
      <div className="py-8">
        <DataTable data={orders

        } columns={columns} />
      </div>
    </div>
  );
}
