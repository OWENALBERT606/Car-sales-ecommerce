"use client"
import CarTypeForm from "@/components/Forms/car-type-form";
import CategoryForm from "@/components/Forms/CategoryForm";
import { useCategories } from "@/hooks/useCategories";
import { useTypes } from "@/hooks/useTypes";
import React from "react";

export default function page() {
    const { createType, isCreating } = useTypes();
  return (
    <div className="p-8">
      <CarTypeForm createType={createType}  />
    </div>
  );
}
