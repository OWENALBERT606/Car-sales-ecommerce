"use server";

import { db } from "@/prisma/db";
import { MutationResponse, QueriesResponse } from "@/types/types";
import { Fuel } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Create a fuel
export async function createFuel(data: Omit<Fuel, "id" | "createdAt" | "updatedAt">): Promise<MutationResponse> {
  const slug = data.slug;

  try {
    const existingFuel = await db.fuel.findUnique({
      where: { slug },
    });

    if (existingFuel) {
      return { success: true, data: existingFuel };
    }

    const newFuel = await db.fuel.create({ data });

    revalidatePath("/dashboard/fuels");
    return { success: true, data: newFuel };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create fuel" };
  }
}

// Get all fuels
export async function getAllFuels(): Promise<QueriesResponse> {
  try {
    const fuels = await db.fuel.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        products: true,
      },
    });

    return { data: fuels };
  } catch (error) {
    return { data: [], error: "Failed to fetch fuels" };
  }
}

// Update fuel by ID
export async function updateFuelById(id: string, data: Partial<Fuel>) {
  try {
    const updatedFuel = await db.fuel.update({
      where: { id },
      data,
    });

    revalidatePath("/dashboard/fuels");
    return updatedFuel;
  } catch (error) {
    console.log(error);
  }
}

// Get a single fuel by ID
export async function getFuelById(id: string) {
  try {
    const fuel = await db.fuel.findUnique({
      where: { id },
    });

    return fuel;
  } catch (error) {
    console.log(error);
  }
}

// Delete a fuel
export async function deleteFuel(id: string) {
  try {
    const deleted = await db.fuel.delete({
      where: { id },
    });

    return {
      ok: true,
      data: deleted,
    };
  } catch (error) {
    return {
      ok: false,
      error: "Failed to delete fuel",
    };
  }
}

// Bulk create fuels
export async function createBulkFuels(fuels: Omit<Fuel, "id" | "createdAt" | "updatedAt">[]) {
  try {
    for (const fuel of fuels) {
      await createFuel(fuel);
    }
  } catch (error) {
    console.log(error);
  }
}
