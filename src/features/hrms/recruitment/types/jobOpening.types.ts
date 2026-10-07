export type JobOpeningStatus = "Open" | "Paused" | "Closed";

export type EmploymentType =
  | "Full Time"
  | "Part Time"
  | "Contract"
  | "Internship";

export interface JobOpening {
  id: number;
  jobTitle: string;
  requisitionId: number;
  requisitionTitle: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  experience: string;
  skills: string[];
  positions: number;
  closingDate: string;
  status: JobOpeningStatus;
  createdDate: string;
}

export interface JobOpeningFormData {
  jobTitle: string;
  requisitionId: number;
  requisitionTitle: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  experience: string;
  skills: string[];
  positions: number;
  closingDate: string;
  status: JobOpeningStatus;
}