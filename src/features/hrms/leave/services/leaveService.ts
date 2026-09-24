import { LeaveBalance, LeaveBalanceFilters, LeaveSummary } from '../../shared/types/leave.types';
import { mockLeaveBalances, mockLeaveSummary } from '../mocks/leaveMockData';

class LeaveService {
  /**
   * Fetch leave balances for an employee.
   * Simulates network latency while keeping ready for backend endpoint integration.
   */
  async getLeaveBalances(filters?: LeaveBalanceFilters): Promise<LeaveBalance[]> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return [...mockLeaveBalances];
  }

  /**
   * Fetch aggregate leave summary for the given year and employee.
   */
  async getLeaveSummary(filters?: LeaveBalanceFilters): Promise<LeaveSummary> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // If a specific year is requested, reflect in summary
    const year = filters?.year || 2026;
    return {
      ...mockLeaveSummary,
      year,
    };
  }
}

export const leaveService = new LeaveService();
