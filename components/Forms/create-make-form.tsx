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
import { Make } from "@prisma/client";
import FormHeader from "./FormHeader";
import TextInput from "../FormInputs/TextInput";
import ImageInput from "../FormInputs/ImageInput";
import FormFooter from "./FormFooter";
import { updateMakeById } from "@/actions/make";

type MakeFormProps = {
  editingId?: string | undefined;
  initialData?: Make | undefined | null;
  createMake?: any;
};

export default function MakeForm({
  editingId,
  createMake,
  initialData,
}: MakeFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      name: initialData?.name,
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/placeholder.svg";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveMake(data: any) {
    try {
      setLoading(true);
      data.slug = generateSlug(data.name);
      data.imageUrl = imageUrl;

      if (editingId) {
        await updateMakeById(editingId, data);
        setLoading(false);
        toast.success("Make updated successfully!");
        reset();
        router.push("/dashboard/make");
        setImageUrl("/placeholder.svg");
      } else {
        createMake(data);
        setLoading(false);
        toast.success("Make created successfully!");
        reset();
        setImageUrl("/placeholder.svg");
        router.push("/dashboard/make");
        router.refresh;
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(saveMake)}>
      <FormHeader
        href="/make"
        parent=""
        title="Make"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-8 col-span-full space-y-3">
          <Card>
            <CardHeader>
              <CardTitle>Make Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Make Name"
                    name="name"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-4 col-span-full">
          <div className="grid auto-rows-max items-start gap-4">
            <ImageInput
              title="Make Image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="makeImage"
            />
          </div>
        </div>
      </div>

      <FormFooter
        href="/make"
        editingId={editingId}
        loading={loading}
        title="Make"
        parent=""
      />
    </form>
  );
}
