import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { activityService } from "../services/activityService";
import type { Activity, ActivityFilters } from "../types/activity.types";
import type { ActivityFormValues } from "../schemas/activitySchema";
export const useActivities = (filters: ActivityFilters) => {
  return useQuery({
    queryKey: ["crm", "activities", filters],
    queryFn: () => activityService.getActivities(filters),
    placeholderData: (previousData) => previousData,
  });
};
export const useActivity = (id: string) => {
  return useQuery({
    queryKey: ["crm", "activities", id],
    queryFn: () => activityService.getActivityById(id),
    enabled: !!id,
  });
};
export const useCreateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: ActivityFormValues) =>
      activityService.createActivity(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["crm", "activities"],
      });
    },
  });
};
export const useUpdateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: Partial<Activity> }) =>
      activityService.updateActivity(id, values),
    onSuccess: (updatedActivity) => {
      queryClient.setQueryData(
        ["crm", "activities", updatedActivity.id],
        updatedActivity,
      );
      queryClient.invalidateQueries({
        queryKey: ["crm", "activities"],
      });
    },
  });
};
export const useCompleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => activityService.completeActivity(id),
    onSuccess: (completedActivity) => {
      queryClient.setQueryData(
        ["crm", "activities", completedActivity.id],
        completedActivity,
      );
      queryClient.invalidateQueries({
        queryKey: ["crm", "activities"],
      });
    },
  });
};
