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
import { Category } from "@prisma/client";
import { CategoryProps, FarmProps } from "@/types/types";
import FormHeader from "./FormHeader";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";
import ImageInput from "../FormInputs/ImageInput";
import FormFooter from "./FormFooter";
import { createCategory, updateCategoryById } from "@/actions/categories";
import { useCategories } from "@/hooks/useCategories";
import { updateFarmById } from "@/actions/farms";
import { useFarms } from "@/hooks/useFarms";
import { useLocations } from "@/hooks/useLocations";
import FormSelectInput from "../FormInputs/FormSelectInput";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type CategoryFormProps = {
  editingId?: string | undefined;
  initialData?: Category | undefined | null;
  session:any
};
export default function FarmForm({
  session,
  editingId,
  initialData,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FarmProps>({
    defaultValues: {
      name: initialData?.name
    },
  });
  const router = useRouter();
  const {locations ,error,isLoading}=useLocations();
  const locationsData= locations.map((item:any,i:any)=>{
    return(
      {
        label:item.name,
        value:item.id
      }
    )
  })

  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/placeholder.svg";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [selectedLocation,setSelectedLocation]=useState<any>(locations[0]);

    const { createFarm, isCreating } = useFarms();

  async function saveCategory(data:FarmProps) {
    try {
      setLoading(true);
      data.slug = generateSlug(data.name);
      data.ownerId=session.user.id;
      data.locationId=selectedLocation.value

      if (editingId) {
        await updateFarmById(editingId, data);
        setLoading(false);
        // Toast
        toast.success("Updated Successfully!");
        //reset
        reset();
        //route
        router.push("/dashboard/farms");
        setImageUrl("/placeholder.svg");
      } else {
        createFarm(data);
        console.log(data);
        setLoading(false);
        // Toast
        toast.success("Successfully Created!");
        //reset
        reset();
        //route
        router.push("/dashboard/farms");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveCategory)}>
      <FormHeader
        href="/farms"
        parent=""
        title="Farm"
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
                    label="Farm Name"
                    name="name"
                  />
                     <FormSelectInput
                label="Location"
                options={locationsData}
                option={selectedLocation}
                setOption={setSelectedLocation}
                toolTipText="Add New Location"
                href="/dashboard/locations/new"
              />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <FormFooter
        href="/categories"
        editingId={editingId}
        loading={loading}
        title="Category"
        parent=""
      />
    </form>
  );
}
