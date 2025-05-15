"use client";
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

import toast from "react-hot-toast";
import {Banner, Product, ProductStatus } from "@prisma/client";
import {BannerProps, ProductProps } from "@/types/types";
import FormHeader from "./FormHeader";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";
import ImageInput from "../FormInputs/ImageInput";
import FormFooter from "./FormFooter";
import { useCategories } from "@/hooks/useCategories";
import { updateProductById } from "@/actions/products";
import FormSelectInput from "../FormInputs/FormSelectInput";
import { useProducts } from "@/hooks/useProducts";
import MultipleImageInput from "../FormInputs/MultipleImageInput";
import { useBanners } from "@/hooks/useBanners";
import { updateBannerById } from "@/actions/banners";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type BannerFormProps = {
  editingId?: string | undefined;
  initialData?: Banner | undefined | null;

};
export default function CreateBannerForm({
  editingId,
  initialData,
}: BannerFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BannerProps>({
    defaultValues: {
      title: initialData?.title
    },
  });
  const {createBanner}=useBanners();
  const router = useRouter();
  const {categories,isLoading} =useCategories();
  
  const categoriesData= categories.map((item:any,i:any)=>{
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
  const [selectedCategory,setSelectedCategory]=useState<any>(categoriesData[0])


  async function saveData(data: BannerProps) {
    try {
      setLoading(true);
      data.imageUrl = imageUrl??"";
      data.categoryId=selectedCategory.value;


      console.log(data);

      if (editingId) {
        await updateBannerById(editingId, data);
        setLoading(false); 
        // Toast
        toast.success("Updated Successfully!");
        //reset
        reset();
        //route
        router.push("/dashboard/banners");
        setImageUrl("/placeholder.svg");
      } else {
        createBanner(data);
        setLoading(false);
        reset();
        // Toast
        toast.success("Successfully Created!");
        //reset
        setImageUrl("/placeholder.svg");
        //route
        router.push("/dashboard/banners");
      }
    } catch (error) {
      setLoading(false);
      // console.log(error);
    }
  }
 

  return (
    <form className="" onSubmit={handleSubmit(saveData)}>
      <FormHeader
        href="/banners"
        parent=""
        title="Banner"
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
                <div className="grid md:grid-cols-2 gap-3">
                <TextInput
                    register={register}
                    errors={errors}
                    label="Banner title"
                    name="title"
                  />
                         <FormSelectInput
                                  label="Category"
                                  options={categoriesData}
                                  option={selectedCategory}
                                  setOption={setSelectedCategory}
                                />
                </div>
                <div className="grid gap-3">
                  <TextArea
                    register={register}
                    errors={errors}
                    label="Banner Description"
                    name="description"
                  />
                </div>
              </div>
            </CardContent>

          </Card>
        </div>
        <div className="lg:col-span-4 col-span-full ">
          <div className="grid auto-rows-max items-start gap-4 ">
            <ImageInput
              title="Banner Image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="bannerImage"
            />
          </div>
        </div>
      </div>
      <FormFooter
        href="/banners"
        editingId={editingId}
        loading={loading}
        title="Banner"
        parent=""
      />
    </form>
  );
}
