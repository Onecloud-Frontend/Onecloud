export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "UNQUALIFIED"
  | "CONVERTED"
  | "LOST";

export type LeadRating = "HOT" | "WARM" | "COLD";

export type LeadSource =
  | "WEBSITE"
  | "REFERRAL"
  | "SOCIAL_MEDIA"
  | "EMAIL"
  | "EVENT"
  | "COLD_CALL";

export interface Lead {
  id: string;
  leadCode: string;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  rating: LeadRating;
  score: number;
  estimatedValue: number;
  assignedTo: string;
  convertedCustomerId?: string;
  convertedContactId?: string;
  convertedOpportunityId?: string;
  createdAt: string;
  updatedAt: string;
}