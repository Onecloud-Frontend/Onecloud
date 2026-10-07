import React from 'react';

import { cn } from '@/shared/utils/cn';

import type { ApplicationStatus } from '../types/application.types';

interface RecruitmentStatusBadgeProps {
  status: ApplicationStatus;
}

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  APPLIED: 'bg-blue-50 text-blue-700 border-blue-200',
  UNDER_REVIEW: 'bg-amber-50 text-amber-700 border-amber-200',
  SHORTLISTED: 'bg-violet-50 text-violet-700 border-violet-200',
  REJECTED: 'bg-rose-50 text-rose-700 border-rose-200',
  INTERVIEW: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  SELECTED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  OFFER: 'bg-orange-50 text-orange-700 border-orange-200',
  HIRED: 'bg-green-50 text-green-700 border-green-200',
};

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  APPLIED: 'Applied',
  UNDER_REVIEW: 'Under Review',
  SHORTLISTED: 'Shortlisted',
  REJECTED: 'Rejected',
  INTERVIEW: 'Interview',
  SELECTED: 'Selected',
  OFFER: 'Offer',
  HIRED: 'Hired',
};

const RecruitmentStatusBadge: React.FC<RecruitmentStatusBadgeProps> = ({
  status,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold',
        STATUS_STYLES[status]
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
};

export default RecruitmentStatusBadge;