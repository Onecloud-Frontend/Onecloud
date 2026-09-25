import React from 'react';
import type { LeaveRequest, LeaveStatus } from '@/features/hrms/shared/types';
import { formatDate, humanizeEnum } from '@/features/hrms/shared/utils';
import { Calendar, CheckCircle2, Clock, XCircle, Ban } from 'lucide-react';

interface LeaveHistoryTableProps {
  requests: LeaveRequest[];
}

const getStatusBadge = (status: LeaveStatus) => {
  switch (status) {
    case 'APPROVED':
      return {
        icon: CheckCircle2,
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        label: 'Approved',
      };
    case 'PENDING':
      return {
        icon: Clock,
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        label: 'Pending Review',
      };
    case 'REJECTED':
      return {
        icon: XCircle,
        bg: 'bg-rose-50 text-rose-700 border-rose-200',
        label: 'Rejected',
      };
    case 'CANCELLED':
      return {
        icon: Ban,
        bg: 'bg-gray-100 text-gray-700 border-gray-200',
        label: 'Cancelled',
      };
    default:
      return {
        icon: Clock,
        bg: 'bg-gray-100 text-gray-700 border-gray-200',
        label: status,
      };
  }
};

export const LeaveHistoryTable: React.FC<LeaveHistoryTableProps> = ({ requests }) => {
  if (requests.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <Calendar className="mx-auto h-8 w-8 text-gray-400" />
        <p className="mt-2 text-sm font-medium text-gray-900">
          No Recent Leave Records
        </p>
        <p className="mt-1 text-xs text-gray-500">
          You have not submitted any leave requests yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Leave Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Duration & Dates
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Days
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Applied On
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {requests.map((request) => {
              const statusConfig = getStatusBadge(request.status);
              const StatusIcon = statusConfig.icon;

              return (
                <tr key={request.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">
                    {humanizeEnum(request.leaveType)} Leave
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    <span>{formatDate(request.startDate)}</span>
                    <span className="mx-1 text-gray-400">→</span>
                    <span>{formatDate(request.endDate)}</span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {request.days} {request.days === 1 ? 'day' : 'days'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {request.reason || '—'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {formatDate(request.appliedAt)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusConfig.bg}`}
                    >
                      <StatusIcon className="h-3.5 w-3.5" />
                      {statusConfig.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveHistoryTable;
