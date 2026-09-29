import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { pipelineService } from "../services/pipelineService";

import type { PipelineStage } from "../types/pipeline.types";

const pipelineQueryKey = ["crm", "sales-pipeline", "opportunities"];

export function useSalesPipeline() {
  return useQuery({
    queryKey: pipelineQueryKey,
    queryFn: () => pipelineService.getOpportunities(),
  });
}

export function usePipelineOpportunity(id: string) {
  return useQuery({
    queryKey: ["crm", "sales-pipeline", "opportunity", id],
    queryFn: () => pipelineService.getOpportunity(id),
    enabled: Boolean(id),
  });
}

export function useUpdatePipelineStage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, stage }: { id: string; stage: PipelineStage }) =>
      pipelineService.updateStage(id, stage),

    onSuccess: (updatedOpportunity) => {
      queryClient.invalidateQueries({
        queryKey: pipelineQueryKey,
      });

      queryClient.invalidateQueries({
        queryKey: [
          "crm",
          "sales-pipeline",
          "opportunity",
          updatedOpportunity.id,
        ],
      });
    },
  });
}

export function useUpdatePipelineOwner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, owner }: { id: string; owner: string }) =>
      pipelineService.updateOwner(id, owner),

    onSuccess: (updatedOpportunity) => {
      queryClient.invalidateQueries({
        queryKey: pipelineQueryKey,
      });

      queryClient.invalidateQueries({
        queryKey: [
          "crm",
          "sales-pipeline",
          "opportunity",
          updatedOpportunity.id,
        ],
      });
    },
  });
}
