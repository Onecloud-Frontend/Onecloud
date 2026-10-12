import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { crmOperationsSettingsService } from '../services/crmOperationsSettingsService';
import type {
  CrmOperationsSettings,
  LeadManagementSettings,
  LeadScoringSettings,
  NumberingSettingsData,
} from '../types/crmOperationsSettings.types';

export const crmOperationsSettingsKeys = {
  all: ['crm', 'settings', 'crm-operations'] as const,
};

export const useCrmOperationsSettings = () =>
  useQuery<CrmOperationsSettings, Error>({
    queryKey: crmOperationsSettingsKeys.all,
    queryFn: () => crmOperationsSettingsService.getSettings(),
    staleTime: 60 * 1000,
  });

/** Replaces the cached settings after a successful save, so the UI reflects it immediately. */
const useSettingsMutation = <T,>(
  mutationFn: (next: T) => Promise<T>,
  applyToCache: (previous: CrmOperationsSettings, next: T) => CrmOperationsSettings,
) => {
  const queryClient = useQueryClient();

  return useMutation<T, Error, T>({
    mutationFn,
    onSuccess: (next) => {
      queryClient.setQueryData<CrmOperationsSettings>(crmOperationsSettingsKeys.all, (previous) =>
        previous ? applyToCache(previous, next) : previous,
      );
    },
  });
};

export const useUpdateLeadManagementSettings = () =>
  useSettingsMutation<LeadManagementSettings>(
    (next) => crmOperationsSettingsService.updateLeadManagement(next),
    (previous, next) => ({ ...previous, leadManagement: next }),
  );

export const useUpdateLeadScoringSettings = () =>
  useSettingsMutation<LeadScoringSettings>(
    (next) => crmOperationsSettingsService.updateLeadScoring(next),
    (previous, next) => ({ ...previous, leadScoring: next }),
  );

export const useUpdateNumberingSettings = () =>
  useSettingsMutation<NumberingSettingsData>(
    (next) => crmOperationsSettingsService.updateNumbering(next),
    (previous, next) => ({ ...previous, numbering: next }),
  );

export const useResetCrmOperationsSettings = () => {
  const queryClient = useQueryClient();

  return useMutation<CrmOperationsSettings, Error, void>({
    mutationFn: () => crmOperationsSettingsService.resetToDefaults(),
    onSuccess: (data) => {
      queryClient.setQueryData(crmOperationsSettingsKeys.all, data);
    },
  });
};
