import type { Candidate } from '../candidates/types/candidate.types';
import type { JobOpening } from './jobOpening.types';

export type ApplicationStatus =
  | 'APPLIED'
  | 'UNDER_REVIEW'
  | 'SHORTLISTED'
  | 'REJECTED'
  | 'INTERVIEW'
  | 'SELECTED'
  | 'OFFER'
  | 'HIRED';

export interface Application {
  id: string;
  candidateId: Candidate['candidateId'];
  candidateName: string;
  candidateEmail: string;
jobOpeningId: JobOpening['id'];
  jobTitle: string;
  appliedDate: string;
  recruiterId: string;
  recruiterName: string;
  status: ApplicationStatus;
  currentStage: string;
}

export interface ApplicationFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: ApplicationStatus;
  recruiterId?: string;
  jobOpeningId?: JobOpening['id'];
  sortBy?: keyof Application;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedApplications {
  data: Application[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}