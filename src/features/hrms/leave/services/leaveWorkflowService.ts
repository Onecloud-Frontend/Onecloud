import type {
  CreateLeaveRequestPayload,
  LeaveRequest,
  LeaveStatus,
} from "@/features/hrms/shared/types";
import { mockLeaveRequests } from "@/features/hrms/shared/mocks";
import { ApiError } from "@/core/errors/apiError";
import type { ReviewLeaveInput } from "../types/leaveWorkflow.types";
import { MOCK_CURRENT_EMPLOYEE_ID } from "../mocks/leaveMockIdentity";

/**
 * Developer 6 (Leave workflows): submit / approve / reject run against the shared
 * in-memory mock data until the backend leave contract is confirmed.
 * Flip to real calls only after the contract (method, path, payloads, errors,
 * permissions) is confirmed with the integration owner — no endpoints are assumed here.
 */
const USE_MOCK = true;

const CONTRACT_PENDING = "Leave API contract not yet confirmed.";
const mockDelay = (ms = 400) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/** MOCK ONLY: inclusive calendar-day count. Real duration rules are backend-owned. */
function mockCountDays(startDate: string, endDate: string): number {
  const ms = Date.parse(endDate) - Date.parse(startDate);
  return Math.floor(ms / 86_400_000) + 1;
}

function mockNextId(): string {
  const max = mockLeaveRequests.reduce((acc, r) => {
    const n = Number(r.id.replace(/^lv-/, ""));
    return Number.isFinite(n) ? Math.max(acc, n) : acc;
  }, 0);
  return `lv-${max + 1}`;
}

async function mockReview(
  { requestId, comment }: ReviewLeaveInput,
  status: Extract<LeaveStatus, "APPROVED" | "REJECTED">,
): Promise<LeaveRequest> {
  await mockDelay();
  const index = mockLeaveRequests.findIndex((r) => r.id === requestId);
  if (index === -1) {
    throw new ApiError("Leave request not found", 404);
  }
  const current = mockLeaveRequests[index];
  if (current.status !== "PENDING") {
    throw new ApiError("This request is no longer pending", 409);
  }
  const updated: LeaveRequest = {
    ...current,
    status,
    reviewedBy: MOCK_CURRENT_EMPLOYEE_ID,
    reviewedAt: new Date().toISOString(),
    reviewComment: comment?.trim() ? comment.trim() : null,
  };
  // Replace in place so the Leave Dashboard (which reads the same array) stays consistent.
  mockLeaveRequests[index] = updated;
  return { ...updated };
}

export const leaveWorkflowService = {
  /**
   * Submits a new leave request. Server-side rules (balance, overlap, holidays…) are
   * backend-owned; the mock only guards the date order.
   */
  async createLeaveRequest(
    payload: CreateLeaveRequestPayload,
  ): Promise<LeaveRequest> {
    if (USE_MOCK) {
      await mockDelay();
      if (payload.endDate < payload.startDate) {
        throw new ApiError("End date cannot be before start date", 422);
      }
      const created: LeaveRequest = {
        id: mockNextId(),
        employeeId: payload.employeeId,
        leaveType: payload.leaveType,
        startDate: payload.startDate,
        endDate: payload.endDate,
        days: mockCountDays(payload.startDate, payload.endDate),
        reason: payload.reason,
        status: "PENDING",
        appliedAt: new Date().toISOString(),
        reviewedBy: null,
        reviewedAt: null,
        reviewComment: null,
      };
      mockLeaveRequests.unshift(created);
      return { ...created };
    }
    // BLOCKED — BACKEND CONTRACT REQUIRED
    throw new Error(CONTRACT_PENDING);
  },

  /** Approves a pending leave request. */
  async approveLeaveRequest(input: ReviewLeaveInput): Promise<LeaveRequest> {
    if (USE_MOCK) return mockReview(input, "APPROVED");
    // BLOCKED — BACKEND CONTRACT REQUIRED
    throw new Error(CONTRACT_PENDING);
  },

  /** Rejects a pending leave request. */
  async rejectLeaveRequest(input: ReviewLeaveInput): Promise<LeaveRequest> {
    if (USE_MOCK) return mockReview(input, "REJECTED");
    // BLOCKED — BACKEND CONTRACT REQUIRED
    throw new Error(CONTRACT_PENDING);
  },
};
