import { getModelById } from "@/actions/models";
import CategoryForm from "@/components/Forms/CategoryForm";
import CarModelForm from "@/components/Forms/create-model-form";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const category = await getModelById(id);
  return (
    <div className="p-8">
      <CarModelForm initialData={category} editingId={id} />
    </div>
  );
}
