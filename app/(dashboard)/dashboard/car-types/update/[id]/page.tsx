
import { getTypeById } from "@/actions/type";
import CarTypeForm from "@/components/Forms/car-type-form";
import CategoryForm from "@/components/Forms/CategoryForm";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const carType = await getTypeById(id);
  return (
    <div className="p-8">
      <CarTypeForm initialData={carType} editingId={id} />
    </div>
  );
}
