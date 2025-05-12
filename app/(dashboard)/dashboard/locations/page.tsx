"use client"
import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { useLocations } from "@/hooks/useLocations";

export default function page() {
  const {locations ,error,isLoading}=useLocations();
  if (isLoading) {
    return (
      <div className="p-8">
        <div>Loading locations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div>Error loading locations</div>
      </div>
    );
  }
 
  return (
    <div className="p-8">
      <TableHeader
        title="Locations"
        linkTitle="Add location"
        href="/dashboard/locations/new"
        data={locations}
        model="location"
      />
      <div className="py-8">
        <DataTable data={locations} columns={columns} />
      </div>
    </div>
  );
}
