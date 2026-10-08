import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { activitySettingsService } from "../services/activitySettingsService";
import type { ActivitySettingsUpdate } from "../types/activitySettings.types";

export const activitySettingsQueryKey = ["crm", "settings", "activities"];

export const useActivitySettings = () =>
  useQuery({
    queryKey: activitySettingsQueryKey,
    queryFn: () => activitySettingsService.getSettings(),
  });

export const useUpdateActivitySettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: ActivitySettingsUpdate) =>
      activitySettingsService.updateSettings(values),
    onSuccess: (updatedSettings) => {
      queryClient.setQueryData(activitySettingsQueryKey, updatedSettings);
    },
  });
};
