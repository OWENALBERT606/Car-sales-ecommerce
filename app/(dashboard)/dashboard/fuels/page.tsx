"use client";

import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { useYears } from "@/hooks/useYears";
import { useFuels } from "@/hooks/useFuels";

export default function Page() {
  const { fuels, error, isLoading } = useFuels();

  if (isLoading) {
    return (
      <div className="p-8">
        <div>Loading Fuels...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div>Error loading fuels</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <TableHeader
        title="fuel"
        linkTitle="Add Fuel"
        href="/dashboard/fuels/new"
        data={fuels}
        model="fuel"
      />
      <div className="py-8">
        <DataTable data={fuels} columns={columns} />
      </div>
    </div>
  );
}
