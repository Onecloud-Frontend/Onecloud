export const INTERVIEW_TYPES = ['Phone', 'Video', 'In Person', 'Technical', 'HR', 'Managerial'] as const;
export type InterviewType = (typeof INTERVIEW_TYPES)[number];

export const INTERVIEW_STATUSES = ['Scheduled', 'Completed', 'Cancelled'] as const;
export type InterviewStatus = (typeof INTERVIEW_STATUSES)[number];

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  jobOpeningId: string;
  jobTitle: string;
  round: number;
  type: InterviewType;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm (24h)
  durationMinutes: number;
  interviewers: string[];
  location?: string;
  meetingLink?: string;
  notes?: string;
  status: InterviewStatus;
  createdAt: string;
}

/** What the schedule/edit form submits. Names are resolved by the service. */
export interface InterviewInput {
  candidateId: string;
  jobOpeningId: string;
  round: number;
  type: InterviewType;
  date: string;
  time: string;
  durationMinutes: number;
  interviewers: string[];
  location?: string;
  meetingLink?: string;
  notes?: string;
}

export interface InterviewFilters {
  search?: string;
  type?: InterviewType | '';
  status?: InterviewStatus | '';
}

export interface SelectOption {
  value: string;
  label: string;
}