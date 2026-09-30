import { useMutation, useQueryClient } from '@tanstack/react-query';
import { employeeService } from '../services';
import { hrmsQueryKeys } from '../constants/queryKeys';
import type { Employee } from '../types';

export function useUpdateEmployee() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({
            employeeId,
            payload,
        }: {
            employeeId: string;
            payload: Partial<Employee>;
        }) => employeeService.update(employeeId, payload),
        onSuccess: (updated) => {
            qc.invalidateQueries({ queryKey: hrmsQueryKeys.employees.all() });
            qc.invalidateQueries({
                queryKey: hrmsQueryKeys.employees.detail(updated.employeeId),
            });
        },
    });
}