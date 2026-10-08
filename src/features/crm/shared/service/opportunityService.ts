import type { Opportunity } from "@/features/crm/shared/types/opportunity.types";
import {opportunities as sharedOpportunities,} from "@/features/crm/shared/data/opportunities";
import type { LeadSource } from "@/features/crm/shared/types/lead.types";

const STORAGE_KEY =
  "onecloud_crm_opportunities";

export interface OpportunityCreateInput {
  name: string;
  customerId: string;
  contactId?: string;
  leadId?: string;
  stage: Opportunity["stage"];
  probability: number;
  expectedRevenue: number;
  amount: number;
  expectedCloseDate: string;
  assignedTo: string;
  source?: LeadSource;
  competitors?: string[];
  description?: string;
}

function getStoredOpportunities(): Opportunity[] {
  const stored =
    localStorage.getItem(STORAGE_KEY);

  if (stored) {
    try {
      return JSON.parse(
        stored,
      ) as Opportunity[];
    } catch {
      console.error(
        "Invalid opportunity data in localStorage. Resetting to shared data.",
      );
    }
  }

  const initialData =
    structuredClone(
      sharedOpportunities,
    );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(initialData),
  );

  return initialData;
}

function saveOpportunities(
  data: Opportunity[],
): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data),
  );
}


export async function getOpportunities(): Promise<
  Opportunity[]
> {
  return getStoredOpportunities();
}


export async function getOpportunityById(
  id: string,
): Promise<Opportunity | undefined> {
  const data =
    getStoredOpportunities();

  return data.find(
    (opportunity) =>
      opportunity.id === id,
  );
}


export async function createOpportunity(
  values: OpportunityCreateInput,
): Promise<Opportunity> {
  const data =
    getStoredOpportunities();

  const now =
    new Date().toISOString();

 
  const highestNumber =
    data.reduce(
      (max, opportunity) => {
        const match =
          opportunity.id.match(
            /^OPP-(\d+)$/,
          );

        if (!match) {
          return max;
        }

        return Math.max(
          max,
          Number(match[1]),
        );
      },
      0,
    );

  const nextNumber =
    highestNumber + 1;

  const paddedNumber =
    String(nextNumber).padStart(
      3,
      "0",
    );

  const newOpportunity: Opportunity = {
    id: `OPP-${paddedNumber}`,

    opportunityCode:
      `OPP-2026-${paddedNumber}`,

    name: values.name,

    customerId:
      values.customerId,

    contactId:
      values.contactId ||
      undefined,

    leadId:
      values.leadId ||
      undefined,

    stage:
      values.stage,

    probability:
      values.probability,

    expectedRevenue:
      values.expectedRevenue,

    amount:
      values.amount,

    expectedCloseDate:
      values.expectedCloseDate,

    assignedTo:
      values.assignedTo,

    source:
      values.source ||
      undefined,

    competitors:
      values.competitors || [],

    description:
      values.description ||
      undefined,

    createdAt: now,

    updatedAt: now,
  };

  const updated = [
    ...data,
    newOpportunity,
  ];

  saveOpportunities(updated);

  return newOpportunity;
}


export async function updateOpportunity(
  id: string,
  values: Partial<Opportunity>,
): Promise<Opportunity> {
  const data =
    getStoredOpportunities();

  const index =
    data.findIndex(
      (opportunity) =>
        opportunity.id === id,
    );

  if (index === -1) {
    throw new Error(
      "Opportunity not found",
    );
  }

  const updatedOpportunity: Opportunity = {
    ...data[index],
    ...values,
    updatedAt:
      new Date().toISOString(),
  };

  data[index] =
    updatedOpportunity;

  saveOpportunities(data);

  return updatedOpportunity;
}


export async function deleteOpportunity(
  id: string,
): Promise<void> {
  const data =
    getStoredOpportunities();

  const updated =
    data.filter(
      (opportunity) =>
        opportunity.id !== id,
    );

  saveOpportunities(updated);
}


export function clearOpportunityStorage(): void {
  localStorage.removeItem(
    STORAGE_KEY,
  );
}