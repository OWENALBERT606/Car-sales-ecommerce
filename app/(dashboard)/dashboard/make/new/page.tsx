"use client"
import CategoryForm from "@/components/Forms/CategoryForm";
import MakeForm from "@/components/Forms/create-make-form";
import { useCategories } from "@/hooks/useCategories";
import { useMake, useMakes } from "@/hooks/useMake";
import React from "react";

export default function page() {
    const { createMake} = useMakes();
  return (
    <div className="p-8">
      <MakeForm createMake={createMake}/>
    </div>
  );
}
