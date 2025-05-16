import { getProductById } from "@/actions/products";
import ProductForm from "@/components/Forms/productsForm";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const category = await getProductById(id);
  return (
    <div className="p-8">
      <ProductForm initialData={category} editingId={id} />
    </div>
  );
}
