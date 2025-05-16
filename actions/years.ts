"use server";

import { db } from "@/prisma/db";
import { MutationResponse, QueriesResponse } from "@/types/types";
import { Year } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Create a car year
export async function createYear(data: Omit<Year, "id" | "createdAt" | "updatedAt">): Promise<MutationResponse> {
  const slug = data.slug;

  try {
    const existingYear = await db.year.findUnique({
      where: { slug },
    });

    if (existingYear) {
      return { success: true, data: existingYear };
    }

    const newYear = await db.year.create({ data });

    revalidatePath("/dashboard/car-years");
    return { success: true, data: newYear };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create car year" };
  }
}

// Get all car years
export async function getAllYears(): Promise<QueriesResponse> {
  try {
    const years = await db.year.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        products: true,
      },
    });

    return { data: years };
  } catch (error) {
    return { data: [], error: "Failed to fetch car years" };
  }
}

// Update car year by ID
export async function updateYearById(id: string, data: Partial<Year>) {
  try {
    const updatedYear = await db.year.update({
      where: { id },
      data,
    });

    revalidatePath("/dashboard/car-years");
    return updatedYear;
  } catch (error) {
    console.log(error);
  }
}

// Get a single year by ID
export async function getYearById(id: string) {
  try {
    const year = await db.year.findUnique({
      where: { id },
    });

    return year;
  } catch (error) {
    console.log(error);
  }
}

// Delete a car year
export async function deleteYear(id: string) {
  try {
    const deleted = await db.year.delete({
      where: { id },
    });

    return {
      ok: true,
      data: deleted,
    };
  } catch (error) {
    return {
      ok: false,
      error: "Failed to delete car year",
    };
  }
}

// Bulk create years
export async function createBulkYears(years: Omit<Year, "id" | "createdAt" | "updatedAt">[]) {
  try {
    for (const year of years) {
      await createYear(year);
    }
  } catch (error) {
    console.log(error);
  }
}
