"use client"
import CategoryForm from "@/components/Forms/CategoryForm";
import { useCategories } from "@/hooks/useCategories";
import React from "react";

export default function page() {
    const { createCategory, isCreating } = useCategories();
  return (
    <div className="p-8">
      <CategoryForm createCategory={createCategory}  />
    </div>
  );
}
