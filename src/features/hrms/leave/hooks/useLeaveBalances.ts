import { useQuery } from '@tanstack/react-query';
import { leaveService } from '../services/leaveService';
import { LeaveBalanceFilters } from '../../shared/types/leave.types';

export const useLeaveBalances = (filters?: LeaveBalanceFilters) => {
  return useQuery({
    queryKey: ['hrms', 'leave', 'balances', filters],
    queryFn: () => leaveService.getLeaveBalances(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useLeaveSummary = (filters?: LeaveBalanceFilters) => {
  return useQuery({
    queryKey: ['hrms', 'leave', 'summary', filters],
    queryFn: () => leaveService.getLeaveSummary(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
