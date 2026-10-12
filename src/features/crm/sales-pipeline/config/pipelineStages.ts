import type { OpportunityStage } from "../../shared/types/opportunity.types";

import type { PipelineStageConfig } from "../types/pipeline.types";

export const pipelineStages: PipelineStageConfig[] = [
  {
    id: "QUALIFICATION",
    label: "Qualification",
  },
  {
    id: "DISCOVERY",
    label: "Discovery",
  },
  {
    id: "PROPOSAL",
    label: "Proposal",
  },
  {
    id: "NEGOTIATION",
    label: "Negotiation",
  },
  {
    id: "CLOSED_WON",
    label: "Closed Won",
  },
  {
    id: "CLOSED_LOST",
    label: "Closed Lost",
  },
];

export const stageProbability: Record<OpportunityStage, number> = {
  QUALIFICATION: 30,
  DISCOVERY: 45,
  PROPOSAL: 65,
  NEGOTIATION: 75,
  CLOSED_WON: 100,
  CLOSED_LOST: 0,
};

export function getPipelineStageLabel(stage: OpportunityStage): string {
  return pipelineStages.find((item) => item.id === stage)?.label ?? stage;
}
