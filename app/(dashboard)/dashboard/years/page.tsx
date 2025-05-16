"use client";

import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { useYears } from "@/hooks/useYears";

export default function Page() {
  const { years, error, isLoading } = useYears();

  if (isLoading) {
    return (
      <div className="p-8">
        <div>Loading Car years...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div>Error loading car years</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <TableHeader
        title="Car Years"
        linkTitle="Add year"
        href="/dashboard/years/new"
        data={years}
        model="year"
      />
      <div className="py-8">
        <DataTable data={years} columns={columns} />
      </div>
    </div>
  );
}
