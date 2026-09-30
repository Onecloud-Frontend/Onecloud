import { useQuery } from "@tanstack/react-query";

import { quotationService } from "../services/quotationService";
import type { QuotationFilters } from "../types/quotation.types";

export const quotationKeys = {
  all: ["quotations"] as const,

  lists: () => [...quotationKeys.all, "list"] as const,

  list: (filters: QuotationFilters) =>
    [...quotationKeys.lists(), filters] as const,

  details: () => [...quotationKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...quotationKeys.details(), id] as const,
};

export const useQuotations = (
  filters: QuotationFilters = {},
) => {
  return useQuery({
    queryKey: quotationKeys.list(filters),
    queryFn: () =>
      quotationService.getQuotations(filters),
  });
};
