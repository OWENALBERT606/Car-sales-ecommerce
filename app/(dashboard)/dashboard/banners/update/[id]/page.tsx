// import { getCategoryById } from "@/actions/savings";
import { getBannerById } from "@/actions/banners";
import CreateBannerForm from "@/components/Forms/create-banner-form";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const banner = await getBannerById(id);
  return (
    <div className="p-8">
      <CreateBannerForm initialData={banner} editingId={id} />
    </div>
  );
}
