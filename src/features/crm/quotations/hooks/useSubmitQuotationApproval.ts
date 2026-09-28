import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  quotationKeys,
} from "./useQuotations";

import {
  submitQuotationApproval,
} from "../services/quotationService";

import type {
  Quotation,
} from "../types/quotation.types";

export function useSubmitQuotationApproval() {
  const queryClient =
    useQueryClient();

  return useMutation<
    Quotation,
    Error,
    string
  >({
    mutationFn: (id: string) =>
      submitQuotationApproval(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey:
          quotationKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey:
          quotationKeys.detail(id),
      });
    },
  });
}
