"use server";

import { db } from "@/prisma/db";
import {FarmProps, MutationResponse, QueriesResponse } from "@/types/types";
import {Farm } from "@prisma/client";
import { revalidatePath } from "next/cache";
import toast from "react-hot-toast";

// create data
export async function createFarm(data: Omit<Farm, "id" | "createdAt" | "updatedAt">): Promise<MutationResponse> {
  const slug = data.slug;
  try {
    const existingFarm = await db.farm.findUnique({
      where: {
        slug,
      },
    });
    if (existingFarm) {
      return { success: true, data:existingFarm};
    }
    const newFarm = await db.farm.create({
      data,
    });
    revalidatePath("/dashboard/farms");
    return { success: true, data:newFarm};
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create farm"};
  }
}
// get all data
export async function getAllFarms():Promise<QueriesResponse>{
  try {
    const farms = await db.farm.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include:{
        products:true,
        owner:true
      }
    });

    return { data: farms};
  } catch (error) {
    return { data: [], error: "Failed to fetch farms"};
  }
}
// update data
export async function updateFarmById(id: string, data: FarmProps) {
  try {
    const updatedFarm = await db.farm.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/farms");
    return updatedFarm;
  } catch (error) {
    console.log(error);
  }
}
export async function getFarmById(id: string) {
  try {
    const farm = await db.farm.findUnique({
      where: {
        id,
      },
    });
    return farm;
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
export async function deleteFarm(id: string) {
  try {
    const deleted = await db.farm.delete({
      where: {
        id,
      },
    });

    return {
      ok: true,
      data: deleted,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: "Failed to delete farm"
    };
  }
}
export async function createBulkFarms(farms: FarmProps[]) {
  try {
    for (const farm of farms) {
      await createFarm(farm);
    }
  } catch (error) {
    console.log(error);
  }
}
