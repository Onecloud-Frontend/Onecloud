/**
 * Type contracts for the CRM Reports & Analytics feature.
 * Covers filter state, the raw records the reports are computed from,
 * and the response shape of each report.
 */

/** Time windows offered by the report filter bar. */
export const DATE_RANGE_OPTIONS = [
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: '180d', label: 'Last 6 months' },
  { value: 'all', label: 'All time' },
] as const;

export type DateRangeKey = (typeof DATE_RANGE_OPTIONS)[number]['value'];

/** Sentinel used by every select filter to mean "no restriction". */
export const ALL_OPTION = 'All';

export const LEAD_SOURCES = [
  'Website',
  'Referral',
  'Campaign',
  'Social Media',
  'Cold Call',
  'Advertisement',
] as const;

export const LEAD_STATUSES = ['New', 'Contacted', 'Qualified', 'Converted', 'Unqualified'] as const;

export const OPPORTUNITY_STAGES = [
  'Qualification',
  'Needs Analysis',
  'Proposal',
  'Negotiation',
  'Won',
  'Lost',
] as const;

export const QUOTE_STATUSES = ['Draft', 'Sent', 'Accepted', 'Rejected', 'Expired'] as const;

export const QUOTE_APPROVAL_STATUSES = ['Approved', 'Pending', 'Rejected'] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];
export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type OpportunityStage = (typeof OPPORTUNITY_STAGES)[number];
export type QuoteStatus = (typeof QUOTE_STATUSES)[number];
export type QuoteApprovalStatus = (typeof QUOTE_APPROVAL_STATUSES)[number];

/** Filter values shared by all report screens. Screens use the subset that applies to them. */
export interface ReportFilters {
  dateRange: DateRangeKey;
  owner: string;
  team: string;
  region: string;
  source: string;
  stage: string;
  status: string;
}

export const DEFAULT_REPORT_FILTERS: ReportFilters = {
  dateRange: '180d',
  owner: ALL_OPTION,
  team: ALL_OPTION,
  region: ALL_OPTION,
  source: ALL_OPTION,
  stage: ALL_OPTION,
  status: ALL_OPTION,
};

/** Values used to populate the owner, team and region dropdowns. */
export interface ReportFilterOptions {
  owners: string[];
  teams: string[];
  regions: string[];
}

/* ---------- Source records ---------- */

export interface OwnerProfile {
  name: string;
  team: string;
  region: string;
  /** Revenue target for one month. Scaled by the selected date range. */
  monthlyTarget: number;
}

export interface LeadRecord {
  id: string;
  source: LeadSource;
  owner: string;
  status: LeadStatus;
  createdDate: string;
}

export interface OpportunityRecord {
  id: string;
  name: string;
  customer: string;
  owner: string;
  stage: OpportunityStage;
  expectedRevenue: number;
  probability: number;
  /** Planned close date for open deals, actual close date for won/lost deals. */
  expectedCloseDate: string;
  createdDate: string;
}

export interface QuoteRecord {
  id: string;
  quoteNumber: string;
  customer: string;
  owner: string;
  status: QuoteStatus;
  approvalStatus: QuoteApprovalStatus;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  quoteDate: string;
  converted: boolean;
}

/* ---------- Shared chart shapes ---------- */

export interface MonthlyRevenuePoint {
  month: string;
  revenue: number;
}

export interface MonthlyRatePoint {
  month: string;
  rate: number;
}

/* ---------- Reports Dashboard ---------- */

export interface ReportsDashboardData {
  kpis: {
    totalRevenue: number;
    leadCount: number;
    conversionRate: number;
    opportunityCount: number;
    pipelineValue: number;
    winRate: number;
    quoteCount: number;
    quoteValue: number;
  };
  revenueTrend: MonthlyRevenuePoint[];
  conversionTrend: MonthlyRatePoint[];
}

/* ---------- Lead Conversion Report ---------- */

export interface LeadConversionSummary {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  qualifiedLeads: number;
  convertedLeads: number;
  unqualifiedLeads: number;
  conversionRate: number;
}

export interface FunnelStep {
  stage: string;
  count: number;
}

export interface ConversionBreakdownRow {
  name: string;
  total: number;
  converted: number;
  conversionRate: number;
}

export interface LeadConversionReportData {
  summary: LeadConversionSummary;
  funnel: FunnelStep[];
  sourceWise: ConversionBreakdownRow[];
  ownerWise: ConversionBreakdownRow[];
  trend: MonthlyRatePoint[];
}

/* ---------- Opportunity Report ---------- */

export interface OpportunitySummary {
  opportunityCount: number;
  totalPipelineValue: number;
  expectedRevenue: number;
  wonValue: number;
  lostValue: number;
  winRate: number;
  averageDealSize: number;
  averageSalesCycleDays: number;
}

export interface StageDistributionRow {
  stage: OpportunityStage;
  count: number;
  value: number;
  averageProbability: number;
}

export interface OpportunityReportData {
  summary: OpportunitySummary;
  stageDistribution: StageDistributionRow[];
  rows: OpportunityRecord[];
}

/* ---------- Sales Performance ---------- */

export interface SalespersonPerformance {
  salesperson: string;
  team: string;
  region: string;
  leads: number;
  qualifiedLeads: number;
  opportunities: number;
  wonOpportunities: number;
  lostOpportunities: number;
  revenue: number;
  pipelineValue: number;
  winRate: number;
  conversionRate: number;
  averageDealValue: number;
  target: number;
  achievement: number;
}

export interface SalesPerformanceSummary {
  totalLeads: number;
  qualifiedLeads: number;
  opportunities: number;
  wonOpportunities: number;
  lostOpportunities: number;
  revenue: number;
  pipelineValue: number;
  winRate: number;
  conversionRate: number;
  averageDealValue: number;
  target: number;
  achievement: number;
}

export interface SalesPerformanceData {
  summary: SalesPerformanceSummary;
  rows: SalespersonPerformance[];
}

/* ---------- Quote Analysis ---------- */

export interface QuoteAnalysisSummary {
  totalQuotations: number;
  totalQuoteValue: number;
  approvedQuotes: number;
  rejectedQuotes: number;
  pendingQuotes: number;
  convertedQuotes: number;
  conversionRate: number;
  averageQuoteValue: number;
  discountValue: number;
  taxValue: number;
}

export interface QuoteBreakdownRow {
  label: string;
  count: number;
  value: number;
}

export interface QuoteAnalysisData {
  summary: QuoteAnalysisSummary;
  statusBreakdown: QuoteBreakdownRow[];
  approvalBreakdown: QuoteBreakdownRow[];
  rows: QuoteRecord[];
}
