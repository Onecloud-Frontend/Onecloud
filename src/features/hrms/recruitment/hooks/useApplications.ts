import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { applicationService } from '../services/applicationService';

import type {
  Application,
  ApplicationFilters,
  ApplicationStatus,
} from '../types/application.types';

export const useApplications = (filters?: ApplicationFilters) => {
  return useQuery({
    queryKey: ['hrms', 'applications', filters],
    queryFn: () => applicationService.getApplications(filters),
    staleTime: 5 * 60 * 1000,
  });
};

export const useApplication = (id: string) => {
  return useQuery({
    queryKey: ['hrms', 'application', id],
    queryFn: () => applicationService.getApplicationById(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Application,
    Error,
    {
      id: string;
      status: ApplicationStatus;
    }
  >({
    mutationFn: ({ id, status }) =>
      applicationService.updateApplicationStatus(id, status),

    onSuccess: (updatedApplication) => {
      queryClient.setQueryData(
        ['hrms', 'application', updatedApplication.id],
        updatedApplication
      );

      queryClient.invalidateQueries({
        queryKey: ['hrms', 'applications'],
      });
    },
  });
};