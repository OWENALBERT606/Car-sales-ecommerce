// app/hooks/useContacts.ts
"use client";


import { createLocation, deleteLocation, getAllLocations } from "@/actions/locations";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useLocations() {
  const queryClient = useQueryClient();

  // Query for fetching all data
  const locationsQuery = useQuery({
    queryKey: ["locations"],
    queryFn: getAllLocations,
  });

  // Create data mutation
  const createLocationMutation = useMutation({
    mutationFn: createLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"]});
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
  const deleteLocationMutation = useMutation({
    mutationFn: deleteLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });

  return {
    // Queries
    locations: locationsQuery.data?.data ?? [],
    isLoading: locationsQuery.isLoading,
    error: locationsQuery.error || locationsQuery.data?.error,

    // Mutations
    createLocation: createLocationMutation.mutate,
    // updateFarm: updateFarmMutation.mutate,
    deleteLocation: deleteLocationMutation.mutate,

    // Mutation states
    isCreating: createLocationMutation.isPending,
    // isUpdating: updateFarmMutation.isPending,
    isDeleting: deleteLocationMutation.isPending,
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
