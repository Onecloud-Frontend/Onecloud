import type { LeaveBalance, LeaveRequest } from '../types';

export const mockLeaveBalances: LeaveBalance[] = [
  { leaveType: 'CASUAL', total: 12, used: 4, remaining: 8 },
  { leaveType: 'SICK', total: 10, used: 2, remaining: 8 },
  { leaveType: 'EARNED', total: 15, used: 5, remaining: 10 },
  { leaveType: 'UNPAID', total: 0, used: 0, remaining: 0 },
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'lv-1',
    employeeId: 'emp-5',
    leaveType: 'CASUAL',
    startDate: '2024-06-10',
    endDate: '2024-06-11',
    days: 2,
    reason: 'Family function',
    status: 'PENDING',
    appliedAt: '2024-06-01T09:00:00.000Z',
    reviewedBy: null,
    reviewedAt: null,
    reviewComment: null,
  },
  {
    id: 'lv-2',
    employeeId: 'emp-4',
    leaveType: 'SICK',
    startDate: '2024-05-20',
    endDate: '2024-05-21',
    days: 2,
    reason: 'Fever',
    status: 'APPROVED',
    appliedAt: '2024-05-19T07:30:00.000Z',
    reviewedBy: 'emp-1',
    reviewedAt: '2024-05-19T12:00:00.000Z',
    reviewComment: 'Get well soon',
  },
];
