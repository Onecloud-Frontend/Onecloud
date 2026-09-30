export type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
export type LeaveType =
    | 'CASUAL'
    | 'SICK'
    | 'EARNED'
    | 'UNPAID'
    | 'MATERNITY'
    | 'PATERNITY';

export interface LeaveBalance {
    leaveType: LeaveType;
    total: number;
    used: number;
    remaining: number;
}

export interface LeaveRequest {
    id: string;
    employeeId: string;
    leaveType: LeaveType;
    startDate: string;
    endDate: string;
    days: number;
    reason: string;
    status: LeaveStatus;
    appliedAt: string;
    reviewedBy: string | null;
    reviewedAt: string | null;
    reviewComment: string | null;
}

export interface CreateLeaveRequestPayload {
    employeeId: string;
    leaveType: LeaveType;
    startDate: string;
    endDate: string;
    reason: string;
}