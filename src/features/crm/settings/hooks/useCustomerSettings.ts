import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { customerSettingsService } from '../services/customerSettingsService';
import type { UpdateCustomerSettingsRequest } from '../types/customerSettings.types';

const CUSTOMER_SETTINGS_QUERY_KEY = ['customer-settings'];

export const useCustomerSettings = () => {
  return useQuery({
    queryKey: CUSTOMER_SETTINGS_QUERY_KEY,
    queryFn: customerSettingsService.getCustomerSettings,
  });
};

export const useUpdateCustomerSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCustomerSettingsRequest) =>
      customerSettingsService.updateCustomerSettings(data),

    onSuccess: (updatedSettings) => {
      queryClient.setQueryData(
        CUSTOMER_SETTINGS_QUERY_KEY,
        updatedSettings
      );
    },
  });
};