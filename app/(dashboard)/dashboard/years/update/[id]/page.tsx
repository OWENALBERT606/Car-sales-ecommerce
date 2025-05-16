
import { getYearById } from "@/actions/years";
import CategoryForm from "@/components/Forms/CategoryForm";
import CarYearForm from "@/components/Forms/years-form";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const category = await getYearById(id);
  return (
    <div className="p-8">
      <CarYearForm initialData={category} editingId={id} />
    </div>
  );
}
