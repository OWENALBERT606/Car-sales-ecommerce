"use server";

import { db } from "@/prisma/db";
import { MutationResponse, QueriesResponse } from "@/types/types";
import { Model } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Create a car model
export async function createModel(data: Omit<Model, "id" | "createdAt" | "updatedAt">): Promise<MutationResponse> {
  const slug = data.slug;

  try {
    const existingModel = await db.model.findUnique({
      where: { slug },
    });

    if (existingModel) {
      return { success: true, data: existingModel };
    }

    const newModel = await db.model.create({ data });

    revalidatePath("/dashboard/car-models");
    return { success: true, data: newModel };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create car model" };
  }
}

// Get all car models
export async function getAllModels(): Promise<QueriesResponse> {
  try {
    const models = await db.model.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        products: true,
      },
    });

    return { data: models };
  } catch (error) {
    return { data: [], error: "Failed to fetch car models" };
  }
}

// Update car model by ID
export async function updateModelById(id: string, data: Partial<Model>) {
  try {
    const updatedModel = await db.model.update({
      where: { id },
      data,
    });

    revalidatePath("/dashboard/car-models");
    return updatedModel;
  } catch (error) {
    console.log(error);
  }
}

// Get a single model by ID
export async function getModelById(id: string) {
  try {
    const model = await db.model.findUnique({
      where: { id },
    });

    return model;
  } catch (error) {
    console.log(error);
  }
}

// Delete a car model
export async function deleteModel(id: string) {
  try {
    const deleted = await db.model.delete({
      where: { id },
    });

    return {
      ok: true,
      data: deleted,
    };
  } catch (error) {
    return {
      ok: false,
      error: "Failed to delete car model",
    };
  }
}

// Bulk create models
export async function createBulkModels(models: Omit<Model, "id" | "createdAt" | "updatedAt">[]) {
  try {
    for (const model of models) {
      await createModel(model);
    }
  } catch (error) {
    console.log(error);
  }
}
