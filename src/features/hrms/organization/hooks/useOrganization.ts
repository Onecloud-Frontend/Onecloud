import { useQuery } from "@tanstack/react-query";

import {
  getDepartments,
  getDesignations,
} from "../services/organization.service";

export const organizationQueryKeys = {
  all: ["hrms", "organization"] as const,

  departments: () =>
    [...organizationQueryKeys.all, "departments"] as const,

  designations: () =>
    [...organizationQueryKeys.all, "designations"] as const,
};

export function useDepartments() {
  return useQuery({
    queryKey: organizationQueryKeys.departments(),
    queryFn: getDepartments,
    staleTime: 5 * 60 * 1000,
  });
}

export function useDesignations() {
  return useQuery({
    queryKey: organizationQueryKeys.designations(),
    queryFn: getDesignations,
    staleTime: 5 * 60 * 1000,
  });
}