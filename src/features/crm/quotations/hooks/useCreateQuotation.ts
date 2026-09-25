import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  quotationService,
} from "../services/quotationService";

import {
  quotationKeys,
} from "./useQuotations";

import type {
  Quotation,
  QuotationFormValues,
} from "../types/quotation.types";

export const useCreateQuotation =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation<
      Quotation,
      Error,
      QuotationFormValues
    >({
      mutationFn: (
        values: QuotationFormValues,
      ) =>
        quotationService.createQuotation(
          values,
        ),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey:
            quotationKeys.lists(),
        });
      },
    });
  };
  