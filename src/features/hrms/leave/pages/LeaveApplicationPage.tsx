import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { HRMS_ROUTES } from "@/features/hrms/shared/constants";
import { useToast } from "@/shared/hooks/useToast";
import LeaveApplicationForm from "../forms/LeaveApplicationForm";
import { useLeaveBalances } from "../hooks/useLeave";
import { useApplyLeave } from "../hooks/useLeaveMutations";
import { useLeaveAccess } from "../hooks/useLeaveAccess";
import { getLeaveErrorMessage } from "../services/leaveErrors";
import type { LeaveApplicationValues } from "../schemas/leaveApplicationSchema";

/** Route: /hrms/leave/apply (Developer 6) */
export const LeaveApplicationPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { currentEmployeeId } = useLeaveAccess();
  const { data: balances = [] } = useLeaveBalances();
  const applyLeave = useApplyLeave();

  const handleSubmit = (values: LeaveApplicationValues) => {
    if (applyLeave.isPending) return; // guard against duplicate submissions
    applyLeave.mutate(
      { employeeId: currentEmployeeId, ...values },
      {
        onSuccess: () => {
          toast.success(
            "Leave request submitted",
            "Your request is pending approval.",
          );
          navigate(HRMS_ROUTES.leave.requests);
        },
        onError: (error) => {
          toast.error(
            "Could not submit leave request",
            getLeaveErrorMessage(error),
          );
        },
      },
    );
  };

  return (
    <div className="min-h-full space-y-6 bg-gray-50/50 p-6">
      <div>
        <Link
          to={HRMS_ROUTES.leave.requests}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Leave Requests
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
          Apply for Leave
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Submit a leave request for approval.
        </p>
      </div>

      <div className="max-w-3xl">
        <LeaveApplicationForm
          balances={balances}
          isSubmitting={applyLeave.isPending}
          errorMessage={
            applyLeave.isError ? getLeaveErrorMessage(applyLeave.error) : null
          }
          onSubmit={handleSubmit}
          onCancel={() => navigate(HRMS_ROUTES.leave.requests)}
        />
      </div>
    </div>
  );
};

export default LeaveApplicationPage;
