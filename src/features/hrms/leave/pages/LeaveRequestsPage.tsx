import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, CalendarPlus, Inbox, RefreshCw } from "lucide-react";
import { HRMS_ROUTES } from "@/features/hrms/shared/constants";
import { useEmployees } from "@/features/hrms/shared/hooks";
import { formatFullName } from "@/features/hrms/shared/utils";
import type { LeaveRequest, LeaveStatus } from "@/features/hrms/shared/types";
import { useToast } from "@/shared/hooks/useToast";
import LeaveRequestDialog, {
  type LeaveDialogMode,
} from "../components/LeaveRequestDialog";
import LeaveRequestsTable from "../components/LeaveRequestsTable";
import { useLeaveRequests } from "../hooks/useLeave";
import { useApproveLeave, useRejectLeave } from "../hooks/useLeaveMutations";
import { useLeaveAccess } from "../hooks/useLeaveAccess";
import { getLeaveErrorMessage } from "../services/leaveErrors";

type Scope = "all" | "mine";
type StatusFilter = "ALL" | LeaveStatus;

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
  { value: "CANCELLED", label: "Cancelled" },
];

interface DialogState {
  requestId: string;
  mode: LeaveDialogMode;
}

/** Route: /hrms/leave/requests (Developer 6) */
export const LeaveRequestsPage: React.FC = () => {
  const toast = useToast();
  const access = useLeaveAccess();

  const [scope, setScope] = useState<Scope>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [dialog, setDialog] = useState<DialogState | null>(null);

  // Non-reviewers only ever see their own requests; reviewers can switch scope.
  const effectiveScope: Scope = access.canReviewAny ? scope : "mine";
  const employeeId =
    effectiveScope === "mine" ? access.currentEmployeeId : undefined;

  const {
    data: requests = [],
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useLeaveRequests(employeeId);
  const { data: employees } = useEmployees({ limit: 100 });

  const approve = useApproveLeave();
  const reject = useRejectLeave();
  const activeMutation = dialog?.mode === "REJECT" ? reject : approve;

  const nameById = useMemo(() => {
    const map = new Map<string, string>();
    employees?.data.forEach((e) => map.set(e.employeeId, formatFullName(e)));
    return map;
  }, [employees]);
  const getEmployeeName = (id: string) => nameById.get(id) ?? id;

  const sorted = useMemo(
    () => [...requests].sort((a, b) => b.appliedAt.localeCompare(a.appliedAt)),
    [requests],
  );

  const counts = useMemo(() => {
    const c: Record<StatusFilter, number> = {
      ALL: sorted.length,
      PENDING: 0,
      APPROVED: 0,
      REJECTED: 0,
      CANCELLED: 0,
    };
    sorted.forEach((r) => {
      c[r.status] += 1;
    });
    return c;
  }, [sorted]);

  const visible =
    statusFilter === "ALL"
      ? sorted
      : sorted.filter((r) => r.status === statusFilter);
  const activeRequest = dialog
    ? (sorted.find((r) => r.id === dialog.requestId) ?? null)
    : null;

  const openDialog = (request: LeaveRequest, mode: LeaveDialogMode) => {
    approve.reset();
    reject.reset();
    setDialog({ requestId: request.id, mode });
  };

  const closeDialog = () => {
    setDialog(null);
    approve.reset();
    reject.reset();
  };

  const handleConfirm = (comment: string) => {
    if (!dialog || activeMutation.isPending) return; // prevent duplicate submissions
    const isReject = dialog.mode === "REJECT";
    const mutation = isReject ? reject : approve;
    mutation.mutate(
      { requestId: dialog.requestId, comment },
      {
        onSuccess: () => {
          toast.success(
            isReject ? "Leave request rejected" : "Leave request approved",
          );
          closeDialog();
        },
        onError: (error) => {
          toast.error(
            isReject ? "Could not reject request" : "Could not approve request",
            getLeaveErrorMessage(error),
          );
        },
      },
    );
  };

  return (
    <div className="min-h-full space-y-6 bg-gray-50/50 p-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Leave Requests
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Track leave requests and their approval status.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isLoading || isFetching}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <RefreshCw
              className={`h-4 w-4 text-gray-500 ${isFetching ? "animate-spin" : ""}`}
            />
            {isFetching ? "Refreshing..." : "Refresh"}
          </button>
          <Link
            to={HRMS_ROUTES.leave.apply}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <CalendarPlus className="h-4 w-4" aria-hidden="true" />
            Apply Leave
          </Link>
        </div>
      </div>

      {/* Scope + status filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filter by status"
          className="flex flex-wrap gap-2"
        >
          {STATUS_TABS.map((tab) => {
            const selected = statusFilter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                aria-pressed={selected}
                onClick={() => setStatusFilter(tab.value)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  selected
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-1.5 text-xs ${
                    selected
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {counts[tab.value]}
                </span>
              </button>
            );
          })}
        </div>

        {access.canReviewAny && (
          <div
            role="group"
            aria-label="Request scope"
            className="inline-flex rounded-lg border border-gray-300 bg-white p-0.5 shadow-sm"
          >
            {(["all", "mine"] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={scope === value}
                onClick={() => setScope(value)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  scope === value
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {value === "all" ? "All requests" : "My requests"}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <div
          role="status"
          className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm"
        >
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          <p className="mt-4 text-sm font-medium text-gray-600">
            Loading leave requests...
          </p>
        </div>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <AlertCircle
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600"
              aria-hidden="true"
            />
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-red-800">
                Unable to load leave requests
              </h2>
              <p className="mt-1 text-sm text-red-600">
                Something went wrong while retrieving leave requests. Please try
                again.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {!isLoading && !isError && (
        <>
          {visible.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
              <Inbox
                className="mx-auto h-10 w-10 text-gray-400"
                aria-hidden="true"
              />
              <h2 className="mt-3 text-base font-semibold text-gray-900">
                {statusFilter === "ALL"
                  ? "No leave requests"
                  : `No ${statusFilter.toLowerCase()} requests`}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {statusFilter === "ALL"
                  ? effectiveScope === "mine"
                    ? "You have not submitted any leave requests yet."
                    : "There are no leave requests to show."
                  : "Try a different status filter."}
              </p>
            </div>
          ) : (
            <LeaveRequestsTable
              requests={visible}
              showEmployee={effectiveScope === "all"}
              getEmployeeName={getEmployeeName}
              canReview={access.canReview}
              onView={(r) => openDialog(r, "details")}
              onApprove={(r) => openDialog(r, "APPROVE")}
              onReject={(r) => openDialog(r, "REJECT")}
            />
          )}
        </>
      )}

      <LeaveRequestDialog
        request={activeRequest}
        mode={dialog?.mode ?? "details"}
        employeeName={
          activeRequest ? getEmployeeName(activeRequest.employeeId) : ""
        }
        reviewerName={
          activeRequest?.reviewedBy
            ? getEmployeeName(activeRequest.reviewedBy)
            : null
        }
        canReview={activeRequest ? access.canReview(activeRequest) : false}
        isSubmitting={activeMutation.isPending}
        errorMessage={
          activeMutation.isError
            ? getLeaveErrorMessage(activeMutation.error)
            : null
        }
        onModeChange={(mode) => {
          approve.reset();
          reject.reset();
          setDialog((d) => (d ? { ...d, mode } : d));
        }}
        onConfirm={handleConfirm}
        onClose={closeDialog}
      />
    </div>
  );
};

export default LeaveRequestsPage;
