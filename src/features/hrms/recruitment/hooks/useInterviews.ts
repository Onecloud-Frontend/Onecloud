import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { interviewService } from '../services/interviewService';
import type { InterviewFilters, InterviewInput } from '../types/interview.types';

export const interviewKeys = {
  all: ['recruitment', 'interviews'] as const,
  list: (filters: InterviewFilters) => [...interviewKeys.all, 'list', filters] as const,
  upcoming: () => [...interviewKeys.all, 'upcoming'] as const,
  detail: (id: string) => [...interviewKeys.all, 'detail', id] as const,
};

export const useInterviews = (filters: InterviewFilters) =>
  useQuery({ queryKey: interviewKeys.list(filters), queryFn: () => interviewService.getInterviews(filters) });

export const useUpcomingInterviews = (enabled = true) =>
  useQuery({ queryKey: interviewKeys.upcoming(), queryFn: () => interviewService.getUpcomingInterviews(), enabled });

export const useInterview = (id?: string) =>
  useQuery({ queryKey: interviewKeys.detail(id ?? ''), queryFn: () => interviewService.getInterviewById(id!), enabled: !!id });

export const useCreateInterview = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: InterviewInput) => interviewService.createInterview(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: interviewKeys.all }),
  });
};

export const useUpdateInterview = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: InterviewInput }) => interviewService.updateInterview(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: interviewKeys.all }),
  });
};

export const useCancelInterview = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => interviewService.cancelInterview(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: interviewKeys.all }),
  });
};