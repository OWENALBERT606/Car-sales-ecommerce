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
import { Year } from "@prisma/client";

import FormHeader from "./FormHeader";
import TextInput from "../FormInputs/TextInput";
import FormFooter from "./FormFooter";
import { updateYearById } from "@/actions/years";

type CarYearFormProps = {
  editingId?: string;
  initialData?: Year | null;
  createYear?: (data: Omit<Year, "id" | "createdAt" | "updatedAt">) => void;
};

export default function CarYearForm({
  editingId,
  initialData,
  createYear,
}: CarYearFormProps) {
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
        await updateYearById(editingId, data);
        toast.success("Year updated successfully!");
      } else {
        await createYear?.(data);
        toast.success("Year created successfully!");
      }

      reset();
      router.push("/dashboard/years");
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
        href="/years"
        parent=""
        title="Car Year"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-8 col-span-full space-y-3">
          <Card>
            <CardHeader>
              <CardTitle>Car Year Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Year Name"
                  name="name"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <FormFooter
        href="/years"
        editingId={editingId}
        loading={loading}
        title="Car Year"
        parent=""
      />
    </form>
  );
}
