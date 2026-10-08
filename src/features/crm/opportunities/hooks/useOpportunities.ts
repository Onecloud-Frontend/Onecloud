import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import type { Opportunity } from "../types/opportunityTypes";
import type { OpportunityFormValues } from "../schemas/opportunitySchema";

import {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
} from "../services/opportunityService";

const OPPORTUNITIES_QUERY_KEY = ["opportunities"];

/**
 * Get all opportunities
 */
export function useOpportunities() {
  return useQuery({
    queryKey: OPPORTUNITIES_QUERY_KEY,
    queryFn: getOpportunities,
  });
}

/**
 * Get one opportunity by ID
 */
export function useOpportunity(id: string) {
  return useQuery({
    queryKey: [...OPPORTUNITIES_QUERY_KEY, id],
    queryFn: () => getOpportunityById(id),
    enabled: Boolean(id),
  });
}

/**
 * Create opportunity
 */
export function useCreateOpportunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: OpportunityFormValues) =>
      createOpportunity(values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: OPPORTUNITIES_QUERY_KEY,
      });
    },
  });
}

/**
 * Update opportunity
 */
export function useUpdateOpportunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: Partial<Opportunity>;
    }) => updateOpportunity(id, values),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: OPPORTUNITIES_QUERY_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: [
          ...OPPORTUNITIES_QUERY_KEY,
          variables.id,
        ],
      });
    },
  });
}

/**
 * Delete opportunity
 */
export function useDeleteOpportunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteOpportunity(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: OPPORTUNITIES_QUERY_KEY,
      });
    },
  });
}