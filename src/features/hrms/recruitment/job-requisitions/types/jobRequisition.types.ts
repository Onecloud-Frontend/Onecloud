export const JOB_REQUISITION_STATUSES = [
  'DRAFT',
  'PENDING_APPROVAL',
  'APPROVED',
  'JOB_OPENING',
] as const;

export type JobRequisitionStatus = (typeof JOB_REQUISITION_STATUSES)[number];

export const EMPLOYMENT_TYPES = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY'] as const;
export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

export const REQUISITION_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const;
export type RequisitionPriority = (typeof REQUISITION_PRIORITIES)[number];

export interface JobRequisition {
  id: string;
  jobTitle: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  numberOfPositions: number;
  experience: string;
  skills: string[];
  education: string;
  description: string;
  hiringManager: string;
  priority: RequisitionPriority;
  expectedJoiningDate: string;
  status: JobRequisitionStatus;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  approvedAt?: string;
  jobOpeningCreatedAt?: string;
}

export interface JobRequisitionFormValues {
  jobTitle: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  numberOfPositions: number;
  experience: string;
  skills: string[];
  education: string;
  description: string;
  hiringManager: string;
  priority: RequisitionPriority;
  expectedJoiningDate: string;
}

export interface JobRequisitionListResult {
  data: JobRequisition[];
  total: number;
}
