import React from 'react';
import type { ReportsDashboardData } from '../types/reports.types';
import { ReportKpiCard } from './ReportKpiCard';
import { formatCompactCurrency, formatNumber, formatPercent } from './reportFormatters';

interface DashboardKpiGridProps {
  kpis: ReportsDashboardData['kpis'];
}

/** Headline metrics of the Reports Dashboard, laid out as a responsive card grid. */
export const DashboardKpiGrid: React.FC<DashboardKpiGridProps> = ({ kpis }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <ReportKpiCard label="Total Revenue" value={formatCompactCurrency(kpis.totalRevenue)} caption="From won opportunities" />
    <ReportKpiCard label="Lead Count" value={formatNumber(kpis.leadCount)} caption="Leads created in range" />
    <ReportKpiCard label="Conversion Rate" value={formatPercent(kpis.conversionRate)} caption="Leads converted to customers" />
    <ReportKpiCard label="Opportunities" value={formatNumber(kpis.opportunityCount)} caption="Open, won and lost" />
    <ReportKpiCard label="Pipeline Value" value={formatCompactCurrency(kpis.pipelineValue)} caption="Open opportunities" />
    <ReportKpiCard label="Win Rate" value={formatPercent(kpis.winRate)} caption="Won out of closed deals" />
    <ReportKpiCard label="Quotations" value={formatNumber(kpis.quoteCount)} caption="Quotes issued in range" />
    <ReportKpiCard label="Quote Value" value={formatCompactCurrency(kpis.quoteValue)} caption="Total across all quotes" />
  </div>
);
