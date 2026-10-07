import { useMemo } from "react";
import type { LeaveRequest } from "@/features/hrms/shared/types";
import { MOCK_CURRENT_EMPLOYEE_ID } from "../mocks/leaveMockIdentity";

/**
 * Review policy — PENDING BACKEND CONTRACT.
 * Flip these once the backend confirms whether a review comment is mandatory.
 */
export const LEAVE_REVIEW_POLICY = {
  approvalCommentRequired: false,
  rejectionCommentRequired: false,
} as const;

export interface LeaveAccess {
  /** Employee whose requests are shown as "mine" and who submits new requests. */
  currentEmployeeId: string;
  /** Whether the user may see requests beyond their own (reviewer view). */
  canReviewAny: boolean;
  /** Whether Approve / Reject should be offered for this request. */
  canReview: (request: LeaveRequest) => boolean;
}

/**
 * THE authorization seam for the leave workflow.
 *
 * All UI visibility for review actions flows through this hook, so the confirmed backend
 * permission model can be plugged in here without touching pages or components
 * (e.g. a backend permission string, or per-request `allowedActions` in the response).
 *
 * Frontend visibility is NOT authorization — the backend must still enforce it and
 * 403 responses are surfaced to the user by the mutation error handling.
 *
 * CURRENT (mock-only) behaviour: no role/permission model exists for leave in the
 * repository, so review is offered for PENDING requests only. This is a placeholder,
 * not a business rule. Self-approval handling is a backend decision.
 */
export function useLeaveAccess(): LeaveAccess {
  return useMemo(
    () => ({
      currentEmployeeId: MOCK_CURRENT_EMPLOYEE_ID,
      canReviewAny: true,
      canReview: (request: LeaveRequest) => request.status === "PENDING",
    }),
    [],
  );
}
