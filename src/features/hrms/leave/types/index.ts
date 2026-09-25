export * from '@/features/hrms/shared/types/leave.types';

export interface LeaveSummary {
  totalAllocated: number;
  totalUsed: number;
  totalRemaining: number;
  pendingRequestsCount: number;
  approvedRequestsCount: number;
}
