import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { interviewFeedbackService } from "../services/interviewFeedbackService";

import type { InterviewFeedbackFormValues } from "../types/interviewFeedback.types";

const interviewFeedbackQueryKey = ["hrms", "recruitment", "interview-feedback"];

export const useInterviewFeedback = () => {
  return useQuery({
    queryKey: interviewFeedbackQueryKey,
    queryFn: () => interviewFeedbackService.getInterviewFeedback(),
  });
};

export const useSubmitInterviewFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      interviewId,
      feedback,
    }: {
      interviewId: string;
      feedback: InterviewFeedbackFormValues;
    }) =>
      interviewFeedbackService.submitInterviewFeedback(interviewId, feedback),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: interviewFeedbackQueryKey,
      });
    },
  });
};
