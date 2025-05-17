"use server";

import { db } from "@/prisma/db";
import {MutationResponse, ProductProps, QueriesResponse } from "@/types/types";
import {Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import toast from "react-hot-toast";

// create data
export async function createProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<MutationResponse> {
  try {
  
    const newProduct = await db.product.create({
      data,
    });
    revalidatePath("/dashboard/products");
    return { success: true, data:newProduct};
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create product"};
  }
}
// get all data
export async function getAllProducts():Promise<QueriesResponse>{
  try {
    const products = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },include:{
        make:true,
        category:true,
        type:true,
        year:true,
        model:true,
        fuel:true


      }
    });

    return { data: products};
  } catch (error) {
    return { data: [], error: "Failed to fetch products"};
  }
}
// update data
export async function updateProductById(id: string, data:any) {
  try {
    const updatedProduct = await db.product.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/products");
    return updatedProduct;
  } catch (error) {
    console.log(error);
  }
}
export async function getProductById(id: string) {
  try {
    const product = await db.product.findUnique({
      where: {
        id,
      }
    });
    return product;
  } catch (error) {
    console.log(error);
  }
}
// export async function deleteCategory(id: string) {
//   try {
//     const deletedCategory = await db.category.delete({
//       where: {
//         id,
//       },
//     });

//     return {
//       ok: true,
//       data: deletedCategory,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }

// delete data
export async function deleteProduct(id: string) {
  try {
    const deleted = await db.product.delete({
      where: {
        id,
      },
    });

    return {
      ok: true,
      data: deleted,
    };
  } catch (error) {
    // console.log(error);
    return {
      ok: false,
      error: "Failed to delete product"
    };
  }
}
// export async function createBulkProduct(product: ProductProps[]) {
//   try {
//     for (const product of products) {
//       await createProduct(product);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
