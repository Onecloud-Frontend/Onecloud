import { useQuery } from '@tanstack/react-query';
import { employeeService } from '../services';
import { hrmsQueryKeys } from '../constants/queryKeys';

export function useEmployee(employeeId: string | undefined) {
    return useQuery({
        queryKey: hrmsQueryKeys.employees.detail(employeeId ?? ''),
        queryFn: () => employeeService.getById(employeeId as string),
        enabled: Boolean(employeeId),
    });
}