import { useMutation, useQueryClient } from '@tanstack/react-query';
import { employeeService } from '../services';
import { hrmsQueryKeys } from '../constants/queryKeys';

export function useDeleteEmployee() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (employeeId: string) => employeeService.remove(employeeId),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: hrmsQueryKeys.employees.all() });
        },
    });
}