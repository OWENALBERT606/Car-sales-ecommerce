"use client";

import { createFuel, deleteFuel, getAllFuels } from "@/actions/fuels";
import { Fuel } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useFuels() {
  const queryClient = useQueryClient();

  // Query for fetching all fuels
  const fuelsQuery = useQuery({
    queryKey: ["fuels"],
    queryFn: getAllFuels,
  });

  // Create fuel mutation
  const createFuelMutation = useMutation({
    mutationFn: createFuel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fuels"] });
    },
  });

  // Delete fuel mutation
  const deleteFuelMutation = useMutation({
    mutationFn: deleteFuel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fuels"] });
    },
  });

  return {
    // Queries
    fuels: fuelsQuery.data?.data ?? [],
    isLoading: fuelsQuery.isLoading,
    error: fuelsQuery.error || fuelsQuery.data?.error,

    // Mutations
    createFuel: createFuelMutation.mutate,
    deleteFuel: deleteFuelMutation.mutate,

    // Mutation states
    isCreating: createFuelMutation.isPending,
    isDeleting: deleteFuelMutation.isPending,
  };
}
