import React from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, Briefcase, Eye, Users } from 'lucide-react';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/utils/cn';
import type { JobRequisition, RequisitionPriority } from '../types/jobRequisition.types';
import type { JobRequisitionSortState } from '../types/jobRequisitionList.types';
import { JobRequisitionStatusBadge } from './JobRequisitionStatusBadge';

interface JobRequisitionTableProps {
  requisitions: JobRequisition[];
  sortState: JobRequisitionSortState;
  onSort: (field: keyof JobRequisition) => void;
  onViewDetails: (id: string) => void;
}

interface SortableHeaderProps {
  label: string;
  field: keyof JobRequisition;
  sortState: JobRequisitionSortState;
  onSort: (field: keyof JobRequisition) => void;
  align?: 'left' | 'right' | 'center';
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  label,
  field,
  sortState,
  onSort,
  align = 'left',
}) => {
  const active = sortState.field === field;
  const Icon = !active ? ArrowUpDown : sortState.order === 'asc' ? ArrowUp : ArrowDown;

  return (
    <th
      className={cn(
        'px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
      )}
    >
      <button
        type="button"
        onClick={() => onSort(field)}
        className={cn(
          'inline-flex items-center gap-1.5 rounded px-1.5 py-1 transition-colors hover:bg-slate-100 hover:text-[#0b1f4d]',
          align === 'right' && 'ml-auto',
          align === 'center' && 'mx-auto',
          active && 'font-bold text-[#0b1f4d]',
        )}
        aria-label={`Sort by ${label}`}
      >
        {label}
        <Icon className="h-3 w-3" />
      </button>
    </th>
  );
};

const priorityStyles: Record<RequisitionPriority, string> = {
  URGENT: 'bg-rose-50 text-rose-700 border-rose-200',
  HIGH: 'bg-amber-50 text-amber-700 border-amber-200',
  MEDIUM: 'bg-blue-50 text-blue-700 border-blue-200',
  LOW: 'bg-slate-50 text-slate-700 border-slate-200',
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

const formatEmploymentType = (type: string) => {
  return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
};

export const JobRequisitionTable: React.FC<JobRequisitionTableProps> = ({
  requisitions,
  sortState,
  onSort,
  onViewDetails,
}) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/70 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px] text-left text-xs">
          <thead className="border-b border-slate-100 bg-slate-50/75">
            <tr>
              <SortableHeader label="Requisition ID" field="id" sortState={sortState} onSort={onSort} />
              <SortableHeader label="Job Title" field="jobTitle" sortState={sortState} onSort={onSort} />
              <SortableHeader label="Department" field="department" sortState={sortState} onSort={onSort} />
              <SortableHeader label="Hiring Manager" field="hiringManager" sortState={sortState} onSort={onSort} />
              <SortableHeader label="Priority" field="priority" sortState={sortState} onSort={onSort} />
              <SortableHeader label="Target Date" field="expectedJoiningDate" sortState={sortState} onSort={onSort} />
              <SortableHeader label="Status" field="status" sortState={sortState} onSort={onSort} />
              <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requisitions.map((req) => (
              <tr
                key={req.id}
                className="group transition-colors hover:bg-slate-50/70"
              >
                {/* ID & Created Date */}
                <td className="px-4 py-3.5 font-medium text-slate-900">
                  <span className="inline-block font-mono text-xs font-semibold text-blue-600">
                    {req.id}
                  </span>
                  <p className="text-[11px] text-slate-400">
                    {formatDate(req.createdAt)}
                  </p>
                </td>

                {/* Job Title & Positions */}
                <td className="px-4 py-3.5">
                  <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {req.jobTitle}
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Briefcase className="h-3 w-3 text-slate-400" />
                      {formatEmploymentType(req.employmentType)}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-3 w-3 text-slate-400" />
                      {req.numberOfPositions} {req.numberOfPositions === 1 ? 'position' : 'positions'}
                    </span>
                  </div>
                </td>

                {/* Department & Location */}
                <td className="px-4 py-3.5">
                  <div className="font-medium text-slate-800">{req.department}</div>
                  <p className="text-[11px] text-slate-400">{req.location}</p>
                </td>

                {/* Hiring Manager */}
                <td className="px-4 py-3.5 text-slate-700 font-medium">
                  {req.hiringManager}
                </td>

                {/* Priority */}
                <td className="px-4 py-3.5">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold',
                      priorityStyles[req.priority] ?? priorityStyles.MEDIUM,
                    )}
                  >
                    {req.priority}
                  </span>
                </td>

                {/* Expected Joining Date */}
                <td className="px-4 py-3.5 text-slate-600">
                  {formatDate(req.expectedJoiningDate)}
                </td>

                {/* Status */}
                <td className="px-4 py-3.5">
                  <JobRequisitionStatusBadge status={req.status} />
                </td>

                {/* Action */}
                <td className="px-4 py-3.5 text-right">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(req.id)}
                    className="h-7 gap-1 px-2.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
