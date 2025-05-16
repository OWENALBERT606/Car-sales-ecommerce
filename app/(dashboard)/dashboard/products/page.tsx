"use client"
import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { useProducts } from "@/hooks/useProducts";


export default function page() {
  
  const {products,isLoading}=useProducts();
  
  if (isLoading) {
    return (
      <div className="p-8">
        <div>Loading products...</div>
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
