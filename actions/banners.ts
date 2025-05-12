"use server";

import { db } from "@/prisma/db";
import { BannerProps, CategoryProps, MutationResponse, QueriesResponse } from "@/types/types";
import { Banner, Category } from "@prisma/client";
import { revalidatePath } from "next/cache";
import toast from "react-hot-toast";

// create data
export async function createBanner(data: Omit<Banner, "id" | "createdAt" | "updatedAt">): Promise<MutationResponse> {
  try {
    const newBanner = await db.banner.create({
      data,
    });
    revalidatePath("/dashboard/banners");
    return { success: true, data:newBanner};
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create banner"};
  }
}
// get all data
export async function getAllBanners():Promise<QueriesResponse>{
  try {
    const banners = await db.banner.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include:{
        category:true
      }
    });

    return { data: banners};
  } catch (error) {
    return { data: [], error: "Failed to fetch banners"};
  }
}
// update data
export async function updateBannerById(id: string, data: BannerProps) {
  try {
    const updatedBanner = await db.banner.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/banners");
    return updatedBanner;
  } catch (error) {
    console.log(error);
  }
}
export async function getBannerById(id: string) {
  try {
    const banner = await db.banner.findUnique({
      where: {
        id,
      },
    });
    return banner;
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
export async function deleteBanner(id: string) {
  try {
    const deleted = await db.banner.delete({
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
      error: "Failed to delete banner"
    };
  }
}
export async function createBulkBanners(banners: BannerProps[]) {
  try {
    for (const banner of banners) {
      await createBanner(banner);
    }
  } catch (error) {
    console.log(error);
  }
}
