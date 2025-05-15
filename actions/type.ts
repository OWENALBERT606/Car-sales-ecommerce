"use server";

import { db } from "@/prisma/db";
import { MutationResponse, QueriesResponse } from "@/types/types";
import { Type } from "@prisma/client";
import { revalidatePath } from "next/cache";

// create data
export async function createType(data: Omit<Type, "id" | "createdAt" | "updatedAt">): Promise<MutationResponse> {
  const slug = data.slug;
  try {
    const existingType = await db.type.findUnique({
      where: {
        slug,
      },
    });
    if (existingType) {
      return { success: true, data: existingType };
    }
    const newType = await db.type.create({
      data,
    });
    revalidatePath("/dashboard/types");
    return { success: true, data: newType };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create type" };
  }
}

// get all data
export async function getAllTypes(): Promise<QueriesResponse> {
  try {
    const types = await db.type.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        products: true,
      },
    });

    return { data: types };
  } catch (error) {
    return { data: [], error: "Failed to fetch types" };
  }
}

// update data
export async function updateTypeById(id: string, data: Partial<Type>) {
  try {
    const updatedType = await db.type.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/types");
    return updatedType;
  } catch (error) {
    console.log(error);
  }
}

// get by id
export async function getTypeById(id: string) {
  try {
    const type = await db.type.findUnique({
      where: {
        id,
      },
    });
    return type;
  } catch (error) {
    console.log(error);
  }
}

// delete data
export async function deleteType(id: string) {
  try {
    const deleted = await db.type.delete({
      where: {
        id,
      },
    });

    return {
      ok: true,
      data: deleted,
    };
  } catch (error) {
    return {
      ok: false,
      error: "Failed to delete type",
    };
  }
}

// bulk create
export async function createBulkTypes(types: Omit<Type, "id" | "createdAt" | "updatedAt">[]) {
  try {
    for (const type of types) {
      await createType(type);
    }
  } catch (error) {
    console.log(error);
  }
}
