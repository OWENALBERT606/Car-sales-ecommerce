"use client";

import { createYear, deleteYear, getAllYears } from "@/actions/years";
// import { createYear, deleteYear, getAllYears } from "@/actions/year";
import { Year } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useYears() {
  const queryClient = useQueryClient();

  // Query for fetching all car years
  const yearsQuery = useQuery({
    queryKey: ["years"],
    queryFn: getAllYears,
  });

  // Create year mutation
  const createYearMutation = useMutation({
    mutationFn: createYear,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["years"] });
    },
  });

  // Delete year mutation
  const deleteYearMutation = useMutation({
    mutationFn: deleteYear,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["years"] });
    },
  });

  return {
    // Queries
    years: yearsQuery.data?.data ?? [],
    isLoading: yearsQuery.isLoading,
    error: yearsQuery.error || yearsQuery.data?.error,

    // Mutations
    createYear: createYearMutation.mutate,
    deleteYear: deleteYearMutation.mutate,

    // Mutation states
    isCreating: createYearMutation.isPending,
    isDeleting: deleteYearMutation.isPending,
  };
}
