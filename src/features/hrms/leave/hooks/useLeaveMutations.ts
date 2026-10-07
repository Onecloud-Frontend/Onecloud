import { useMutation, useQueryClient } from "@tanstack/react-query";
import { hrmsQueryKeys } from "@/features/hrms/shared/constants";
import type { CreateLeaveRequestPayload } from "@/features/hrms/shared/types";
import { leaveWorkflowService } from "../services/leaveWorkflowService";
import type { ReviewLeaveInput } from "../types/leaveWorkflow.types";

/**
 * Invalidating leave.all() refreshes requests, balances and the dashboard summary,
 * since every leave query key is nested under it.
 */
function useInvalidateLeave() {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({ queryKey: hrmsQueryKeys.leave.all() });
}

export const useApplyLeave = () => {
  const invalidate = useInvalidateLeave();
  return useMutation({
    mutationFn: (payload: CreateLeaveRequestPayload) =>
      leaveWorkflowService.createLeaveRequest(payload),
    onSuccess: invalidate,
  });
};

export const useApproveLeave = () => {
  const invalidate = useInvalidateLeave();
  return useMutation({
    mutationFn: (input: ReviewLeaveInput) =>
      leaveWorkflowService.approveLeaveRequest(input),
    onSuccess: invalidate,
  });
};

export const useRejectLeave = () => {
  const invalidate = useInvalidateLeave();
  return useMutation({
    mutationFn: (input: ReviewLeaveInput) =>
      leaveWorkflowService.rejectLeaveRequest(input),
    onSuccess: invalidate,
  });
};
