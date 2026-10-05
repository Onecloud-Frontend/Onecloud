import type { Opportunity } from "../types/opportunityTypes";
import type { OpportunityFormValues } from "../schemas/opportunitySchema";
import { opportunityMocks } from "../mocks/opportunityMocks";

const STORAGE_KEY = "onecloud_opportunities";

/**
 * Get opportunities from localStorage.
 * If no data exists, initialize it with mock data.
 */
function getStoredOpportunities(): Opportunity[] {
  const storedData = localStorage.getItem(STORAGE_KEY);

  if (storedData) {
    try {
      return JSON.parse(storedData) as Opportunity[];
    } catch {
      console.error("Invalid opportunity data in localStorage");
    }
  }

  const initialData = [...opportunityMocks];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(initialData),
  );

  return initialData;
}

/**
 * Save opportunities to localStorage.
 */
function saveOpportunities(
  opportunities: Opportunity[],
): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(opportunities),
  );
}

/**
 * Get all opportunities.
 */
export async function getOpportunities(): Promise<Opportunity[]> {
  return getStoredOpportunities();
}

/**
 * Get one opportunity by ID.
 */
export async function getOpportunityById(
  id: string,
): Promise<Opportunity | undefined> {
  const opportunities = getStoredOpportunities();

  return opportunities.find(
    (opportunity) => opportunity.id === id,
  );
}

/**
 * Create a new opportunity.
 */
export async function createOpportunity(
  values: OpportunityFormValues,
): Promise<Opportunity> {
  const opportunities = getStoredOpportunities();

  const now = new Date().toISOString();

  const newOpportunity: Opportunity = {
    id: `OPP-${Date.now()}`,

    name: values.name,

    customerId: `CUS-${Date.now()}`,

    customerName: values.customerName,

    contactId: values.contactName
      ? `CON-${Date.now()}`
      : undefined,

    contactName: values.contactName || undefined,

    description: values.description || undefined,

    stage: values.stage,

    expectedRevenue: values.expectedRevenue,

    probability: values.probability,

    expectedCloseDate: values.expectedCloseDate,

    ownerId: `USR-${Date.now()}`,

    ownerName: values.ownerName,

    competitor: values.competitor || undefined,

    source: values.source || undefined,

    currency: values.currency,

    status:
      values.stage === "Closed Won"
        ? "Won"
        : values.stage === "Closed Lost"
          ? "Lost"
          : "Open",

    notes: values.notes || undefined,

    createdAt: now,

    updatedAt: now,

    lastActivityDate: now,
  };

  const updatedOpportunities = [
    ...opportunities,
    newOpportunity,
  ];

  saveOpportunities(updatedOpportunities);

  return newOpportunity;
}

/**
 * Update an existing opportunity.
 */
export async function updateOpportunity(
  id: string,
  values: Partial<Opportunity>,
): Promise<Opportunity> {
  const opportunities = getStoredOpportunities();

  const opportunityIndex = opportunities.findIndex(
    (opportunity) => opportunity.id === id,
  );

  if (opportunityIndex === -1) {
    throw new Error("Opportunity not found");
  }

  const existingOpportunity =
    opportunities[opportunityIndex];

  const updatedOpportunity: Opportunity = {
    ...existingOpportunity,
    ...values,
    updatedAt: new Date().toISOString(),
  };

  opportunities[opportunityIndex] = updatedOpportunity;

  saveOpportunities(opportunities);

  return updatedOpportunity;
}

/**
 * Delete an opportunity.
 */
export async function deleteOpportunity(
  id: string,
): Promise<void> {
  const opportunities = getStoredOpportunities();

  const filteredOpportunities = opportunities.filter(
    (opportunity) => opportunity.id !== id,
  );

  saveOpportunities(filteredOpportunities);
}

/**
 * Clear all localStorage opportunity data.
 * Useful for development and testing.
 */
export function clearOpportunityStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
}