import { useQuery } from '@tanstack/react-query';
import { designationService } from '../services';
import { hrmsQueryKeys } from '../constants/queryKeys';

export function useDesignations() {
    return useQuery({
        queryKey: hrmsQueryKeys.designations.list(),
        queryFn: () => designationService.list(),
        staleTime: 5 * 60_000,
    });
}