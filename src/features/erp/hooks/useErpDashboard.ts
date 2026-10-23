/**
 * OneCloud Enterprise ERP — Dashboard Hooks
 *
 * Implements the Hook layer in the Page → Hook → Service → Mock architecture.
 * Owned by Developer 1 (ERP Dashboard and Business Overview).
 */

import { useQuery } from '@tanstack/react-query';
import { ERP_QUERY_KEYS } from '../constants/erpQueryKeys';
import { erpDashboardService } from '../services/erpDashboardService';

export const useErpDashboard = () => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.dashboard.all,
    queryFn: erpDashboardService.getDashboardData,
  });
};

export const useErpKpis = () => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.dashboard.kpis,
    queryFn: erpDashboardService.getKpis,
  });
};

export const useErpTransactions = () => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.dashboard.transactions,
    queryFn: erpDashboardService.getRecentTransactions,
  });
};

export const useErpAlerts = () => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.dashboard.alerts,
    queryFn: erpDashboardService.getOperationalAlerts,
  });
};
