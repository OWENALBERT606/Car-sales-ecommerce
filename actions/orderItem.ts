"use server";

import { db } from "@/prisma/db";
import { MutationResponse, QueriesResponse } from "@/types/types";
import { OrderItem } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Create a new order item
export async function createOrderItem(
  data: Omit<OrderItem, "id" | "createdAt" | "updatedAt" | "total">
): Promise<MutationResponse> {
  try {
    const newItem = await db.orderItem.create({data});
    return { success: true, data: newItem };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create order item" };
  }
}

// Get all order items
export async function getAllOrderItems(): Promise<QueriesResponse> {
  try {
    const items = await db.orderItem.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        product: true,
        order: true,
      },
    });

    return { data: items };
  } catch (error) {
    console.error(error);
    return { data: [], error: "Failed to fetch order items" };
  }
}

// Get order item by ID
export async function getOrderItemById(id: string) {
  try {
    const item = await db.orderItem.findUnique({
      where: { id },
      include: {
        product: true,
        order: true,
      },
    });

    return item;
  } catch (error) {
    console.error(error);
  }
}

// Update order item by ID
export async function updateOrderItemById(id: string, data: Partial<OrderItem>) {
  try {
    if (data.quantity && data.unitPrice) {
      data.total = data.quantity * data.unitPrice;
    }

    const updatedItem = await db.orderItem.update({
      where: { id },
      data,
    });

    revalidatePath("/dashboard/orders");
    return updatedItem;
  } catch (error) {
    console.error(error);
  }
}

// Delete order item by ID
export async function deleteOrderItem(id: string) {
  try {
    const deleted = await db.orderItem.delete({
      where: { id },
    });

    return {
      ok: true,
      data: deleted,
    };
  } catch (error) {
    return {
      ok: false,
      error: "Failed to delete order item",
    };
  }
}

// Bulk create makes
export async function createBulkOrderItems(
  orderItems: Omit<OrderItem, "id" | "createdAt" | "updatedAt">[]
) {
  try {
    for (const orderItem of orderItems) {
      await createOrderItem(orderItem);
    }
  } catch (error) {
    console.log(error);
  }
}
