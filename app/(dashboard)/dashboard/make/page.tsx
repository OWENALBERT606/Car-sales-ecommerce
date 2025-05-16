"use client";
import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { useMakes } from "@/hooks/useMake";


export default function Page() {
  const { makes, error, isLoading } = useMakes();

  if (isLoading) {
    return (
      <div className="p-8">
        <p>loading .........</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div>Error loading makes</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <TableHeader
        title="Makes"
        linkTitle="Add Make"
        href="/dashboard/make/new"
        data={makes}
        model="make"
      />
      <div className="py-8">
        <DataTable data={makes} columns={columns} />
      </div>
    </div>
  );
}
