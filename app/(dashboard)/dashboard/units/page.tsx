"use client"
import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { useUnits } from "@/hooks/useUnits";

export default function page() {
  const {units,error,isLoading}=useUnits();
  if (isLoading) {
    return (
      <div className="p-8">
        <div>Loading Units...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div>Error loading units</div>
      </div>
    );
  }
 
  return (
    <div className="p-8">
      <TableHeader
        title="Units"
        linkTitle="Add Units"
        href="/dashboard/units/new"
        data={units}
        model="unit"
      />
      <div className="py-8">
        <DataTable data={units} columns={columns} />
      </div>
    </div>
  );
}
