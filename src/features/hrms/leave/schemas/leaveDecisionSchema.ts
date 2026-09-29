import { z } from "zod";

/**
 * Comment captured when approving / rejecting a leave request.
 * `required` is driven by LEAVE_REVIEW_POLICY (see hooks/useLeaveAccess.ts) because the
 * backend contract has not yet confirmed whether a comment is mandatory.
 */
export const createLeaveDecisionSchema = (required: boolean) =>
  z.object({
    comment: required
      ? z.string().trim().min(1, "A comment is required")
      : z.string().trim(),
  });

export type LeaveDecisionValues = z.infer<
  ReturnType<typeof createLeaveDecisionSchema>
>;
