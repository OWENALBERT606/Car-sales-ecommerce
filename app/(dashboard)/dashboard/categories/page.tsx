"use client"
import React from "react";
import { columns } from "./columns";
import { Category } from "@prisma/client";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { getAllCategories } from "@/actions/categories";
import { useCategories } from "@/hooks/useCategories";

export default function page() {
  const { categories, error, isLoading } = useCategories();
  if (isLoading) {
    return (
      <div className="p-8">
        <div>Loading categories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div>Error loading categories</div>
      </div>
    );
  }
  return (
    <div className="p-8">
      <TableHeader
        title="Categories"
        linkTitle="Add Category"
        href="/dashboard/categories/new"
        data={categories}
        model="category"
      />
      <div className="py-8">
        <DataTable data={categories} columns={columns} />
      </div>
    </div>
  );
}
