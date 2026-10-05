import React from "react";
import { Check, Eye, X } from "lucide-react";
import type { LeaveRequest } from "@/features/hrms/shared/types";
import { formatDate, humanizeEnum } from "@/features/hrms/shared/utils";
import LeaveStatusBadge from "./LeaveStatusBadge";

interface LeaveRequestsTableProps {
  requests: LeaveRequest[];
  showEmployee: boolean;
  getEmployeeName: (employeeId: string) => string;
  canReview: (request: LeaveRequest) => boolean;
  onView: (request: LeaveRequest) => void;
  onApprove: (request: LeaveRequest) => void;
  onReject: (request: LeaveRequest) => void;
}

const thClass =
  "px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500";

export const LeaveRequestsTable: React.FC<LeaveRequestsTableProps> = ({
  requests,
  showEmployee,
  getEmployeeName,
  canReview,
  onView,
  onApprove,
  onReject,
}) => (
  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <caption className="sr-only">Leave requests</caption>
        <thead className="bg-gray-50">
          <tr>
            {showEmployee && (
              <th scope="col" className={thClass}>
                Employee
              </th>
            )}
            <th scope="col" className={thClass}>
              Leave Type
            </th>
            <th scope="col" className={thClass}>
              Dates
            </th>
            <th scope="col" className={thClass}>
              Days
            </th>
            <th scope="col" className={thClass}>
              Reason
            </th>
            <th scope="col" className={thClass}>
              Applied On
            </th>
            <th scope="col" className={thClass}>
              Status
            </th>
            <th scope="col" className={`${thClass} text-right`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {requests.map((request) => {
            const name = getEmployeeName(request.employeeId);
            const reviewable = canReview(request);
            return (
              <tr
                key={request.id}
                className="transition-colors hover:bg-gray-50/80"
              >
                {showEmployee && (
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <div className="font-semibold text-gray-900">{name}</div>
                    {name !== request.employeeId && (
                      <div className="text-xs text-gray-500">
                        {request.employeeId}
                      </div>
                    )}
                  </td>
                )}
                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">
                  {humanizeEnum(request.leaveType)} Leave
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                  {formatDate(request.startDate)}
                  <span className="mx-1 text-gray-400" aria-hidden="true">
                    →
                  </span>
                  <span className="sr-only"> to </span>
                  {formatDate(request.endDate)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {request.days} {request.days === 1 ? "day" : "days"}
                </td>
                <td
                  className="max-w-xs truncate px-6 py-4 text-sm text-gray-600"
                  title={request.reason || undefined}
                >
                  {request.reason || "—"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {formatDate(request.appliedAt)}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <LeaveStatusBadge status={request.status} />
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onView(request)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                      aria-label={`View ${humanizeEnum(request.leaveType)} leave request from ${name}`}
                    >
                      <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                      View
                    </button>
                    {reviewable && (
                      <>
                        <button
                          type="button"
                          onClick={() => onApprove(request)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
                          aria-label={`Approve leave request from ${name}`}
                        >
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => onReject(request)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-rose-300 bg-white px-2.5 py-1.5 text-xs font-medium text-rose-700 shadow-sm transition hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-1"
                          aria-label={`Reject leave request from ${name}`}
                        >
                          <X className="h-3.5 w-3.5" aria-hidden="true" />
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default LeaveRequestsTable;
