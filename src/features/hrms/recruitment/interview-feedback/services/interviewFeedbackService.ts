import { interviewFeedbackMock } from "../mocks/interviewFeedback.mock";

import type {
  InterviewFeedbackFormValues,
  InterviewFeedbackRecord,
} from "../types/interviewFeedback.types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const interviewFeedbackService = {
  async getInterviewFeedback(): Promise<InterviewFeedbackRecord[]> {
    await delay(500);

    return [...interviewFeedbackMock];
  },

  async submitInterviewFeedback(
    interviewId: string,
    feedback: InterviewFeedbackFormValues,
  ): Promise<InterviewFeedbackRecord> {
    await delay(500);

    const interview = interviewFeedbackMock.find(
      (item) => item.id === interviewId,
    );

    if (!interview) {
      throw new Error("Interview not found");
    }

    interview.feedback = feedback;

    return { ...interview };
  },
};
