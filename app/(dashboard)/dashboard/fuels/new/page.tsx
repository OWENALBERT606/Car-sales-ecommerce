"use client";
import FuelForm from "@/components/Forms/fuel-form";
import CarYearForm from "@/components/Forms/years-form";
import { useFuels } from "@/hooks/useFuels";
import React from "react";

export default function page() {
    const { createFuel, isCreating } = useFuels();
  return (
    <div className="p-8">
      <FuelForm createFuel={createFuel}  />
    </div>
  );
}
