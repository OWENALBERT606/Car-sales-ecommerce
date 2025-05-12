"use server";

import { db } from "@/prisma/db";
import { CategoryProps, MutationResponse, QueriesResponse, UnitProps } from "@/types/types";
import { Category, Unit } from "@prisma/client";
import { revalidatePath } from "next/cache";


// create data
export async function createUnit(data: Omit<Unit, "id" | "createdAt" | "updatedAt">): Promise<MutationResponse> {
  const slug = data.slug;
  try {
    const existingUnit = await db.unit.findUnique({
      where: {
        slug,
      },
    });
    if (existingUnit) {
      return { success: true, data:existingUnit};
    }
    const newUnit = await db.unit.create({
      data,
    });
    revalidatePath("/dashboard/units");
    return { success: true, data:newUnit};
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create unit"};
  }
}
// get all data
export async function getAllUnits():Promise<QueriesResponse>{
  try {
    const units = await db.unit.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include:{
        products:true,
      }
    });

    return { data: units};
  } catch (error) {
    return { data: [], error: "Failed to fetch units"};
  }
}
// update data
export async function updateUnitById(id: string, data: UnitProps) {
  try {
    const updatedUnit = await db.unit.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/units");
    return updatedUnit;
  } catch (error) {
    console.log(error);
  }
}
export async function getUnitById(id: string) {
  try {
    const unit = await db.unit.findUnique({
      where: {
        id,
      },
    });
    return unit;
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
export async function deleteUnit(id: string) {
  try {
    const deleted = await db.unit.delete({
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
      error: "Failed to delete units"
    };
  }
}
// create bulk data
// export async function createBulkUnits(units: UnitProps[]) {
//   try {
//     for (const unit of units) {
//       await createUnit(unit);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
