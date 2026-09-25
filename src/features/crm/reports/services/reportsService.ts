import {
  ALL_OPTION,
  LEAD_SOURCES,
  OPPORTUNITY_STAGES,
  QUOTE_APPROVAL_STATUSES,
  QUOTE_STATUSES,
  type ConversionBreakdownRow,
  type DateRangeKey,
  type LeadConversionReportData,
  type LeadRecord,
  type MonthlyRatePoint,
  type MonthlyRevenuePoint,
  type OpportunityRecord,
  type OpportunityReportData,
  type QuoteAnalysisData,
  type QuoteRecord,
  type ReportFilterOptions,
  type ReportFilters,
  type ReportsDashboardData,
  type SalesPerformanceData,
  type SalespersonPerformance,
} from '../types/reports.types';
import {
  OWNER_DIRECTORY,
  leadRecords,
  opportunityRecords,
  quoteRecords,
} from '../mocks/reportsMockData';

const NETWORK_DELAY_MS = 500;
const DAY_MS = 24 * 60 * 60 * 1000;
const TREND_MONTHS = 6;

/** Number of days each date-range option covers; null means no lower bound. */
const RANGE_DAYS: Record<DateRangeKey, number | null> = {
  '30d': 30,
  '90d': 90,
  '180d': 180,
  all: null,
};

/** Number of months each date-range option represents, used to scale monthly targets. */
const RANGE_MONTHS: Record<DateRangeKey, number> = {
  '30d': 1,
  '90d': 3,
  '180d': 6,
  all: 9,
};

/** Wraps a computation in a delayed promise so callers handle loading states like a real request. */
const respond = <T>(build: () => T): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(build()), NETWORK_DELAY_MS);
  });

/* ---------- Calculation helpers ---------- */

const sum = (values: number[]): number => values.reduce((total, value) => total + value, 0);

const average = (values: number[]): number =>
  values.length === 0 ? 0 : Math.round(sum(values) / values.length);

/** Returns part/whole as a percentage rounded to one decimal place. */
const percentage = (part: number, whole: number): number =>
  whole === 0 ? 0 : Math.round((part / whole) * 1000) / 10;

const isAll = (value: string): boolean => value === ALL_OPTION;

const withinRange = (isoDate: string, range: DateRangeKey): boolean => {
  const days = RANGE_DAYS[range];
  if (days === null) return true;
  return new Date(isoDate).getTime() >= Date.now() - days * DAY_MS;
};

/** True when the owner passes the owner, team and region filters. */
const ownerInScope = (ownerName: string, filters: ReportFilters): boolean => {
  const profile = OWNER_DIRECTORY.find((owner) => owner.name === ownerName);
  if (!profile) return false;
  return (
    (isAll(filters.owner) || profile.name === filters.owner) &&
    (isAll(filters.team) || profile.team === filters.team) &&
    (isAll(filters.region) || profile.region === filters.region)
  );
};

const isWon = (opportunity: OpportunityRecord): boolean => opportunity.stage === 'Won';
const isLost = (opportunity: OpportunityRecord): boolean => opportunity.stage === 'Lost';
const isOpen = (opportunity: OpportunityRecord): boolean => !isWon(opportunity) && !isLost(opportunity);

const isQualified = (lead: LeadRecord): boolean => lead.status === 'Qualified' || lead.status === 'Converted';

/* ---------- Trend helpers ---------- */

/** Builds "YYYY-MM" keys for the most recent months, oldest first. */
const recentMonthKeys = (count: number): string[] => {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (count - 1 - i), 1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  });
};

const monthLabel = (key: string): string => {
  const [year, month] = key.split('-').map(Number);
  return new Date(year, month - 1, 1).toLocaleString('en-IN', { month: 'short', year: '2-digit' });
};

const buildRevenueTrend = (won: OpportunityRecord[]): MonthlyRevenuePoint[] =>
  recentMonthKeys(TREND_MONTHS).map((key) => ({
    month: monthLabel(key),
    revenue: sum(won.filter((o) => o.expectedCloseDate.startsWith(key)).map((o) => o.expectedRevenue)),
  }));

const buildConversionTrend = (leads: LeadRecord[]): MonthlyRatePoint[] =>
  recentMonthKeys(TREND_MONTHS).map((key) => {
    const created = leads.filter((lead) => lead.createdDate.startsWith(key));
    const converted = created.filter((lead) => lead.status === 'Converted').length;
    return { month: monthLabel(key), rate: percentage(converted, created.length) };
  });

/* ---------- Filtered record selectors ---------- */

const selectLeads = (filters: ReportFilters): LeadRecord[] =>
  leadRecords.filter(
    (lead) =>
      withinRange(lead.createdDate, filters.dateRange) &&
      ownerInScope(lead.owner, filters) &&
      (isAll(filters.source) || lead.source === filters.source),
  );

const selectOpportunities = (filters: ReportFilters): OpportunityRecord[] =>
  opportunityRecords.filter(
    (opportunity) =>
      withinRange(opportunity.createdDate, filters.dateRange) &&
      ownerInScope(opportunity.owner, filters) &&
      (isAll(filters.stage) || opportunity.stage === filters.stage),
  );

const selectQuotes = (filters: ReportFilters): QuoteRecord[] =>
  quoteRecords.filter(
    (quote) =>
      withinRange(quote.quoteDate, filters.dateRange) &&
      ownerInScope(quote.owner, filters) &&
      (isAll(filters.status) || quote.status === filters.status),
  );

/* ---------- Report builders ---------- */

const buildDashboard = (filters: ReportFilters): ReportsDashboardData => {
  const leads = selectLeads(filters);
  const opportunities = selectOpportunities(filters);
  const quotes = selectQuotes(filters);
  const won = opportunities.filter(isWon);
  const lost = opportunities.filter(isLost);
  const converted = leads.filter((lead) => lead.status === 'Converted').length;

  return {
    kpis: {
      totalRevenue: sum(won.map((o) => o.expectedRevenue)),
      leadCount: leads.length,
      conversionRate: percentage(converted, leads.length),
      opportunityCount: opportunities.length,
      pipelineValue: sum(opportunities.filter(isOpen).map((o) => o.expectedRevenue)),
      winRate: percentage(won.length, won.length + lost.length),
      quoteCount: quotes.length,
      quoteValue: sum(quotes.map((q) => q.total)),
    },
    revenueTrend: buildRevenueTrend(won),
    conversionTrend: buildConversionTrend(leads),
  };
};

const toBreakdownRow = (name: string, leads: LeadRecord[]): ConversionBreakdownRow => {
  const converted = leads.filter((lead) => lead.status === 'Converted').length;
  return { name, total: leads.length, converted, conversionRate: percentage(converted, leads.length) };
};

const buildLeadConversion = (filters: ReportFilters): LeadConversionReportData => {
  const leads = selectLeads(filters);
  const countByStatus = (status: LeadRecord['status']): number =>
    leads.filter((lead) => lead.status === status).length;
  const converted = countByStatus('Converted');

  return {
    summary: {
      totalLeads: leads.length,
      newLeads: countByStatus('New'),
      contactedLeads: countByStatus('Contacted'),
      qualifiedLeads: countByStatus('Qualified'),
      convertedLeads: converted,
      unqualifiedLeads: countByStatus('Unqualified'),
      conversionRate: percentage(converted, leads.length),
    },
    // Each funnel step includes every lead that progressed at least that far.
    funnel: [
      { stage: 'Total Leads', count: leads.length },
      {
        stage: 'Contacted',
        count: leads.filter((lead) => lead.status !== 'New' && lead.status !== 'Unqualified').length,
      },
      { stage: 'Qualified', count: leads.filter(isQualified).length },
      { stage: 'Converted', count: converted },
    ],
    sourceWise: LEAD_SOURCES.map((source) =>
      toBreakdownRow(
        source,
        leads.filter((lead) => lead.source === source),
      ),
    ).filter((row) => row.total > 0),
    ownerWise: OWNER_DIRECTORY.map((owner) =>
      toBreakdownRow(
        owner.name,
        leads.filter((lead) => lead.owner === owner.name),
      ),
    ).filter((row) => row.total > 0),
    trend: buildConversionTrend(leads),
  };
};

const buildOpportunityReport = (filters: ReportFilters): OpportunityReportData => {
  const opportunities = selectOpportunities(filters);
  const won = opportunities.filter(isWon);
  const lost = opportunities.filter(isLost);
  const open = opportunities.filter(isOpen);
  const closed = [...won, ...lost];

  const cycleDays = closed.map((o) =>
    Math.round((new Date(o.expectedCloseDate).getTime() - new Date(o.createdDate).getTime()) / DAY_MS),
  );

  return {
    summary: {
      opportunityCount: opportunities.length,
      totalPipelineValue: sum(open.map((o) => o.expectedRevenue)),
      // Weighted forecast: each open deal contributes value multiplied by its win probability.
      expectedRevenue: Math.round(sum(open.map((o) => (o.expectedRevenue * o.probability) / 100))),
      wonValue: sum(won.map((o) => o.expectedRevenue)),
      lostValue: sum(lost.map((o) => o.expectedRevenue)),
      winRate: percentage(won.length, won.length + lost.length),
      averageDealSize: average(won.map((o) => o.expectedRevenue)),
      averageSalesCycleDays: average(cycleDays),
    },
    stageDistribution: OPPORTUNITY_STAGES.map((stage) => {
      const inStage = opportunities.filter((o) => o.stage === stage);
      return {
        stage,
        count: inStage.length,
        value: sum(inStage.map((o) => o.expectedRevenue)),
        averageProbability: average(inStage.map((o) => o.probability)),
      };
    }),
    rows: [...opportunities].sort((a, b) => b.expectedRevenue - a.expectedRevenue),
  };
};

const buildSalesPerformance = (filters: ReportFilters): SalesPerformanceData => {
  const leads = selectLeads(filters);
  const opportunities = selectOpportunities(filters);
  const months = RANGE_MONTHS[filters.dateRange];

  const rows: SalespersonPerformance[] = OWNER_DIRECTORY.filter((owner) =>
    ownerInScope(owner.name, filters),
  ).map((owner) => {
    const ownLeads = leads.filter((lead) => lead.owner === owner.name);
    const ownOpportunities = opportunities.filter((o) => o.owner === owner.name);
    const won = ownOpportunities.filter(isWon);
    const lost = ownOpportunities.filter(isLost);
    const revenue = sum(won.map((o) => o.expectedRevenue));
    const target = owner.monthlyTarget * months;

    return {
      salesperson: owner.name,
      team: owner.team,
      region: owner.region,
      leads: ownLeads.length,
      qualifiedLeads: ownLeads.filter(isQualified).length,
      opportunities: ownOpportunities.length,
      wonOpportunities: won.length,
      lostOpportunities: lost.length,
      revenue,
      pipelineValue: sum(ownOpportunities.filter(isOpen).map((o) => o.expectedRevenue)),
      winRate: percentage(won.length, won.length + lost.length),
      conversionRate: percentage(
        ownLeads.filter((lead) => lead.status === 'Converted').length,
        ownLeads.length,
      ),
      averageDealValue: average(won.map((o) => o.expectedRevenue)),
      target,
      achievement: percentage(revenue, target),
    };
  });

  const won = opportunities.filter(isWon);
  const lost = opportunities.filter(isLost);
  const revenue = sum(won.map((o) => o.expectedRevenue));
  const target = sum(rows.map((row) => row.target));

  return {
    summary: {
      totalLeads: leads.length,
      qualifiedLeads: leads.filter(isQualified).length,
      opportunities: opportunities.length,
      wonOpportunities: won.length,
      lostOpportunities: lost.length,
      revenue,
      pipelineValue: sum(opportunities.filter(isOpen).map((o) => o.expectedRevenue)),
      winRate: percentage(won.length, won.length + lost.length),
      conversionRate: percentage(
        leads.filter((lead) => lead.status === 'Converted').length,
        leads.length,
      ),
      averageDealValue: average(won.map((o) => o.expectedRevenue)),
      target,
      achievement: percentage(revenue, target),
    },
    rows: rows.sort((a, b) => b.revenue - a.revenue),
  };
};

const buildQuoteAnalysis = (filters: ReportFilters): QuoteAnalysisData => {
  const quotes = selectQuotes(filters);
  const countByApproval = (status: QuoteRecord['approvalStatus']): number =>
    quotes.filter((quote) => quote.approvalStatus === status).length;
  const converted = quotes.filter((quote) => quote.converted).length;

  return {
    summary: {
      totalQuotations: quotes.length,
      totalQuoteValue: sum(quotes.map((q) => q.total)),
      approvedQuotes: countByApproval('Approved'),
      rejectedQuotes: countByApproval('Rejected'),
      pendingQuotes: countByApproval('Pending'),
      convertedQuotes: converted,
      conversionRate: percentage(converted, quotes.length),
      averageQuoteValue: average(quotes.map((q) => q.total)),
      discountValue: sum(quotes.map((q) => q.discount)),
      taxValue: sum(quotes.map((q) => q.tax)),
    },
    statusBreakdown: QUOTE_STATUSES.map((status) => {
      const matching = quotes.filter((q) => q.status === status);
      return { label: status, count: matching.length, value: sum(matching.map((q) => q.total)) };
    }),
    approvalBreakdown: QUOTE_APPROVAL_STATUSES.map((status) => {
      const matching = quotes.filter((q) => q.approvalStatus === status);
      return { label: status, count: matching.length, value: sum(matching.map((q) => q.total)) };
    }),
    rows: [...quotes].sort((a, b) => b.quoteDate.localeCompare(a.quoteDate)),
  };
};

/**
 * Data access layer for CRM reports.
 * Each method mirrors a GET /api/crm/reports endpoint; while the backend is unavailable
 * the results are computed from the mock records, so replacing the internals with an
 * Axios call later does not affect hooks or components.
 */
class ReportsService {
  getFilterOptions(): Promise<ReportFilterOptions> {
    return respond(() => ({
      owners: OWNER_DIRECTORY.map((owner) => owner.name),
      teams: Array.from(new Set(OWNER_DIRECTORY.map((owner) => owner.team))),
      regions: Array.from(new Set(OWNER_DIRECTORY.map((owner) => owner.region))),
    }));
  }

  getReportsDashboard(filters: ReportFilters): Promise<ReportsDashboardData> {
    return respond(() => buildDashboard(filters));
  }

  getLeadConversionReport(filters: ReportFilters): Promise<LeadConversionReportData> {
    return respond(() => buildLeadConversion(filters));
  }

  getOpportunityReport(filters: ReportFilters): Promise<OpportunityReportData> {
    return respond(() => buildOpportunityReport(filters));
  }

  getSalesPerformance(filters: ReportFilters): Promise<SalesPerformanceData> {
    return respond(() => buildSalesPerformance(filters));
  }

  getQuoteAnalysis(filters: ReportFilters): Promise<QuoteAnalysisData> {
    return respond(() => buildQuoteAnalysis(filters));
  }
}

export const reportsService = new ReportsService();
