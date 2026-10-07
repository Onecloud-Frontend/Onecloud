export type InterviewRecommendation =
  | "Strong Hire"
  | "Hire"
  | "Hold"
  | "Reject";

export interface InterviewFeedbackFormValues {
  technicalSkills: number;
  communication: number;
  problemSolving: number;
  cultureFit: number;
  experience: number;
  overallRating: number;
  recommendation: InterviewRecommendation;
}

export interface InterviewFeedbackRecord {
  id: string;
  candidateName: string;
  jobTitle: string;
  round: string;
  interviewType: string;
  interviewDate: string;
  interviewerName: string;
  feedback?: InterviewFeedbackFormValues;
}
