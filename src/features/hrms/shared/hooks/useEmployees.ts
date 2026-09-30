import { useQuery } from '@tanstack/react-query';
import { employeeService } from '../services';
import { hrmsQueryKeys } from '../constants/queryKeys';
import type { EmployeeFilters } from '../types';

export function useEmployees(filters: EmployeeFilters = {}) {
    return useQuery({
        queryKey: hrmsQueryKeys.employees.list(filters),
        queryFn: () => employeeService.list(filters),
        staleTime: 30_000,
    });
}