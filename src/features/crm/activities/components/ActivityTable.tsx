import React from "react";
import {
  CalendarDays,
  Clock3,
  Eye,
  Mail,
  Phone,
  Pencil,
  StickyNote,
  Users,
  ClipboardList,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import type {
  Activity,
  ActivityStatus,
  ActivityType,
} from "../types/activity.types";
interface ActivityTableProps {
  activities: Activity[];
}
const typeConfig: Record<
  ActivityType,
  {
    label: string;
    icon: React.ElementType;
    className: string;
  }
> = {
  CALL: {
    label: "Call",
    icon: Phone,
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  MEETING: {
    label: "Meeting",
    icon: Users,
    className: "bg-purple-50 text-purple-700 border-purple-200",
  },
  TASK: {
    label: "Task",
    icon: ClipboardList,
    className: "bg-orange-50 text-orange-700 border-orange-200",
  },
  NOTE: {
    label: "Note",
    icon: StickyNote,
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  EMAIL: {
    label: "Email",
    icon: Mail,
    className: "bg-green-50 text-green-700 border-green-200",
  },
};
const statusConfig: Record<
  ActivityStatus,
  {
    label: string;
    className: string;
  }
> = {
  PENDING: {
    label: "Pending",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};
const formatDate = (value?: string) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
const ActivityTable: React.FC<ActivityTableProps> = ({ activities }) => {
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="max-h-[500px] overflow-y-auto overflow-x-auto">
        <table className="min-w-max w-full table-auto text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-600">
                Activity ID
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-600">
                Type
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-600">
                Subject
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-600">
                Related To
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-600">
                Owner
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-600">
                Priority
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-600">
                Status
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-600">
                Start Date
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-600">
                End Date
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-600">
                Due Date
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-600">
                Created Date
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-slate-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {activities.map((activity) => {
              const type = typeConfig[activity.activityType];
              const status = statusConfig[activity.status];
              const TypeIcon = type.icon;
              return (
                <tr
                  key={activity.id}
                  className="transition-colors hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-slate-900">
                    {activity.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${type.className}`}
                    >
                      <TypeIcon className="h-3.5 w-3.5" />
                      {type.label}
                    </span>
                  </td>
                  <td className="max-w-240px px-4 py-4">
                    <button
                      type="button"
                      onClick={() => navigate(`/crm/activities/${activity.id}`)}
                      className="text-left font-medium text-slate-900 hover:text-blue-600"
                    >
                      {activity.subject}
                    </button>
                    {activity.description && (
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {activity.description}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1 text-xs">
                      {activity.relatedLead && (
                        <div className="whitespace-nowrap text-slate-700">
                          Lead: {activity.relatedLead}
                        </div>
                      )}
                      {activity.relatedCustomer && (
                        <div className="whitespace-nowrap text-slate-700">
                          Customer: {activity.relatedCustomer}
                        </div>
                      )}
                      {activity.relatedContact && (
                        <div className="whitespace-nowrap text-slate-700">
                          Contact: {activity.relatedContact}
                        </div>
                      )}
                      {activity.relatedOpportunity && (
                        <div className="whitespace-nowrap text-slate-500">
                          Opportunity: {activity.relatedOpportunity}
                        </div>
                      )}
                      {!activity.relatedLead &&
                        !activity.relatedCustomer &&
                        !activity.relatedContact &&
                        !activity.relatedOpportunity && (
                          <span className="text-slate-400">-</span>
                        )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-slate-700">
                    {activity.owner}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <span
                      className={`font-medium ${
                        activity.priority === "HIGH"
                          ? "text-red-600"
                          : activity.priority === "MEDIUM"
                            ? "text-orange-600"
                            : "text-slate-600"
                      }`}
                    >
                      {activity.priority}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                      {formatDate(activity.startDate)}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                      {formatDate(activity.endDate)}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5 text-slate-400" />
                      {formatDate(activity.dueDate)}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                      {formatDate(activity.createdDate)}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        title="View"
                        onClick={() =>
                          navigate(`/crm/activities/${activity.id}`)
                        }
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        title="Edit"
                        onClick={() =>
                          navigate(`/crm/activities/${activity.id}/edit`)
                        }
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {activities.length === 0 && (
          <div className="flex min-h-[48] items-center justify-center p-8 text-sm text-slate-500">
            No activities found.
          </div>
        )}
      </div>
    </div>
  );
};
export default ActivityTable;
