/**
 * Types & Data Transfer Objects for HRMS Leave Dashboard
 */

export type LeaveType = 
  | 'annual'
  | 'sick'
  | 'casual'
  | 'unpaid'
  | 'compensatory'
  | 'maternity'
  | 'paternity';

export interface LeaveBalance {
  id: string;
  leaveType: LeaveType;
  name: string;
  description?: string;
  totalAllowance: number;
  used: number;
  pending: number;
  remaining: number;
  accrualPeriod: string;
  color: 'blue' | 'emerald' | 'amber' | 'purple' | 'rose' | 'indigo';
  icon?: string;
}

export interface LeaveSummary {
  year: number;
  employeeId?: string;
  employeeName?: string;
  totalAllowance: number;
  totalUsed: number;
  totalPending: number;
  totalRemaining: number;
  balances: LeaveBalance[];
}

export interface LeaveBalanceFilters {
  year?: number;
  employeeId?: string;
}
