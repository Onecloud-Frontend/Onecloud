import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { quotationSettingsService } from "../services/quotationSettingsService";
import type { QuotationSettingsFormValues } from "../schemas/quotationSettings.schema";

const quotationSettingsKeys = {
  all: ["quotation-settings"] as const,

  detail: () =>
    [...quotationSettingsKeys.all, "detail"] as const,
};

export function useQuotationSettings() {
  return useQuery({
    queryKey: quotationSettingsKeys.detail(),
    queryFn: quotationSettingsService.getQuotationSettings,
  });
}

export function useUpdateQuotationSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      values: QuotationSettingsFormValues,
    ) =>
      quotationSettingsService.updateQuotationSettings(
        values,
      ),

    onSuccess: (updatedSettings) => {
      queryClient.setQueryData(
        quotationSettingsKeys.detail(),
        updatedSettings,
      );
    },
  });
}
