import { useQuery } from "@tanstack/react-query";

import { candidateService } from "../services/candidateService";

import type {
  CandidateFilters,
} from "../types/candidate.types";

export const useCandidates = (
  filters?: CandidateFilters
) => {
  return useQuery({
    queryKey: [
      "hrms",
      "candidates",
      filters,
    ],
    queryFn: () =>
      candidateService.getCandidates(filters),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCandidate = (
  id: string
) => {
  return useQuery({
    queryKey: [
      "hrms",
      "candidate",
      id,
    ],
    queryFn: () =>
      candidateService.getCandidateById(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
};