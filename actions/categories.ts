"use server";

import { db } from "@/prisma/db";
import { CategoryProps, MutationResponse, QueriesResponse } from "@/types/types";
import { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";
import toast from "react-hot-toast";

// create data
export async function createCategory(data: Omit<Category, "id" | "createdAt" | "updatedAt">): Promise<MutationResponse> {
  const slug = data.slug;
  try {
    const existingCategory = await db.category.findUnique({
      where: {
        slug,
      },
    });
    if (existingCategory) {
      return { success: true, data:existingCategory};
    }
    const newCategory = await db.category.create({
      data,
    });
    revalidatePath("/dashboard/categories");
    return { success: true, data:newCategory};
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create category"};
  }
}
// get all data
export async function getAllCategories():Promise<QueriesResponse>{
  try {
    const categories = await db.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include:{
        products:true,
      }
    });

    return { data: categories};
  } catch (error) {
    return { data: [], error: "Failed to fetch categories"};
  }
}
// update data
export async function updateCategoryById(id: string, data: CategoryProps) {
  try {
    const updatedCategory = await db.category.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/categories");
    return updatedCategory;
  } catch (error) {
    console.log(error);
  }
}
export async function getCategoryById(id: string) {
  try {
    const category = await db.category.findUnique({
      where: {
        id,
      },
    });
    return category;
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
export async function deleteCategory(id: string) {
  try {
    const deleted = await db.category.delete({
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
      error: "Failed to delete category"
    };
  }
}
export async function createBulkCategories(categories: CategoryProps[]) {
  try {
    for (const category of categories) {
      await createCategory(category);
    }
  } catch (error) {
    console.log(error);
  }
}
