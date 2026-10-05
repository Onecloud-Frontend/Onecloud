import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { contactSettingsService } from '../services/contactSettingsService';
import type { ContactSettings } from '../types/contactSettings.types';

export const contactSettingsQueryKey = ['contact-settings'] as const;

export const useContactSettings = () => {
  return useQuery({
    queryKey: contactSettingsQueryKey,
    queryFn: () => contactSettingsService.getContactSettings(),
  });
};

export const useUpdateContactSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: ContactSettings) =>
      contactSettingsService.updateContactSettings(settings),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: contactSettingsQueryKey,
      });
    },
  });
};
