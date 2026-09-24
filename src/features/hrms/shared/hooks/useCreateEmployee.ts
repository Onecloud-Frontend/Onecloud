import { useMutation, useQueryClient } from '@tanstack/react-query';
import { employeeService } from '../services';
import { hrmsQueryKeys } from '../constants/queryKeys';
import type { Employee } from '../types';

export function useCreateEmployee() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: Omit<Employee, 'employeeId'>) =>
            employeeService.create(payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: hrmsQueryKeys.employees.all() });
        },
    });
}