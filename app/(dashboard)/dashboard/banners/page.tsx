"use client"
import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { useBanners } from "@/hooks/useBanners";

export default function page() {
  const {banners,error,isLoading}=useBanners();
  
  
  if (isLoading) {
    return (
      <div className="p-8">
        <div>Loading banners...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div>Error loading banners</div>
      </div>
    );
  }
 
  return (
    <div className="p-8">
      <TableHeader
        title="Banners"
        linkTitle="Add Banner"
        href="/dashboard/banners/new"
        data={banners}
        model="banner"
      />
      <div className="py-8">
        <DataTable data={banners} columns={columns} />
      </div>
    </div>
  );
}
