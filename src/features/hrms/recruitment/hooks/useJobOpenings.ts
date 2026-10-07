import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { jobOpeningService } from "../services/jobOpeningService";
import {
  JobOpeningFormData,
  JobOpeningStatus,
} from "../types/jobOpening.types";

const JOB_OPENINGS_KEY = ["recruitment", "job-openings"];

export const useJobOpenings = () => {
  return useQuery({
    queryKey: JOB_OPENINGS_KEY,
    queryFn: jobOpeningService.getJobOpenings,
  });
};

export const useJobOpening = (id: number | null) => {
  return useQuery({
    queryKey: [...JOB_OPENINGS_KEY, id],
    queryFn: () => jobOpeningService.getJobOpening(id as number),
    enabled: id !== null,
  });
};

export const useCreateJobOpening = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: JobOpeningFormData) =>
      jobOpeningService.createJobOpening(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: JOB_OPENINGS_KEY,
      });
    },
  });
};

export const useUpdateJobOpening = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: JobOpeningFormData;
    }) => jobOpeningService.updateJobOpening(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: JOB_OPENINGS_KEY,
      });
    },
  });
};

export const useUpdateJobOpeningStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number;
      status: JobOpeningStatus;
    }) => jobOpeningService.updateStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: JOB_OPENINGS_KEY,
      });
    },
  });
};

export const useDeleteJobOpening = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      jobOpeningService.deleteJobOpening(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: JOB_OPENINGS_KEY,
      });
    },
  });
};