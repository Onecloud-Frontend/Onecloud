export type PipelineStage =
  | "Prospecting"
  | "Qualification"
  | "Proposal"
  | "Negotiation"
  | "Closed Won"
  | "Closed Lost";

export type OpportunityStatus = "Open" | "Won" | "Lost";

export type ActivityType = "CALL" | "MEETING" | "EMAIL" | "TASK" | "NOTE";

export interface PipelineStageConfig {
  id: PipelineStage;
  label: string;
  probability: number;
}

export interface PipelineActivity {
  id: string;
  activityType: ActivityType;
  subject: string;
  description: string;

  relatedOpportunity: string;

  owner: string;
  priority: string;
  status: string;

  startDate: string;
  endDate?: string;
  dueDate?: string;

  reminder?: boolean;
  location?: string;
  notes?: string;

  createdDate: string;
}

export interface StageHistoryItem {
  stage: PipelineStage;
  enteredAt: string;
  exitedAt?: string;
  daysInStage: number;
}

export interface PipelineOpportunity {
  id: string;
  name: string;

  customer: string;
  contact: string;

  owner: string;

  stage: PipelineStage;
  status: OpportunityStatus;

  expectedRevenue: number;
  probability: number;
  expectedCloseDate: string;

  competitor?: string;
  source?: string;
  currency: string;

  createdAt: string;
  updatedAt: string;

  lastActivityDate?: string;
  nextActivityDate?: string;

  daysInStage: number;

  lossReason?: string;
  notes?: string;

  activities: PipelineActivity[];
  stageHistory: StageHistoryItem[];
}
