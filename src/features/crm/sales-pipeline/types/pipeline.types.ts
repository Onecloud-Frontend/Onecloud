import type {
  Opportunity,
  OpportunityStage,
} from "../../shared/types/opportunity.types";

export type PipelineOpportunity = Opportunity;

export type PipelineStage = OpportunityStage;

export interface PipelineStageConfig {
  id: OpportunityStage;
  label: string;
}

export interface PipelineSummaryData {
  totalOpportunities: number;
  pipelineValue: number;
  weightedValue: number;
  wonOpportunities: number;
  lostOpportunities: number;
  wonValue: number;
  lostValue: number;
  winRate: number;
  lossRate: number;
}
