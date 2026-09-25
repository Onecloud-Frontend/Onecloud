import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { quotationKeys } from "./useQuotations";

import { reviseQuotation } from "../services/quotationService";

import type { Quotation } from "../types/quotation.types";

export function useReviseQuotation() {
  const queryClient =
    useQueryClient();

  return useMutation<
    Quotation,
    Error,
    string
  >({
    mutationFn: (id: string) =>
      reviseQuotation(id),

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
