import type { LeaveBalance, LeaveRequest } from '@/features/hrms/shared/types';
import { mockLeaveBalances, mockLeaveRequests } from '@/features/hrms/shared/mocks';
import type { LeaveSummary } from '../types';

export const leaveService = {
  /**
   * Retrieves current leave balances for the employee
   */
  async getLeaveBalances(employeeId?: string): Promise<LeaveBalance[]> {
    // Simulate network delay consistent with project pattern
    await new Promise((resolve) => setTimeout(resolve, 400));
    return [...mockLeaveBalances];
  },

  /**
   * Calculates high-level leave summary metrics
   */
  async getLeaveSummary(employeeId?: string): Promise<LeaveSummary> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const totalAllocated = mockLeaveBalances.reduce(
      (acc, balance) => acc + balance.total,
      0
    );

    const totalUsed = mockLeaveBalances.reduce(
      (acc, balance) => acc + balance.used,
      0
    );

    const totalRemaining = mockLeaveBalances.reduce(
      (acc, balance) => acc + balance.remaining,
      0
    );

    const relevantRequests = employeeId
      ? mockLeaveRequests.filter((req) => req.employeeId === employeeId)
      : mockLeaveRequests;

    const pendingRequestsCount = relevantRequests.filter(
      (req) => req.status === 'PENDING'
    ).length;

    const approvedRequestsCount = relevantRequests.filter(
      (req) => req.status === 'APPROVED'
    ).length;

    return {
      totalAllocated,
      totalUsed,
      totalRemaining,
      pendingRequestsCount,
      approvedRequestsCount,
    };
  },

  /**
   * Retrieves recent leave requests / history for display
   */
  async getLeaveRequests(employeeId?: string): Promise<LeaveRequest[]> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (employeeId) {
      return mockLeaveRequests.filter((req) => req.employeeId === employeeId);
    }

    return [...mockLeaveRequests];
  },
};
