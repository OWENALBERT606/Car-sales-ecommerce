"use client";
import CarModelForm from "@/components/Forms/create-model-form";
import CarYearForm from "@/components/Forms/years-form";
import { useModels } from "@/hooks/useModels";
import { useYears } from "@/hooks/useYears";
import React from "react";

export default function page() {
    const { createYear, isCreating } = useYears();
  return (
    <div className="p-8">
      <CarYearForm createYear={createYear}  />
    </div>
  );
}
