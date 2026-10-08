import { z } from "zod";
import type { LeaveType } from "@/features/hrms/shared/types";

/**
 * Leave types come from the existing LeaveType union.
 * Which types an employee may actually apply for is decided by the backend.
 */
export const LEAVE_TYPE_VALUES = [
  "CASUAL",
  "SICK",
  "EARNED",
  "UNPAID",
  "MATERNITY",
  "PATERNITY",
] as const satisfies readonly LeaveType[];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Only rules supported by the current types/repository are enforced here.
 * Backend remains authoritative (balance, overlap, past dates, holidays, half-day,
 * attachments, reason length etc. are intentionally NOT validated on the client).
 */
export const leaveApplicationSchema = z
  .object({
    leaveType: z.enum(LEAVE_TYPE_VALUES, { error: "Select a leave type" }),
    startDate: z
      .string()
      .min(1, "Start date is required")
      .regex(ISO_DATE, "Enter a valid start date"),
    endDate: z
      .string()
      .min(1, "End date is required")
      .regex(ISO_DATE, "Enter a valid end date"),
    reason: z.string().trim().min(1, "Reason is required"),
  })
  .refine(
    (v) =>
      !ISO_DATE.test(v.startDate) ||
      !ISO_DATE.test(v.endDate) ||
      v.endDate >= v.startDate,
    { path: ["endDate"], message: "End date cannot be before start date" },
  );

export type LeaveApplicationValues = z.infer<typeof leaveApplicationSchema>;
