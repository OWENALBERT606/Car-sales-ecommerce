// app/hooks/useModels.ts
"use client";

import { createModel, deleteModel, getAllModels } from "@/actions/models";
import { Model } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useModels() {
  const queryClient = useQueryClient();

  // Query for fetching all car models
  const modelsQuery = useQuery({
    queryKey: ["models"],
    queryFn: getAllModels,
  });

  // Create model mutation
  const createModelMutation = useMutation({
    mutationFn: createModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });

  // Delete model mutation
  const deleteModelMutation = useMutation({
    mutationFn: deleteModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });

  return {
    // Queries
    models: modelsQuery.data?.data ?? [],
    isLoading: modelsQuery.isLoading,
    error: modelsQuery.error || modelsQuery.data?.error,

    // Mutations
    createModel: createModelMutation.mutate,
    deleteModel: deleteModelMutation.mutate,

    // Mutation states
    isCreating: createModelMutation.isPending,
    isDeleting: deleteModelMutation.isPending,
  };
}
