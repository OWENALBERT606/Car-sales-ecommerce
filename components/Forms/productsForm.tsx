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

import { generateSlug } from "@/lib/generateSlug";
import toast from "react-hot-toast";
import { Category, Product, ProductStatus } from "@prisma/client";
import { CategoryProps, ProductProps } from "@/types/types";
import FormHeader from "./FormHeader";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";
import ImageInput from "../FormInputs/ImageInput";
import FormFooter from "./FormFooter";
import { useCategories } from "@/hooks/useCategories";
import { updateProductById } from "@/actions/products";
import { useFarms } from "@/hooks/useFarms";
import { useUnits } from "@/hooks/useUnits";
import FormSelectInput from "../FormInputs/FormSelectInput";
import { useProducts } from "@/hooks/useProducts";
import MultipleImageInput from "../FormInputs/MultipleImageInput";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type ProductFormProps = {
  editingId?: string | undefined;
  initialData?: Product | undefined | null;

};
export default function ProductForm({
  editingId,
  initialData,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductProps>({
    defaultValues: {
      name: initialData?.name
    },
  });
  const {createProduct}=useProducts();
  const router = useRouter();
  const {categories,isLoading} =useCategories();
  const {farms} =useFarms();
  const {units} =useUnits();
  const producTypes=[
    { label: "Local", value:"LOCAL" },
    { label: "Organic", value: "ORGANIC"},
  ]
  

  const farmsData= farms.map((item:any,i:any)=>{
    return(
      {
        label:item.name,
        value:item.id
      }
    )
  })

  const unitsData= units.map((item:any,i:any)=>{
    return(
      {
        label:item.name,
        value:item.id
      }
    )
  })
  const categoriesData= categories.map((item:any,i:any)=>{
    return(
      {
        label:item.name,
        value:item.id
      }
    )
  })
  const TypesData= producTypes.map((item:any,i:any)=>{
    return(
      {
        label:item.value,
        value:item.value
      }
    )
  })


  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/placeholder.svg";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [imageUrls, setImageUrls] = useState([""]);
  
  const [selectedCategory,setSelectedCategory]=useState<any>(categoriesData[0]);
  const [selectedUnit,setSelectedUnit]=useState<any>(unitsData[0]);
  const [selectedFarm,setSelectedFarm]=useState<any>(farmsData[0]);
  const [selectedType,setSelectedType]=useState<any>(TypesData[0]);


  async function saveData(data: ProductProps) {
    try {
      setLoading(true);
      data.imageUrl = imageUrl??"";
      data.unitId=selectedUnit.value;
      data.categoryId=selectedCategory.value;
      data.farmId=selectedFarm.value;
      data.type=selectedType.value
      data.status = data.status ?? ProductStatus.IN_STOCK;
      data.rating = data.rating ?? 0; // just in case
      data.price=Number(data.price);
      data.discountedPrice=Number(data.discountedPrice);
      data.imageUrls = imageUrls;


      console.log(data);

      if (editingId) {
        await updateProductById(editingId, data);
        setLoading(false); 
        // Toast
        toast.success("Updated Successfully!");
        //reset
        reset();
        //route
        router.push("/dashboard/products");
        setImageUrl("/placeholder.svg");
      } else {
        createProduct(data);
        setLoading(false);
        reset();
        // Toast
        toast.success("Successfully Created!");
        //reset
        setImageUrl("/placeholder.svg");
        //route
        router.push("/dashboard/products");
      }
    } catch (error) {
      setLoading(false);
      // console.log(error);
    }
  }
 

  return (
    <form className="" onSubmit={handleSubmit(saveData)}>
      <FormHeader
        href="/products"
        parent=""
        title="Product"
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
                    label="Product Name"
                    name="name"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Product Price"
                    name="price"
                    type="number"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Product Discounted Price"
                    name="discountedPrice"
                    type="number"
                  />
                         <FormSelectInput
                                  label="Unit"
                                  options={unitsData}
                                  option={selectedUnit}
                                  setOption={setSelectedUnit}
                                  toolTipText="Add New Unit"
                                  href="/dashboard/units/new"
                                />
                         <FormSelectInput
                                  label="Product Type"
                                  options={TypesData}
                                  option={selectedType}
                                  setOption={setSelectedType}
                                />
                         <FormSelectInput
                                  label="Farm"
                                  options={farmsData}
                                  option={selectedFarm}
                                  setOption={setSelectedFarm}
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
                    label="Product Description"
                    name="description"
                  />
                </div>
              </div>
            <div className="mt-4">
            <MultipleImageInput
              title="Other Product Images"
              imageUrls={imageUrls}
              setImageUrls={setImageUrls}
              endpoint="productMultipleImages"
              />
            </div>
            </CardContent>

          </Card>
        </div>
        <div className="lg:col-span-4 col-span-full ">
          <div className="grid auto-rows-max items-start gap-4 ">
            <ImageInput
              title="Product Image Image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="productImage"
            />
          </div>
        </div>
      </div>
      <FormFooter
        href="/products"
        editingId={editingId}
        loading={loading}
        title="Product"
        parent=""
      />
    </form>
  );
}
