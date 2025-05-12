// app/hooks/useContacts.ts
"use client";


import { createUnit, deleteUnit, getAllUnits } from "@/actions/units";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useUnits() {
  const queryClient = useQueryClient();

  // Query for fetching all data
  const unitsQuery = useQuery({
    queryKey: ["units"],
    queryFn: getAllUnits,
  });

  // Create data mutation
  const createUnitMutation = useMutation({
    mutationFn: createUnit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"]});
    },
  });

  // Update data mutation
//   const updateCategoryMutation = useMutation({
//     mutationFn: ({ id, data }: { id: string; data: Partial<Category> }) =>
//       updateCategoryById(id, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["categories"] });
//     },
//   });

  // Delete data mutation
  const deleteUnitMutation = useMutation({
    mutationFn: deleteUnit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });

  return {
    // Queries
    units: unitsQuery.data?.data ?? [],
    isLoading: unitsQuery.isLoading,
    error: unitsQuery.error || unitsQuery.data?.error,

    // Mutations
    createUnit: createUnitMutation.mutate,
    // updateUnit: updateUnitMutation.mutate,
    deleteUnit: deleteUnitMutation.mutate,

    // Mutation states
    isCreating: createUnitMutation.isPending,
    // isUpdating: updateUnitMutation.isPending,
    isDeleting: deleteUnitMutation.isPending,
  };
}

// Hook for fetching a single contact
// export function useCategory(id: string) {
//   const queryClient = useQueryClient();
//   const categoryQuery = useQuery({
//     queryKey: ["category", id],
//     queryFn: () => getCategoryById(id),
//     select: (response) => ({
//       category: response?.data,
//       error: response?.error,
//     }),
//   });
//   return {
//     category: categoryQuery.data?.category,
//     error: categoryQuery.error || categoryQuery.data?.error,
//     isLoading: categoryQuery.isLoading,
//   };
// }
