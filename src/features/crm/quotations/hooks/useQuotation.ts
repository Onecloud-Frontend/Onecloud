import { useQuery } from "@tanstack/react-query";

import {
  quotationKeys,
} from "./useQuotations";

import {
  quotationService,
} from "../services/quotationService";

export const useQuotation = (
  id: string,
) => {
  return useQuery({
    queryKey: quotationKeys.detail(id),

    queryFn: () =>
      quotationService.getQuotation(id),

    enabled: Boolean(id),
  });
};
