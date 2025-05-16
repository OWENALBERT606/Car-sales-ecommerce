import { getMakeById } from "@/actions/make";
import CategoryForm from "@/components/Forms/CategoryForm";
import MakeForm from "@/components/Forms/create-make-form";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const category = await getMakeById(id);
  return (
    <div className="p-8">
      <MakeForm initialData={category} editingId={id} />
    </div>
  );
}
