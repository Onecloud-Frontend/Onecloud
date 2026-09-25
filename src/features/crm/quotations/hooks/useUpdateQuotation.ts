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

interface UpdateQuotationVariables {
  id: string;
  values: QuotationFormValues;
}

export const useUpdateQuotation =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation<
      Quotation,
      Error,
      UpdateQuotationVariables
    >({
      mutationFn: ({
        id,
        values,
      }: UpdateQuotationVariables) =>
        quotationService.updateQuotation(
          id,
          values,
        ),

      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey:
            quotationKeys.lists(),
        });

        queryClient.invalidateQueries({
          queryKey:
            quotationKeys.detail(
              variables.id,
            ),
        });
      },
    });
  };
  