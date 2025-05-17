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
import FormSelectInput from "../FormInputs/FormSelectInput";
import { useProducts } from "@/hooks/useProducts";
import MultipleImageInput from "../FormInputs/MultipleImageInput";
import { useTypes } from "@/hooks/useTypes";
import { useYears } from "@/hooks/useYears";
import { useModels } from "@/hooks/useModels";
import { useMakes } from "@/hooks/useMake";
import { useFuels } from "@/hooks/useFuels";

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
      // name: initialData?.name
    },
  });
  const {createProduct}=useProducts();
  const router = useRouter();
  const {categories,isLoading} =useCategories();
  const {types} =useTypes();
  const {years} =useYears();
  const {models} =useModels();
  const {makes}=useMakes();
  const {fuels}=useFuels();

  const productStatus=[
    { label: "in stock", value:"IN_STOCK" },
    { label: "Out of stock", value: "OUT_OF_STOCK"},
    { label: "On Sale", value: "ON_SALE"}
  ]


  const productUsage=[
    { label: "used", value:"USED" },
    { label: "new", value: "NEW"}
  ]
  const productSteering=[
    { label: "left", value:"LEFT" },
    { label: "right", value: "RIGHT"}
  ]


  const categoriesData= categories.map((item:any,i:any)=>{
    return(
      {
        label:item.name,
        value:item.id
      }
    )
  })
  const yearsData= years.map((item:any,i:any)=>{
    return(
      {
        label:item.name,
        value:item.id
      }
    )
  })
  const modelsData= models.map((item:any,i:any)=>{
    return(
      {
        label:item.name,
        value:item.id
      }
    )
  })
  const typesData= types.map((item:any,i:any)=>{
    return(
      {
        label:item.name,
        value:item.id
      }
    )
  })
  // const steeringData= types.map((item:any,i:any)=>{
  //   return(
  //     {
  //       label:item.name,
  //       value:item.id
  //     }
  //   )
  // })
  const makesData= makes.map((item:any,i:any)=>{
    return(
      {
        label:item.name,
        value:item.id
      }
    )
  })
   const fuelsData= fuels.map((item:any,i:any)=>{
    return(
      {
        label:item.name,
        value:item.id
      }
    )
  })
  const statusData= productStatus.map((item:any,i:any)=>{
    return(
      {
        label:item.value,
        value:item.value
      }
    )
  })
  const usageData= productUsage.map((item:any,i:any)=>{
    return(
      {
        label:item.value,
        value:item.value
      }
    )
  })
  const steeringData= productSteering.map((item:any,i:any)=>{
    return(
      {
        label:item.value,
        value:item.value
      }
    )
  })


  const [loading, setLoading] = useState(false);
  // const [imageUrl, setImageUrl] = useState(initialImage);
  const [imageUrls, setImageUrls] = useState([""]);
  const initialImage = initialData?.imageUrl && initialData.imageUrl !== "" ? initialData.imageUrl : "/placeholder.svg";

    const [imageUrl, setImageUrl] = useState(initialImage);
  
  const [selectedCategory,setSelectedCategory]=useState<any>(categoriesData[0]);
  const [selectedType,setSelectedType]=useState<any>(typesData[0]);
  const [selectedYear,setSelectedYear]=useState<any>(yearsData[0]);
  const [selectedFuel,setSelectedFuel]=useState<any>(fuelsData[0]);
  const [selectedMake,setSelectedMake]=useState<any>(makesData[0]);
  const [selectedModel,setSelectedModel]=useState<any>(modelsData[0]);
  const [selectedUsage,setSelectedUsage]=useState<any>(usageData[0]);
  const [selectedStatus,setSelectedStatus]=useState<any>(statusData[0]);
  const [selectedSteering,setSelectedSteering]=useState<any>(steeringData[0]);


  async function saveData(data:any) {
    try {
      setLoading(true);
      data.categoryId=selectedCategory.value
      data.status = data.status ?? ProductStatus.IN_STOCK;
      data.rating = data.rating ?? 0;
      data.price=Number(data.price);
      data.qty=Number(data.qty);
      data.imageUrls = imageUrls;
      data.modelId=selectedModel.value;
      data.fuelId=selectedFuel.value;
      data.makeId=selectedMake.value;
      data.yearId=selectedYear.value;
      data.imageUrl=imageUrl;
      data.imageUrls=imageUrls;
      data.steering=selectedSteering.value
      data.typeId = selectedType.value;
      data.usage = selectedUsage.value;


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
      } else {
        createProduct(data);
        setLoading(false);
        reset();
        // Toast
        toast.success("Successfully Created!");
        //reset
        // setImageUrl("/placeholder.svg");
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
                    label="Quantity Available"
                    name="qty"
                    type="number"
                  />
                        
                         <FormSelectInput
                                  label="Product status"
                                  options={statusData}
                                  option={selectedStatus}
                                  setOption={setSelectedStatus}
                                />
                         <FormSelectInput
                                  label="Product year"
                                  options={yearsData}
                                  option={selectedYear}
                                  setOption={setSelectedYear}
                                />
                         <FormSelectInput
                                  label="Product Model"
                                  options={modelsData}
                                  option={selectedModel}
                                  setOption={setSelectedModel}
                                />
                         <FormSelectInput
                                  label="Product Steering"
                                  options={steeringData}
                                  option={selectedSteering}
                                  setOption={setSelectedSteering}
                                />
                         <FormSelectInput
                                  label="Product Type"
                                  options={typesData}
                                  option={selectedType}
                                  setOption={setSelectedType}
                                />
                         <FormSelectInput
                                  label="Product Fuel"
                                  options={fuelsData}
                                  option={selectedFuel}
                                  setOption={setSelectedFuel}
                                />
    
                         <FormSelectInput
                                  label="Category"
                                  options={categoriesData}
                                  option={selectedCategory}
                                  setOption={setSelectedCategory}
                                />
                  
                </div>
               
              </div>
               <TextArea
                    register={register}
                    errors={errors}
                    label="Product Description"
                    name="description"
                  />
            <div className="mt-4">
            <MultipleImageInput
              title="Other Product Images"
              imageUrls={imageUrls}
              setImageUrls={setImageUrls}
              endpoint="productImages"
              />
              
            </div>
            </CardContent>

          </Card>
        </div>
        <div className="lg:col-span-4 col-span-full ">
          <div className="grid auto-rows-max items-start gap-4 ">
                           <TextInput
                    register={register}
                    errors={errors}
                    label="Product Engine"
                    name="engine"
                  />
                                 <TextInput
                    register={register}
                    errors={errors}
                    label="Product Color"
                    name="color"
                  />
              <FormSelectInput
                                  label="Product make"
                                  options={makesData}
                                  option={selectedMake}
                                  setOption={setSelectedMake}
                                />
                         <FormSelectInput
                                  label="Product condition"
                                  options={usageData}
                                  option={selectedUsage}
                                  setOption={setSelectedUsage}
                                />
                                <div className="grid gap-3">
                 
                </div>
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
