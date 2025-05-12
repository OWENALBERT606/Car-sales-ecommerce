"use server";

import { db } from "@/prisma/db";
import {FarmProps, LocationProps, MutationResponse, QueriesResponse } from "@/types/types";
import {Farm, Location } from "@prisma/client";
import { revalidatePath } from "next/cache";
import toast from "react-hot-toast";

// create data
export async function createLocation(data: Omit<Location, "id" | "createdAt" | "updatedAt">): Promise<MutationResponse> {
  const slug = data.slug;
  try {
    const existingLocation = await db.location.findUnique({
      where: {
        slug,
      },
    });
    if (existingLocation) {
      return { success: true, data:existingLocation};
    }
    const newLocation = await db.location.create({
      data,
    });
    revalidatePath("/dashboard/locations");
    return { success: true, data:newLocation};
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create Location"};
  }
}
// get all data
export async function getAllLocations():Promise<QueriesResponse>{
  try {
    const locations = await db.location.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include:{
        farms:true,
        users:true
      }
    });

    return { data: locations};
  } catch (error) {
    return { data: [], error: "Failed to fetch Locations"};
  }
}
// update data
export async function updateLocationById(id: string, data: LocationProps) {
  try {
    const updatedLocation = await db.location.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/locations");
    return updatedLocation;
  } catch (error) {
    console.log(error);
  }
}
export async function getLocationById(id: string) {
  try {
    const location = await db.location.findUnique({
      where: {
        id,
      },
    });
    return location;
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
export async function deleteLocation(id: string) {
  try {
    const deleted = await db.location.delete({
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
      error: "Failed to delete location"
    };
  }
}
// create bulk data
export async function createBulkLocations(locations: LocationProps[]) {
  try {
    for (const location of locations) {
      await createLocation(location);
    }
  } catch (error) {
    console.log(error);
  }
}
