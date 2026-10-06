export type OfferStatus =
  | "Draft"
  | "Pending Approval"
  | "Sent"
  | "Accepted"
  | "Rejected"
  | "Expired";

export type EmploymentType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship";

export interface Offer {
  id: string;

  candidateName: string;
  candidateEmail: string;

  position: string;
  department: string;

  joiningDate: string;
  employmentType: EmploymentType;

  salary: number;
  benefits: string[];

  offerExpiry: string;

  status: OfferStatus;

  createdAt: string;
  updatedAt: string;
}