"use server";

import { db } from "@/prisma/db";
import { MutationResponse, QueriesResponse } from "@/types/types";
import { Make } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Create a new make
export async function createMake(
  data: Omit<Make, "id" | "createdAt" | "updatedAt">
): Promise<MutationResponse> {
  const slug = data.slug;

  try {
    const existingMake = await db.make.findUnique({
      where: { slug },
    });

    if (existingMake) {
      return { success: true, data: existingMake };
    }

    const newMake = await db.make.create({ data });

    revalidatePath("/dashboard/makes");
    return { success: true, data: newMake };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create make" };
  }
}

// Get all makes
export async function getAllMakes(): Promise<QueriesResponse> {
  try {
    const makes = await db.make.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        products: true,
      },
    });

    return { data: makes };
  } catch (error) {
    return { data: [], error: "Failed to fetch makes" };
  }
}

// Update make by ID
export async function updateMakeById(id: string, data: Partial<Make>) {
  try {
    const updatedMake = await db.make.update({
      where: { id },
      data,
    });

    revalidatePath("/dashboard/makes");
    return updatedMake;
  } catch (error) {
    console.log(error);
  }
}

// Get a single make by ID
export async function getMakeById(id: string) {
  try {
    const make = await db.make.findUnique({
      where: { id },
    });

    return make;
  } catch (error) {
    console.log(error);
  }
}

// Delete make by ID
export async function deleteMake(id: string) {
  try {
    const deleted = await db.make.delete({
      where: { id },
    });

    return {
      ok: true,
      data: deleted,
    };
  } catch (error) {
    return {
      ok: false,
      error: "Failed to delete make",
    };
  }
}

// Bulk create makes
export async function createBulkMakes(
  makes: Omit<Make, "id" | "createdAt" | "updatedAt">[]
) {
  try {
    for (const make of makes) {
      await createMake(make);
    }
  } catch (error) {
    console.log(error);
  }
}
