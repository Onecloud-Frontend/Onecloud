import type { Payslip } from '@/features/hrms/shared/types';
import { mockPayslips } from '@/features/hrms/shared/mocks';

export interface PayrollSummary {
  totalEmployees: number;
  totalPayroll: number;
  pendingPayments: number;
  processedPayroll: number;
}

export const payrollService = {
  async getPayrollSummary(): Promise<PayrollSummary> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const totalPayroll = mockPayslips.reduce(
      (total, payslip) => total + payslip.netPay,
      0
    );

    const pendingPayments = mockPayslips.filter(
      (payslip) => payslip.status !== 'PAID'
    ).length;

    const processedPayroll = mockPayslips.filter(
      (payslip) => payslip.status === 'PAID'
    ).length;

    const employeeIds = new Set(
      mockPayslips.map((payslip) => payslip.employeeId)
    );

    return {
      totalEmployees: employeeIds.size,
      totalPayroll,
      pendingPayments,
      processedPayroll,
    };
  },

  async getPayslips(): Promise<Payslip[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return mockPayslips;
  },

  async getPayslipById(id: string): Promise<Payslip | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return mockPayslips.find((payslip) => payslip.id === id);
  },
};