import {
  getOpportunities,
  getOpportunityById,
  updateOpportunity,
} from "../../shared/service/opportunityService";

import type {
  Opportunity,
  OpportunityStage,
} from "../../shared/types/opportunity.types";

import { stageProbability } from "../config/pipelineStages";

function calculateExpectedRevenue(amount: number, probability: number): number {
  return Math.round(amount * (probability / 100));
}

export const pipelineService = {
  async getOpportunities(): Promise<Opportunity[]> {
    return getOpportunities();
  },

  async getOpportunity(id: string): Promise<Opportunity> {
    const opportunity = await getOpportunityById(id);

    if (!opportunity) {
      throw new Error(`Opportunity ${id} not found`);
    }

    return opportunity;
  },

  async updateStage(id: string, stage: OpportunityStage): Promise<Opportunity> {
    const opportunity = await getOpportunityById(id);

    if (!opportunity) {
      throw new Error(`Opportunity ${id} not found`);
    }

    const probability = stageProbability[stage];

    if (probability === undefined) {
      throw new Error(`Invalid pipeline stage: ${stage}`);
    }

    return updateOpportunity(id, {
      stage,
      probability,
      expectedRevenue: calculateExpectedRevenue(
        opportunity.amount,
        probability,
      ),
    });
  },
};
