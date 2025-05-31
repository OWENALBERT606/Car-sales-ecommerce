"use client";

import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
} from "@/actions/orders";
import { Order } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useOrders() {
  const queryClient = useQueryClient();

  // Fetch all orders
  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
    select: (res) => res.data,
  });

  // Create order
  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  // Delete order
  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  // Update order
  const updateOrderMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Order> }) =>
      updateOrderById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return {
    // Queries
    orders: ordersQuery.data ?? [],
    isLoading: ordersQuery.isLoading,
    error: ordersQuery.error || null,

    // Mutations
    createOrder: createOrderMutation.mutate,
    deleteOrder: deleteOrderMutation.mutate,
    updateOrder: updateOrderMutation.mutate,

    // Mutation states
    isCreating: createOrderMutation.isPending,
    isDeleting: deleteOrderMutation.isPending,
    isUpdating: updateOrderMutation.isPending,
  };
}
