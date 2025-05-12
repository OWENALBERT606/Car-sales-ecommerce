// app/hooks/useContacts.ts
"use client";


import { createFarm, deleteFarm, getAllFarms } from "@/actions/farms";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useFarms() {
  const queryClient = useQueryClient();

  // Query for fetching all data
  const farmsQuery = useQuery({
    queryKey: ["farms"],
    queryFn: getAllFarms,
  });

  // Create data mutation
  const createFarmMutation = useMutation({
    mutationFn: createFarm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["farms"]});
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
  const deleteFarmMutation = useMutation({
    mutationFn: deleteFarm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["farms"] });
    },
  });

  return {
    // Queries
    farms: farmsQuery.data?.data ?? [],
    isLoading: farmsQuery.isLoading,
    error: farmsQuery.error || farmsQuery.data?.error,

    // Mutations
    createFarm: createFarmMutation.mutate,
    // updateFarm: updateFarmMutation.mutate,
    deleteFarm: deleteFarmMutation.mutate,

    // Mutation states
    isCreating: createFarmMutation.isPending,
    // isUpdating: updateFarmMutation.isPending,
    isDeleting: deleteFarmMutation.isPending,
  };
}

// Hook for fetching a single contact
// export function useFarm(id: string) {
//   const queryClient = useQueryClient();
//   const FarmQuery = useQuery({
//     queryKey: ["Farm", id],
//     queryFn: () => getFarmById(id),
//     select: (response) => ({
//       farm: response?.data,
//       error: response?.error,
//     }),
//   });
//   return {
//     category: categoryQuery.data?.category,
//     error: categoryQuery.error || categoryQuery.data?.error,
//     isLoading: categoryQuery.isLoading,
//   };
// }
