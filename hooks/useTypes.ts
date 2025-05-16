// app/hooks/useTypes.ts
"use client";

import { createType, deleteType, getAllTypes, getTypeById } from "@/actions/type";
// import { createType, deleteType, getAllTypes, getTypeById, updateTypeById } from "@/actions/types";
import { Type } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useTypes() {
  const queryClient = useQueryClient();

  // Query for fetching all car types
  const typesQuery = useQuery({
    queryKey: ["types"],
    queryFn: getAllTypes,
  });

  // Create data mutation
  const createTypeMutation = useMutation({
    mutationFn: createType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["types"] });
    },
  });

  // Delete data mutation
  const deleteTypeMutation = useMutation({
    mutationFn: deleteType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["types"] });
    },
  });

  return {
    // Queries
    types: typesQuery.data?.data ?? [],
    isLoading: typesQuery.isLoading,
    error: typesQuery.error || typesQuery.data?.error,

    // Mutations
    createType: createTypeMutation.mutate,
    deleteType: deleteTypeMutation.mutate,

    // Mutation states
    isCreating: createTypeMutation.isPending,
    isDeleting: deleteTypeMutation.isPending,
  };
}

// Optional: Hook for fetching a single car type
export function useType(id: string) {
  const typeQuery = useQuery({
    queryKey: ["type", id],
    queryFn: () => getTypeById(id),
    select: (response) => ({
      type: response,
    }),
  });

  return {
    type: typeQuery.data?.type,
    error: typeQuery.error,
    isLoading: typeQuery.isLoading,
  };
}
