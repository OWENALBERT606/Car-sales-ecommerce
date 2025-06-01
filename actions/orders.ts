"use server";

import { db } from "@/prisma/db";
import { MutationResponse, QueriesResponse } from "@/types/types";
import { Order, OrderItem, OrderStatus, PaymentMethod } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Create a new order
export async function createOrder(data: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<MutationResponse> {
  try {
    const newOrder = await db.order.create({data});

    revalidatePath("/dashboard/orders");
    return { success: true, data: newOrder };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create order" };
  }
}

// Get all orders
export async function getAllOrders(): Promise<QueriesResponse> {
  try {
    const orders = await db.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return { data: orders };
  } catch (error) {
    console.error(error);
    return { data: [], error: "Failed to fetch orders" };
  }
}

// Get a single order by ID
export async function getOrderById(id: string) {
  try {
    const order = await db.order.findUnique({
      where: { id },
      include: {
        items: true,
        user: true,
      },
    });

    return order;
  } catch (error) {
    console.error(error);
  }
}

// Update order by ID
export async function updateOrderById(id: string, data: Partial<Order>) {
  try {
    const updatedOrder = await db.order.update({
      where: { id },
      data,
    });

    revalidatePath("/dashboard/orders");
    return updatedOrder;
  } catch (error) {
    console.error(error);
  }
}

// Delete order by ID
export async function deleteOrder(id: string) {
  try {
    const deleted = await db.order.delete({
      where: { id },
    });

    return {
      ok: true,
      data: deleted,
    };
  } catch (error) {
    return {
      ok: false,
      error: "Failed to delete order",
    };
  }
}

