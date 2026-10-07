/**
 * Developer 6 — Leave Application & Approvals
 * Workflow-only types. Core models (LeaveRequest, LeaveStatus, LeaveType,
 * CreateLeaveRequestPayload) live in shared/types/leave.types.ts and are reused as-is.
 *
 * NOTE: request/response shapes below are UI-side assumptions for the mock layer.
 * They must be aligned with the backend DTOs once the leave API contract is confirmed.
 */

/** Input for approving or rejecting a leave request. */
export interface ReviewLeaveInput {
  requestId: string;
  /** Optional reviewer comment. Whether it is required is a backend/business decision. */
  comment?: string;
}

export type LeaveDecision = "APPROVE" | "REJECT";
