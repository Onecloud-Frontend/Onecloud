import { useQuery } from '@tanstack/react-query';
import { departmentService } from '../services';
import { hrmsQueryKeys } from '../constants/queryKeys';

export function useDepartments() {
    return useQuery({
        queryKey: hrmsQueryKeys.departments.list(),
        queryFn: () => departmentService.list(),
        staleTime: 5 * 60_000,
    });
}

export function useDepartmentTree() {
    return useQuery({
        queryKey: hrmsQueryKeys.departments.tree(),
        queryFn: () => departmentService.tree(),
        staleTime: 5 * 60_000,
    });
}