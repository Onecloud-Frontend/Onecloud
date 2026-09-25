import type { LeaveType } from '@/features/hrms/shared/types';

export interface LeaveSummary {
  totalAllowance: number;
  totalUsed: number;
  totalRemaining: number;
  pendingRequestsCount: number;
}

export interface LeaveTypeDisplayConfig {
  label: string;
  description: string;
  badgeLabel: string;
  colors: {
    bgLight: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    progressFill: string;
    borderHover: string;
  };
}

export const LEAVE_TYPE_CONFIGS: Record<LeaveType, LeaveTypeDisplayConfig> = {
  CASUAL: {
    label: 'Casual Leave',
    description: 'Short-notice leave for urgent personal matters, emergencies, and unexpected needs.',
    badgeLabel: 'Casual',
    colors: {
      bgLight: 'bg-amber-50/70',
      text: 'text-amber-600',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-700',
      progressFill: 'bg-amber-500',
      borderHover: 'hover:border-amber-300',
    },
  },
  SICK: {
    label: 'Sick Leave',
    description: 'Allocated days for illness, injury, medical consultations, and health recovery.',
    badgeLabel: 'Medical',
    colors: {
      bgLight: 'bg-rose-50/70',
      text: 'text-rose-600',
      badgeBg: 'bg-rose-100',
      badgeText: 'text-rose-700',
      progressFill: 'bg-rose-500',
      borderHover: 'hover:border-rose-300',
    },
  },
  EARNED: {
    label: 'Earned / Annual Leave',
    description: 'Accrued annual vacation days for planned rest, personal travel, and rejuvenation.',
    badgeLabel: 'Annual',
    colors: {
      bgLight: 'bg-emerald-50/70',
      text: 'text-emerald-600',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-700',
      progressFill: 'bg-emerald-500',
      borderHover: 'hover:border-emerald-300',
    },
  },
  UNPAID: {
    label: 'Loss of Pay / Unpaid',
    description: 'Authorized absence without remuneration when all paid quotas are exhausted.',
    badgeLabel: 'Unpaid',
    colors: {
      bgLight: 'bg-slate-100',
      text: 'text-slate-600',
      badgeBg: 'bg-slate-200',
      badgeText: 'text-slate-700',
      progressFill: 'bg-slate-400',
      borderHover: 'hover:border-slate-300',
    },
  },
  MATERNITY: {
    label: 'Maternity Leave',
    description: 'Statutory paid leave allocated for prenatal and postnatal maternity care.',
    badgeLabel: 'Parental',
    colors: {
      bgLight: 'bg-purple-50/70',
      text: 'text-purple-600',
      badgeBg: 'bg-purple-100',
      badgeText: 'text-purple-700',
      progressFill: 'bg-purple-500',
      borderHover: 'hover:border-purple-300',
    },
  },
  PATERNITY: {
    label: 'Paternity Leave',
    description: 'Dedicated leave for fathers to provide family care and bond with their newborn.',
    badgeLabel: 'Parental',
    colors: {
      bgLight: 'bg-blue-50/70',
      text: 'text-blue-600',
      badgeBg: 'bg-blue-100',
      badgeText: 'text-blue-700',
      progressFill: 'bg-blue-500',
      borderHover: 'hover:border-blue-300',
    },
  },
};
