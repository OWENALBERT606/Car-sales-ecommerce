"use client"
import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { useModels } from "@/hooks/useModels";

export default function page() {
  const { models, error, isLoading } = useModels();
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
        title="Car Models"
        linkTitle="Add model"
        href="/dashboard/models/new"
        data={models}
        model="model"
      />
      <div className="py-8">
        <DataTable data={models

        } columns={columns} />
      </div>
    </div>
  );
}
