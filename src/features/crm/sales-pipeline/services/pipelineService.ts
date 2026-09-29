import type {
  PipelineOpportunity,
  PipelineStage,
} from "../types/pipeline.types";
import { pipelineMockOpportunities } from "../mocks/pipelineMockData";

let opportunities: PipelineOpportunity[] = [...pipelineMockOpportunities];

function getStatusFromStage(
  stage: PipelineStage,
): PipelineOpportunity["status"] {
  if (stage === "Closed Won") {
    return "Won";
  }

  if (stage === "Closed Lost") {
    return "Lost";
  }

  return "Open";
}

export const pipelineService = {
  async getOpportunities(): Promise<PipelineOpportunity[]> {
    return opportunities;
  },

  async getOpportunity(id: string): Promise<PipelineOpportunity> {
    const opportunity = opportunities.find((item) => item.id === id);

    if (!opportunity) {
      throw new Error(`Opportunity ${id} not found`);
    }

    return opportunity;
  },

  async updateStage(
    id: string,
    stage: PipelineStage,
  ): Promise<PipelineOpportunity> {
    const opportunity = opportunities.find((item) => item.id === id);

    if (!opportunity) {
      throw new Error(`Opportunity ${id} not found`);
    }

    const now = new Date().toISOString();

    const updatedOpportunity: PipelineOpportunity = {
      ...opportunity,

      stage,

      status: getStatusFromStage(stage),

      probability:
        stage === "Closed Won"
          ? 100
          : stage === "Closed Lost"
            ? 0
            : opportunity.probability,

      updatedAt: now,

      daysInStage: 0,

      stageHistory: [
        ...opportunity.stageHistory,
        {
          stage,
          enteredAt: now,
          daysInStage: 0,
        },
      ],
    };

    opportunities = opportunities.map((item) =>
      item.id === id ? updatedOpportunity : item,
    );

    return updatedOpportunity;
  },

  async updateOwner(id: string, owner: string): Promise<PipelineOpportunity> {
    const opportunity = opportunities.find((item) => item.id === id);

    if (!opportunity) {
      throw new Error(`Opportunity ${id} not found`);
    }

    const updatedOpportunity: PipelineOpportunity = {
      ...opportunity,
      owner,
      updatedAt: new Date().toISOString(),
    };

    opportunities = opportunities.map((item) =>
      item.id === id ? updatedOpportunity : item,
    );

    return updatedOpportunity;
  },
};
