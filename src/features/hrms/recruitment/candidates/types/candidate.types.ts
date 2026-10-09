export type CandidateStatus =
  | "NEW"
  | "SCREENING"
  | "SHORTLISTED"
  | "INTERVIEW"
  | "OFFERED"
  | "HIRED"
  | "REJECTED";

export type CandidateSource =
  | "CAREER_PAGE"
  | "LINKEDIN"
  | "REFERRAL"
  | "JOB_PORTAL"
  | "AGENCY"
  | "OTHER";

export interface Candidate {
  candidateId: string;

  // Personal Information
  name: string;
  email: string;
  phone: string;
  location: string;

  // Professional Information
  currentCompany: string;
  experience: number;
  skills: string[];
  currentPosition: string;

  // Recruitment Information
  source: CandidateSource;
  appliedPosition: string;
  status: CandidateStatus;

  createdAt: string;
  updatedAt: string;
}

export interface CandidateFilters {
  search?: string;

  source?: CandidateSource;

  status?: CandidateStatus;

  appliedPosition?: string;

  page?: number;

  limit?: number;

  sortBy?: keyof Candidate;

  sortOrder?: "asc" | "desc";
}

export interface PaginatedCandidates {
  data: Candidate[];

  total: number;

  page: number;

  limit: number;

  totalPages: number;
}