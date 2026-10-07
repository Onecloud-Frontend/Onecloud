export type OpportunityStage =
  | "QUALIFICATION"
  | "DISCOVERY"
  | "PROPOSAL"
  | "NEGOTIATION"
  | "CLOSED_WON"
  | "CLOSED_LOST";

export interface Opportunity {
  id: string;
  opportunityCode: string;
  name: string;
  customerId: string;
  contactId?: string;
  leadId?: string;
  stage: OpportunityStage;
  probability: number;
  expectedRevenue: number;
  amount: number;
  expectedCloseDate: string;
  assignedTo: string;
  source?: LeadSource;
  competitors?: string[];
  description?: string;
  createdAt: string;
  updatedAt: string;
}