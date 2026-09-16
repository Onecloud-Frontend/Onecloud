import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboardService';
import { DashboardMetrics } from '../types/dashboard.types';

export const useDashboardMetrics = () => {
  return useQuery<DashboardMetrics, Error>({
    queryKey: ['crm', 'dashboard', 'metrics'],
    queryFn: () => dashboardService.getDashboardMetrics(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
