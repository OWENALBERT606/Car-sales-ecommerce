"use client";


import { createMake, deleteMake, getAllMakes, getMakeById } from "@/actions/make";
import { Make } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useMakes() {
  const queryClient = useQueryClient();

  // Query for fetching all makes
  const makesQuery = useQuery({
    queryKey: ["makes"],
    queryFn: getAllMakes,
  });

  // Create make mutation
  const createMakeMutation = useMutation({
    mutationFn: createMake,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["makes"] });
    },
  });

  // Delete make mutation
  const deleteMakeMutation = useMutation({
    mutationFn: deleteMake,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["makes"] });
    },
  });

  return {
    // Queries
    makes: makesQuery.data?.data ?? [],
    isLoading: makesQuery.isLoading,
    error: makesQuery.error || makesQuery.data?.error,

    // Mutations
    createMake: createMakeMutation.mutate,
    deleteMake: deleteMakeMutation.mutate,

    // Mutation states
    isCreating: createMakeMutation.isPending,
    isDeleting: deleteMakeMutation.isPending,
  };
}

// Optional: Hook for fetching a single make by ID
export function useMake(id: string) {
  const makeQuery = useQuery({
    queryKey: ["make", id],
    queryFn: () => getMakeById(id),
    select: (response) => ({
      make: response,
    }),
  });

  return {
    make: makeQuery.data?.make,
    error: makeQuery.error,
    isLoading: makeQuery.isLoading,
  };
}
