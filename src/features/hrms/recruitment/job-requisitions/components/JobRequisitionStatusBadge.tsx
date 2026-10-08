import type { JobRequisitionStatus } from '../types/jobRequisition.types';

const statusStyles: Record<JobRequisitionStatus, string> = {
  DRAFT: 'border-slate-200 bg-slate-50 text-slate-700',
  PENDING_APPROVAL: 'border-amber-200 bg-amber-50 text-amber-700',
  APPROVED: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  JOB_OPENING: 'border-blue-200 bg-blue-50 text-blue-700',
};

const statusLabels: Record<JobRequisitionStatus, string> = {
  DRAFT: 'Draft',
  PENDING_APPROVAL: 'Pending Approval',
  APPROVED: 'Approved',
  JOB_OPENING: 'Job Opening',
};

interface JobRequisitionStatusBadgeProps {
  status: JobRequisitionStatus;
}

export function JobRequisitionStatusBadge({ status }: JobRequisitionStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
