"use client"
import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { useCategories } from "@/hooks/useCategories";
import { useTypes } from "@/hooks/useTypes";

export default function page() {
  const { types, error, isLoading } = useTypes();
  if (isLoading) {
    return (
      <div className="p-8">
        <div>Loading Car types...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div>Error loading car types</div>
      </div>
    );
  }
  return (
    <div className="p-8">
      <TableHeader
        title="Car types"
        linkTitle="Add Car type"
        href="/dashboard/car-types/new"
        data={types}
        model="carType"
      />
      <div className="py-8">
        <DataTable data={types

        } columns={columns} />
      </div>
    </div>
  );
}
