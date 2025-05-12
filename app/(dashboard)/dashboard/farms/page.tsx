"use client"
import React from "react";
import { columns } from "./columns";
import { Category } from "@prisma/client";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { useCategories } from "@/hooks/useCategories";
import { useFarms } from "@/hooks/useFarms";

export default function page() {
  const {farms,error,isLoading}=useFarms();
  if (isLoading) {
    return (
      <div className="p-8">
        <div>Loading farms...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div>Error loading farms</div>
      </div>
    );
  }
 
  return (
    <div className="p-8">
      <TableHeader
        title="Farms"
        linkTitle="Add Farm"
        href="/dashboard/farms/new"
        data={farms}
        model="farm"
      />
      <div className="py-8">
        <DataTable data={farms} columns={columns} />
      </div>
    </div>
  );
}
