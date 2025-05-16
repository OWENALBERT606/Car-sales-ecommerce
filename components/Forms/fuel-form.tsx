"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { generateSlug } from "@/lib/generateSlug";
import toast from "react-hot-toast";
import { Fuel } from "@prisma/client";

import FormHeader from "./FormHeader";
import TextInput from "../FormInputs/TextInput";
import FormFooter from "./FormFooter";
import { updateFuelById } from "@/actions/fuels";

type FuelFormProps = {
  editingId?: string;
  initialData?: Fuel | null;
  createFuel?: (data: Omit<Fuel, "id" | "createdAt" | "updatedAt">) => void;
};

export default function FuelForm({
  editingId,
  initialData,
  createFuel,
}: FuelFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: initialData?.name ?? "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function saveData(data: any) {
    try {
      setLoading(true);
      data.slug = generateSlug(data.name);

      if (editingId) {
        await updateFuelById(editingId, data);
        toast.success("Fuel type updated successfully!");
      } else {
        await createFuel?.(data);
        toast.success("Fuel type created successfully!");
      }

      reset();
      router.push("/dashboard/fuels");
    //   window.location.reload()
    
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(saveData)}>
      <FormHeader
        href="/fuels"
        parent=""
        title="Fuel Type"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-8 col-span-full space-y-3">
          <Card>
            <CardHeader>
              <CardTitle>Fuel Type Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Fuel Name"
                  name="name"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <FormFooter
        href="/fuels"
        editingId={editingId}
        loading={loading}
        title="Fuel Type"
        parent=""
      />
    </form>
  );
}
