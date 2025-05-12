"use client"
import UnitForm from "@/components/Forms/Units-form";
import { useUnits } from "@/hooks/useUnits";
import React from "react";

export default function page() {
   const { createUnit, isCreating } = useUnits();
  
  return (
    <div className="p-8">
      <UnitForm createUnit={createUnit}/>
    </div>
  );
}
