// app/hooks/useContacts.ts
"use client";

import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategoryById } from "@/actions/categories";
import { createProduct, deleteProduct, getAllProducts, getProductById } from "@/actions/products";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useProducts() {
  const queryClient = useQueryClient();

  // Query for fetching all data
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  // Create data mutation
  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"]});
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
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    // Queries
    products: productsQuery.data?.data ?? [],
    isLoading: productsQuery.isLoading,
    error: productsQuery.error || productsQuery.data?.error,

    // Mutations
    createProduct: createProductMutation.mutate,
    // updateCategory: updateCategoryMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,

    // Mutation states
    isCreating: createProductMutation.isPending,
    // isUpdating: updateCategoryMutation.isPending,
    isDeleting: deleteProductMutation.isPending,
  };
}

// Hook for fetching a single product
// export function useProduct(id: string) {
//   const queryClient = useQueryClient();
//   const productQuery = useQuery({
//     queryKey: ["product", id],
//     queryFn: () => getProductById(id),
//     // select: (response) => ({
//     //   product: response?.data,
//     //   error: response?.error,
//     // }),
//   });
//   return {
//     product: productQuery.data?.product,
//     error: productQuery.error || productQuery.data?.error,
//     isLoading: productQuery.isLoading,
//   };
// }
