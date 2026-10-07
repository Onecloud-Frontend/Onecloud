import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { jobRequisitionService } from '../services/jobRequisitionService';
import type {
  JobRequisitionFormValues,
  JobRequisitionStatus,
} from '../types/jobRequisition.types';

export const jobRequisitionKeys = {
  all: ['hrms', 'recruitment', 'job-requisitions'] as const,
  list: () => [...jobRequisitionKeys.all, 'list'] as const,
  detail: (id: string) => [...jobRequisitionKeys.all, 'detail', id] as const,
};

export const useJobRequisitions = () =>
  useQuery({
    queryKey: jobRequisitionKeys.list(),
    queryFn: () => jobRequisitionService.getRequisitions(),
    staleTime: 30_000,
  });

export const useJobRequisition = (id?: string) =>
  useQuery({
    queryKey: id ? jobRequisitionKeys.detail(id) : [...jobRequisitionKeys.all, 'new'],
    queryFn: () => jobRequisitionService.getRequisitionById(id as string),
    enabled: Boolean(id),
    staleTime: 30_000,
  });

export const useCreateJobRequisition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: JobRequisitionFormValues) => jobRequisitionService.createDraft(values),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: jobRequisitionKeys.list() });
    },
  });
};

export const useUpdateJobRequisition = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: JobRequisitionFormValues) => jobRequisitionService.updateDraft(id, values),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: jobRequisitionKeys.all });
    },
  });
};

export const useUpdateJobRequisitionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: JobRequisitionStatus }) =>
      jobRequisitionService.updateStatus(id, status),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: jobRequisitionKeys.all });
    },
  });
};
