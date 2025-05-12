"use client"
import React from "react";
import { columns } from "./columns";
import { Category } from "@prisma/client";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { useCategories } from "@/hooks/useCategories";
import { useFarms } from "@/hooks/useFarms";
import { useProducts } from "@/hooks/useProducts";

export default function page() {
  const {farms,error,isLoading}=useFarms();
  
  const {products}=useProducts();
  
  if (isLoading) {
    return (
      <div className="p-8">
        <div>Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div>Error loading products</div>
      </div>
    );
  }
 
  return (
    <div className="p-8">
      <TableHeader
        title="Products"
        linkTitle="Add Product"
        href="/dashboard/products/new"
        data={products}
        model="product"
      />
      <div className="py-8">
        <DataTable data={products} columns={columns} />
      </div>
    </div>
  );
}
