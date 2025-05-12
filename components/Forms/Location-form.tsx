"use client"

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
import { Location } from "@prisma/client";
import {  LocationProps } from "@/types/types";
import FormHeader from "./FormHeader";
import TextInput from "../FormInputs/TextInput";
import FormFooter from "./FormFooter";
import { useLocations } from "@/hooks/useLocations";
import { updateLocationById } from "@/actions/locations";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type LocationFormProps = {
  editingId?: string | undefined;
  initialData?: Location | undefined | null;
};
export default function LocationForm({
  editingId,
  initialData,
}: LocationFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LocationProps>({
    defaultValues: {
      name: initialData?.name
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);

    const { createLocation, isCreating } = useLocations();

  async function saveData(data:LocationProps) {
    try {
      setLoading(true);
      data.slug = generateSlug(data.name);
      console.log(data);

      if (editingId) {
        await updateLocationById(editingId, data);
        setLoading(false);
        // Toast
        toast.success("Updated Successfully!");
        //reset
        reset();
        //route
        router.push("/dashboard/locations")
      } else {
        createLocation(data);
        console.log(data);
        setLoading(false);
        // Toast
        toast.success("Successfully Created!");
        //reset
        reset();
        //route
        router.push("/dashboard/locations");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveData)}>
      <FormHeader
        href="/locations"
        parent=""
        title="Location"
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
                    label="District Name"
                    name="name"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <FormFooter
        href="/locations"
        editingId={editingId}
        loading={loading}
        title="Location"
        parent=""
      />
    </form>
  );
}
