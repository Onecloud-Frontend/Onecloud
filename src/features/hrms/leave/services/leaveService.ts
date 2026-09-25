import type { LeaveBalance, LeaveRequest, LeaveType } from '@/features/hrms/shared/types';
import { mockLeaveBalances, mockLeaveRequests } from '@/features/hrms/shared/mocks';
import type { LeaveSummary } from '../types/leaveDashboard.types';

export const leaveService = {
  /**
   * Fetches leave balances for an employee.
   * Simulates async network delay.
   */
  async getLeaveBalances(_employeeId?: string): Promise<LeaveBalance[]> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return [...mockLeaveBalances];
  },

  /**
   * Fetches leave requests to calculate pending counts and usage breakdown.
   */
  async getLeaveRequests(employeeId?: string): Promise<LeaveRequest[]> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    if (employeeId) {
      return mockLeaveRequests.filter((req) => req.employeeId === employeeId);
    }
    return [...mockLeaveRequests];
  },

  /**
   * Calculates overall aggregate summary metrics across all leave allocations.
   */
  async getLeaveSummary(employeeId?: string): Promise<LeaveSummary> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const totalAllowance = mockLeaveBalances.reduce((acc, curr) => acc + curr.total, 0);
    const totalUsed = mockLeaveBalances.reduce((acc, curr) => acc + curr.used, 0);
    const totalRemaining = mockLeaveBalances.reduce((acc, curr) => acc + curr.remaining, 0);

    const pendingRequestsCount = mockLeaveRequests.filter((req) => {
      const isPending = req.status === 'PENDING';
      const matchesEmp = employeeId ? req.employeeId === employeeId : true;
      return isPending && matchesEmp;
    }).length;

    return {
      totalAllowance,
      totalUsed,
      totalRemaining,
      pendingRequestsCount,
    };
  },

  /**
   * Fetches leave balance for a single leave category.
   */
  async getLeaveBalanceByType(leaveType: LeaveType): Promise<LeaveBalance | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockLeaveBalances.find((item) => item.leaveType === leaveType);
  },
};
