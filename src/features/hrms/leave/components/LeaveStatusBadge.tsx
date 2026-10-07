import React from "react";
import { Ban, CheckCircle2, Clock, XCircle } from "lucide-react";
import type { LeaveStatus } from "@/features/hrms/shared/types";

const STATUS_CONFIG: Record<
  LeaveStatus,
  { icon: typeof Clock; className: string; label: string }
> = {
  PENDING: {
    icon: Clock,
    className: "bg-amber-50 text-amber-700 border-amber-200",
    label: "Pending Review",
  },
  APPROVED: {
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    label: "Approved",
  },
  REJECTED: {
    icon: XCircle,
    className: "bg-rose-50 text-rose-700 border-rose-200",
    label: "Rejected",
  },
  CANCELLED: {
    icon: Ban,
    className: "bg-gray-100 text-gray-700 border-gray-200",
    label: "Cancelled",
  },
};

interface LeaveStatusBadgeProps {
  status: LeaveStatus;
}

export const LeaveStatusBadge: React.FC<LeaveStatusBadgeProps> = ({
  status,
}) => {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {config.label}
    </span>
  );
};

export default LeaveStatusBadge;
