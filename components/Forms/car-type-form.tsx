"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { generateSlug } from "@/lib/generateSlug";
import toast from "react-hot-toast";
import { Category } from "@prisma/client";
import { CategoryProps } from "@/types/types";
import FormHeader from "./FormHeader";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";
import ImageInput from "../FormInputs/ImageInput";
import FormFooter from "./FormFooter";
import { createCategory, updateCategoryById } from "@/actions/categories";
import { useCategories } from "@/hooks/useCategories";
import { updateTypeById } from "@/actions/type";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type CarTypeFormProps = {
  editingId?: string | undefined;
  initialData?: Category | undefined | null;
  createType?:any
};
export default function CarTypeForm({
  editingId,
  createType,
  initialData,
}: CarTypeFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      name: initialData?.name
    },
  });
  const router = useRouter();
      
  const [loading, setLoading] = useState(false);
  async function saveData(data: any) {
    try {
      setLoading(true);
      data.slug = generateSlug(data.name);

      if (editingId) {
        await updateTypeById(editingId, data);
        setLoading(false);
        // Toast
        toast.success("Updated Successfully!");
        //reset
        reset();
        //route
        router.push("/dashboard/car-types");
      } else {
        createType(data);
        setLoading(false);
        // Toast
        toast.success("Successfully Created!");
        //reset
        reset();
        //route
        router.push("/dashboard/car-types");
        router.refresh;
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  console.log(status);

  return (
    <form className="" onSubmit={handleSubmit(saveData)}>
      <FormHeader
        href="/car-types"
        parent=""
        title="Car Type"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-8 col-span-full space-y-3">
          <Card>
            <CardHeader>
              <CardTitle></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Type Name"
                    name="name"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <FormFooter
        href="/car-types"
        editingId={editingId}
        loading={loading}
        title="Car Type"
        parent=""
      />
    </form>
  );
}
