import { useQuery } from '@tanstack/react-query';
import { hrmsQueryKeys } from '@/features/hrms/shared/constants';
import { payrollService } from '../services/payrollService';

export const usePayrollSummary = () => {
  return useQuery({
    queryKey: hrmsQueryKeys.payroll.all(),
    queryFn: () => payrollService.getPayrollSummary(),
    staleTime: 5 * 60 * 1000,
  });
};

export const usePayslips = () => {
  return useQuery({
    queryKey: hrmsQueryKeys.payroll.payslips(),
    queryFn: () => payrollService.getPayslips(),
    staleTime: 5 * 60 * 1000,
  });
};

export const usePayslip = (id: string) => {
  return useQuery({
    queryKey: hrmsQueryKeys.payroll.payslip(id),
    queryFn: () => payrollService.getPayslipById(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
};