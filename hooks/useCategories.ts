// app/hooks/useContacts.ts
"use client";

import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategoryById } from "@/actions/categories";
import { Category } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useCategories() {
  const queryClient = useQueryClient();

  // Query for fetching all data
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  // Create data mutation
  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"]});
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
  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    // Queries
    categories: categoriesQuery.data?.data ?? [],
    isLoading: categoriesQuery.isLoading,
    error: categoriesQuery.error || categoriesQuery.data?.error,

    // Mutations
    createCategory: createCategoryMutation.mutate,
    // updateCategory: updateCategoryMutation.mutate,
    deleteCategory: deleteCategoryMutation.mutate,

    // Mutation states
    isCreating: createCategoryMutation.isPending,
    // isUpdating: updateCategoryMutation.isPending,
    isDeleting: deleteCategoryMutation.isPending,
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
