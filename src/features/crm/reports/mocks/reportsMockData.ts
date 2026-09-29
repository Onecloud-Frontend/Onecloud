import {
  LEAD_SOURCES,
  type LeadRecord,
  type LeadStatus,
  type OpportunityRecord,
  type OpportunityStage,
  type OwnerProfile,
  type QuoteApprovalStatus,
  type QuoteRecord,
  type QuoteStatus,
} from '../types/reports.types';

/**
 * Deterministic mock records for the reports feature.
 * Records are generated from fixed patterns so every reload produces the same data,
 * while dates are anchored to "today" so the date-range filters always have data to work on.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

const toIsoDate = (date: Date): string => date.toISOString().slice(0, 10);
const daysAgo = (days: number): string => toIsoDate(new Date(Date.now() - days * DAY_MS));
const daysFromNow = (days: number): string => toIsoDate(new Date(Date.now() + days * DAY_MS));

/** Sales team members with the team, region and monthly revenue target used by the reports. */
export const OWNER_DIRECTORY: OwnerProfile[] = [
  { name: 'Ananya Rao', team: 'Enterprise', region: 'South', monthlyTarget: 450000 },
  { name: 'Karthik Menon', team: 'Enterprise', region: 'West', monthlyTarget: 400000 },
  { name: 'Divya Nair', team: 'SMB', region: 'North', monthlyTarget: 300000 },
  { name: 'Rohit Sharma', team: 'SMB', region: 'East', monthlyTarget: 280000 },
];

const CUSTOMERS = [
  'ABC Technologies',
  'Zenith Retail',
  'Nimbus Health',
  'Orion Logistics',
  'Vertex Finance',
  'Lumen Education',
  'Apex Manufacturing',
  'Bluewave Media',
];

const OPPORTUNITY_TITLES = ['Cloud Migration', 'Enterprise Licence', 'Support Renewal', 'Analytics Rollout'];

/* ---------- Leads ---------- */

const LEAD_STATUS_PATTERN: LeadStatus[] = [
  'New',
  'Contacted',
  'Qualified',
  'Contacted',
  'Unqualified',
  'Converted',
  'New',
  'Qualified',
  'Contacted',
  'New',
];

export const leadRecords: LeadRecord[] = Array.from({ length: 96 }, (_, i) => ({
  id: `LD-${1001 + i}`,
  source: LEAD_SOURCES[i % LEAD_SOURCES.length],
  owner: OWNER_DIRECTORY[(i + Math.floor(i / 6)) % OWNER_DIRECTORY.length].name,
  status: LEAD_STATUS_PATTERN[(i + Math.floor(i / 10)) % LEAD_STATUS_PATTERN.length],
  createdDate: daysAgo(((i * 5) % 178) + 1),
}));

/* ---------- Opportunities ---------- */

const STAGE_PATTERN: OpportunityStage[] = [
  'Qualification',
  'Needs Analysis',
  'Proposal',
  'Negotiation',
  'Won',
  'Proposal',
  'Lost',
  'Won',
  'Needs Analysis',
  'Negotiation',
];

const PROBABILITY_BY_STAGE: Record<OpportunityStage, number> = {
  Qualification: 20,
  'Needs Analysis': 40,
  Proposal: 60,
  Negotiation: 80,
  Won: 100,
  Lost: 0,
};

export const opportunityRecords: OpportunityRecord[] = Array.from({ length: 60 }, (_, i) => {
  const stage = STAGE_PATTERN[(i + Math.floor(i / 10)) % STAGE_PATTERN.length];
  const isClosed = stage === 'Won' || stage === 'Lost';
  const salesCycleDays = 30 + ((i * 11) % 50);
  const closedDaysAgo = ((i * 3) % 150) + 1;

  return {
    id: `OP-${2001 + i}`,
    name: `${CUSTOMERS[i % CUSTOMERS.length]} - ${
      OPPORTUNITY_TITLES[(i + Math.floor(i / 8)) % OPPORTUNITY_TITLES.length]
    }`,
    customer: CUSTOMERS[i % CUSTOMERS.length],
    owner: OWNER_DIRECTORY[(i + Math.floor(i / 4)) % OWNER_DIRECTORY.length].name,
    stage,
    expectedRevenue: 150000 + ((i * 37) % 20) * 50000,
    probability: PROBABILITY_BY_STAGE[stage],
    createdDate: isClosed ? daysAgo(closedDaysAgo + salesCycleDays) : daysAgo(((i * 4) % 120) + 1),
    expectedCloseDate: isClosed ? daysAgo(closedDaysAgo) : daysFromNow(((i * 9) % 90) + 10),
  };
});

/* ---------- Quotations ---------- */

const QUOTE_STATUS_PATTERN: QuoteStatus[] = [
  'Draft',
  'Sent',
  'Accepted',
  'Sent',
  'Rejected',
  'Accepted',
  'Expired',
  'Sent',
  'Accepted',
  'Draft',
];

/** Derives the approval state that is consistent with the quote's lifecycle status. */
const approvalFor = (status: QuoteStatus, index: number): QuoteApprovalStatus => {
  switch (status) {
    case 'Draft':
      return 'Pending';
    case 'Sent':
      return index % 2 === 0 ? 'Approved' : 'Pending';
    case 'Rejected':
      return 'Rejected';
    default:
      return 'Approved';
  }
};

export const quoteRecords: QuoteRecord[] = Array.from({ length: 50 }, (_, i) => {
  const status = QUOTE_STATUS_PATTERN[(i + Math.floor(i / 10)) % QUOTE_STATUS_PATTERN.length];
  const subtotal = 80000 + ((i * 53) % 30) * 20000;
  const discount = Math.round((subtotal * ((i % 4) * 2.5)) / 100);
  const tax = Math.round((subtotal - discount) * 0.18);

  return {
    id: `QID-${3001 + i}`,
    quoteNumber: `QT-${3001 + i}`,
    customer: CUSTOMERS[(i * 3) % CUSTOMERS.length],
    owner: OWNER_DIRECTORY[(i + Math.floor(i / 5)) % OWNER_DIRECTORY.length].name,
    status,
    approvalStatus: approvalFor(status, i),
    subtotal,
    discount,
    tax,
    total: subtotal - discount + tax,
    quoteDate: daysAgo(((i * 3) % 175) + 1),
    converted: status === 'Accepted',
  };
});
