"use client";
import CarModelForm from "@/components/Forms/create-model-form";
import { useModels } from "@/hooks/useModels";
import React from "react";

export default function page() {
    const { createModel, isCreating } = useModels();
  return (
    <div className="p-8">
      <CarModelForm createModel={createModel}  />
    </div>
  );
}
