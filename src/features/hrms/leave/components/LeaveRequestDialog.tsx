import React, { useEffect } from "react";
import { Dialog } from "radix-ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, X } from "lucide-react";
import type { LeaveRequest } from "@/features/hrms/shared/types";
import { formatDate, humanizeEnum } from "@/features/hrms/shared/utils";
import {
  createLeaveDecisionSchema,
  type LeaveDecisionValues,
} from "../schemas/leaveDecisionSchema";
import { LEAVE_REVIEW_POLICY } from "../hooks/useLeaveAccess";
import type { LeaveDecision } from "../types/leaveWorkflow.types";
import LeaveStatusBadge from "./LeaveStatusBadge";

export type LeaveDialogMode = "details" | LeaveDecision;

interface LeaveRequestDialogProps {
  request: LeaveRequest | null;
  mode: LeaveDialogMode;
  employeeName: string;
  reviewerName: string | null;
  canReview: boolean;
  isSubmitting: boolean;
  errorMessage: string | null;
  onModeChange: (mode: LeaveDialogMode) => void;
  onConfirm: (comment: string) => void;
  onClose: () => void;
}

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="grid grid-cols-3 gap-3 py-2.5 text-sm">
    <dt className="font-medium text-gray-500">{label}</dt>
    <dd className="col-span-2 break-words text-gray-900">{children}</dd>
  </div>
);

export const LeaveRequestDialog: React.FC<LeaveRequestDialogProps> = ({
  request,
  mode,
  employeeName,
  reviewerName,
  canReview,
  isSubmitting,
  errorMessage,
  onModeChange,
  onConfirm,
  onClose,
}) => {
  const isDecision = mode !== "details";
  const commentRequired =
    mode === "REJECT"
      ? LEAVE_REVIEW_POLICY.rejectionCommentRequired
      : LEAVE_REVIEW_POLICY.approvalCommentRequired;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeaveDecisionValues>({
    resolver: zodResolver(createLeaveDecisionSchema(commentRequired)),
    defaultValues: { comment: "" },
  });

  // Start every decision with a clean comment field.
  useEffect(() => {
    reset({ comment: "" });
  }, [request?.id, mode, reset]);

  const open = request !== null;
  const isReject = mode === "REJECT";

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next && !isSubmitting) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content
          onEscapeKeyDown={(e) => {
            if (isSubmitting) e.preventDefault();
          }}
          onInteractOutside={(e) => {
            if (isSubmitting) e.preventDefault();
          }}
          className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[min(100vw-2rem,32rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-gray-200 bg-white p-6 shadow-xl focus:outline-none"
        >
          {request && (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Dialog.Title className="text-lg font-semibold text-gray-900">
                    {mode === "APPROVE"
                      ? "Approve leave request"
                      : isReject
                        ? "Reject leave request"
                        : "Leave request details"}
                  </Dialog.Title>
                  <Dialog.Description className="mt-1 text-sm text-gray-500">
                    {isDecision
                      ? "Review the details below before confirming your decision."
                      : "Full details of this leave request."}
                  </Dialog.Description>
                </div>
                <Dialog.Close
                  disabled={isSubmitting}
                  className="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </Dialog.Close>
              </div>

              <dl className="mt-4 divide-y divide-gray-100 rounded-lg border border-gray-100 bg-gray-50/50 px-4">
                <Row label="Employee">{employeeName}</Row>
                <Row label="Leave type">
                  {humanizeEnum(request.leaveType)} Leave
                </Row>
                <Row label="Dates">
                  {formatDate(request.startDate)} →{" "}
                  {formatDate(request.endDate)}
                </Row>
                <Row label="Duration">
                  {request.days} {request.days === 1 ? "day" : "days"}
                </Row>
                <Row label="Reason">{request.reason || "—"}</Row>
                <Row label="Applied on">{formatDate(request.appliedAt)}</Row>
                <Row label="Status">
                  <LeaveStatusBadge status={request.status} />
                </Row>
                {request.status !== "PENDING" && (
                  <>
                    <Row label="Reviewed by">{reviewerName ?? "—"}</Row>
                    <Row label="Reviewed on">
                      {formatDate(request.reviewedAt)}
                    </Row>
                    <Row label="Comment">{request.reviewComment || "—"}</Row>
                  </>
                )}
              </dl>

              {isDecision && (
                <form
                  onSubmit={handleSubmit((values) => onConfirm(values.comment))}
                  className="mt-5 space-y-4"
                  noValidate
                >
                  <div>
                    <label
                      htmlFor="leave-decision-comment"
                      className="text-sm font-medium text-gray-700"
                    >
                      {isReject ? "Reason for rejection" : "Comment"}
                      {commentRequired ? (
                        <span className="text-red-600"> *</span>
                      ) : (
                        <span className="font-normal text-gray-400">
                          {" "}
                          (optional)
                        </span>
                      )}
                    </label>
                    <textarea
                      id="leave-decision-comment"
                      rows={3}
                      disabled={isSubmitting}
                      aria-invalid={errors.comment ? true : undefined}
                      aria-describedby={
                        errors.comment
                          ? "leave-decision-comment-error"
                          : undefined
                      }
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-gray-50"
                      placeholder={
                        isReject
                          ? "Let the employee know why this request was rejected"
                          : "Add a note for the employee"
                      }
                      {...register("comment")}
                    />
                    {errors.comment && (
                      <p
                        id="leave-decision-comment-error"
                        className="mt-1 text-xs text-red-600"
                      >
                        {errors.comment.message}
                      </p>
                    )}
                  </div>

                  {errorMessage && (
                    <div
                      role="alert"
                      className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                    >
                      <AlertCircle
                        className="mt-0.5 h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={isSubmitting}
                      className="h-10 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`h-10 rounded-lg px-4 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
                        isReject
                          ? "bg-rose-600 hover:bg-rose-700"
                          : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                    >
                      {isSubmitting
                        ? isReject
                          ? "Rejecting…"
                          : "Approving…"
                        : isReject
                          ? "Confirm Rejection"
                          : "Confirm Approval"}
                    </button>
                  </div>
                </form>
              )}

              {!isDecision && canReview && (
                <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => onModeChange("REJECT")}
                    className="h-10 rounded-lg border border-rose-300 bg-white px-4 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
                  >
                    Reject…
                  </button>
                  <button
                    type="button"
                    onClick={() => onModeChange("APPROVE")}
                    className="h-10 rounded-lg bg-emerald-600 px-4 text-sm font-medium text-white transition hover:bg-emerald-700"
                  >
                    Approve…
                  </button>
                </div>
              )}
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LeaveRequestDialog;
