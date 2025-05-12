// app/hooks/useContacts.ts
"use client";


import { createBanner, deleteBanner, getAllBanners } from "@/actions/banners";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useBanners() {
  const queryClient = useQueryClient();

  // Query for fetching all data
  const bannersQuery = useQuery({
    queryKey: ["banners"],
    queryFn: getAllBanners,
  });

  // Create data mutation
  const createBannerMutation = useMutation({
    mutationFn: createBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"]});
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
  const deleteBannerMutation = useMutation({
    mutationFn: deleteBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });

  return {
    // Queries
    banners: bannersQuery.data?.data ?? [],
    isLoading: bannersQuery.isLoading,
    error: bannersQuery.error || bannersQuery.data?.error,

    // Mutations
    createBanner: createBannerMutation.mutate,
    // updateCategory: updateCategoryMutation.mutate,
    deleteBanner: deleteBannerMutation.mutate,

    // Mutation states
    isCreating: createBannerMutation.isPending,
    // isUpdating: updateCategoryMutation.isPending,
    isDeleting: deleteBannerMutation.isPending,
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
