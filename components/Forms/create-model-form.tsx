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
import { Model } from "@prisma/client";

import FormHeader from "./FormHeader";
import TextInput from "../FormInputs/TextInput";
import FormFooter from "./FormFooter";
import { updateModelById } from "@/actions/models";


type CarModelFormProps = {
  editingId?: string;
  initialData?: Model | null;
  createModel?: (data: Omit<Model, "id" | "createdAt" | "updatedAt">) => void;
};

export default function CarModelForm({
  editingId,
  initialData,
  createModel,
}: CarModelFormProps) {
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
        await updateModelById(editingId, data);
        toast.success("Updated successfully!");
      } else {
        await createModel?.(data);
        toast.success("Created successfully!");
      }

      reset();
      router.push("/dashboard/models");
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
        href="/models"
        parent=""
        title="Car Model"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-8 col-span-full space-y-3">
          <Card>
            <CardHeader>
              <CardTitle>Car Model Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Model Name"
                  name="name"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <FormFooter
        href="/models"
        editingId={editingId}
        loading={loading}
        title="Car Model"
        parent=""
      />
    </form>
  );
}
