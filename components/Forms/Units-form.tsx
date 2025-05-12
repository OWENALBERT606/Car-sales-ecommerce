// "use client";

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
import { CategoryProps, UnitProps } from "@/types/types";
import FormHeader from "./FormHeader";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";
import ImageInput from "../FormInputs/ImageInput";
import FormFooter from "./FormFooter";
import { createCategory, updateCategoryById } from "@/actions/categories";
import { updateUnitById } from "@/actions/units";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type CategoryFormProps = {
  editingId?: string | undefined;
  initialData?: Category | undefined | null;
  createUnit:any
};
export default function UnitForm({
  editingId,
  createUnit,
  initialData,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UnitProps>({
    defaultValues: {
      name: initialData?.name
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function saveData(data:UnitProps) {
    try {
      setLoading(true);
      data.slug = generateSlug(data.name);
     

      if (editingId) {
        await updateUnitById(editingId, data);
        setLoading(false);
        // Toast
        toast.success("Updated Successfully!");
        //reset
        reset();
        //route
        router.push("/dashboard/units");
      } else {
        createUnit(data);
        setLoading(false);
        console.log(data);
        toast.success("Successfully Created!");
        reset();
        router.push("/dashboard/units");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <form className="" onSubmit={handleSubmit(saveData)}>
      <FormHeader
        href="/units"
        parent=""
        title="Unit"
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
                    label="Unit name"
                    name="name"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Short name"
                    name="prefix"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <FormFooter
        href="/units"
        editingId={editingId}
        loading={loading}
        title="Unit"
        parent=""
      />
    </form>
  );
}
