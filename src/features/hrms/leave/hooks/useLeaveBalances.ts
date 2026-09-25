import { useQuery } from '@tanstack/react-query';
import { hrmsQueryKeys } from '@/features/hrms/shared/constants';
import { leaveService } from '../services/leaveService';

export const useLeaveBalances = (employeeId?: string) => {
  return useQuery({
    queryKey: hrmsQueryKeys.leave.balances(employeeId ?? 'current'),
    queryFn: () => leaveService.getLeaveBalances(employeeId),
    staleTime: 5 * 60 * 1000,
  });
};

export const useLeaveSummary = (employeeId?: string) => {
  return useQuery({
    queryKey: [...hrmsQueryKeys.leave.all(), 'summary', employeeId ?? 'current'] as const,
    queryFn: () => leaveService.getLeaveSummary(employeeId),
    staleTime: 5 * 60 * 1000,
  });
};

export const useLeaveRequests = (employeeId?: string) => {
  return useQuery({
    queryKey: hrmsQueryKeys.leave.requests({ employeeId: employeeId ?? 'current' }),
    queryFn: () => leaveService.getLeaveRequests(employeeId),
    staleTime: 5 * 60 * 1000,
  });
};
