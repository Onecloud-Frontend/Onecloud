import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { pipelineService } from "../services/pipelineService";

import { OPPORTUNITIES_QUERY_KEY } from "../../opportunities/hooks/useOpportunities";

import type { PipelineStage } from "../types/pipeline.types";

export const pipelineQueryKey = OPPORTUNITIES_QUERY_KEY;

export function useSalesPipeline() {
  return useQuery({
    queryKey: pipelineQueryKey,
    queryFn: () => pipelineService.getOpportunities(),
  });
}

export function usePipelineOpportunity(id: string) {
  return useQuery({
    queryKey: [...pipelineQueryKey, id],
    queryFn: () => pipelineService.getOpportunity(id),
    enabled: Boolean(id),
  });
}

export function useUpdatePipelineStage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, stage }: { id: string; stage: PipelineStage }) =>
      pipelineService.updateStage(id, stage),

    onSuccess: async (updatedOpportunity) => {
      queryClient.setQueryData(
        [...pipelineQueryKey, updatedOpportunity.id],
        updatedOpportunity,
      );

      await queryClient.invalidateQueries({
        queryKey: pipelineQueryKey,
      });
    },
  });
}
