import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { PageContainer } from '@/shared/components/ui/PageContainer';
import { cn } from '@/shared/utils/cn';
import { useSalesPerformance } from '../hooks/useReports';
import { DEFAULT_REPORT_FILTERS, type ReportFilters, type SalespersonPerformance } from '../types/reports.types';
import { ReportChartCard } from '../components/ReportChartCard';
import { ReportFilterBar } from '../components/ReportFilterBar';
import { ReportKpiCard } from '../components/ReportKpiCard';
import { ReportPageHeader } from '../components/ReportPageHeader';
import { ReportAchievementChart } from '../components/ReportAchievementChart';
import { ReportPerformanceTable } from '../components/ReportPerformanceTable';
import { ReportEmpty, ReportError, ReportLoading } from '../components/ReportStates';
import { downloadCsv, type CsvColumn } from '../components/reportExport';
import { formatCompactCurrency, formatNumber, formatPercent } from '../components/reportFormatters';

const PERFORMANCE_EXPORT_COLUMNS: CsvColumn<SalespersonPerformance>[] = [
  { header: 'Salesperson', value: (row) => row.salesperson },
  { header: 'Team', value: (row) => row.team },
  { header: 'Region', value: (row) => row.region },
  { header: 'Leads', value: (row) => row.leads },
  { header: 'Opportunities', value: (row) => row.opportunities },
  { header: 'Won', value: (row) => row.wonOpportunities },
  { header: 'Lost', value: (row) => row.lostOpportunities },
  { header: 'Revenue', value: (row) => row.revenue },
  { header: 'Win Rate (%)', value: (row) => row.winRate },
  { header: 'Target', value: (row) => row.target },
  { header: 'Achievement (%)', value: (row) => row.achievement },
];

/** Route: /crm/reports/sales-performance */
export const SalesPerformanceReportPage: React.FC = () => {
  const [filters, setFilters] = useState<ReportFilters>(DEFAULT_REPORT_FILTERS);
  const { data, isLoading, isError, error, refetch, isPlaceholderData } = useSalesPerformance(filters);

  const handleExport = () => {
    if (!data) return;
    downloadCsv('sales-performance.csv', PERFORMANCE_EXPORT_COLUMNS, data.rows);
  };

  const renderBody = () => {
    if (isLoading) return <ReportLoading message="Loading sales performance..." />;

    if (isError || !data) {
      return <ReportError message={error?.message ?? 'Unknown error occurred'} onRetry={() => void refetch()} />;
    }

    if (data.rows.length === 0) {
      return <ReportEmpty onReset={() => setFilters(DEFAULT_REPORT_FILTERS)} />;
    }

    const { summary } = data;

    return (
      <div className={cn('space-y-6', isPlaceholderData && 'opacity-60 transition-opacity')}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ReportKpiCard label="Total Leads" value={formatNumber(summary.totalLeads)} />
          <ReportKpiCard label="Opportunities" value={formatNumber(summary.opportunities)} />
          <ReportKpiCard label="Won" value={formatNumber(summary.wonOpportunities)} />
          <ReportKpiCard label="Revenue" value={formatCompactCurrency(summary.revenue)} />
          <ReportKpiCard label="Win Rate" value={formatPercent(summary.winRate)} />
          <ReportKpiCard label="Conversion Rate" value={formatPercent(summary.conversionRate)} />
          <ReportKpiCard label="Target" value={formatCompactCurrency(summary.target)} />
          <ReportKpiCard label="Achievement" value={formatPercent(summary.achievement)} caption="Revenue against target" />
        </div>

        <ReportChartCard title="Target Achievement" subtitle="Revenue achieved against target, by salesperson">
          <ReportAchievementChart data={data.rows} />
        </ReportChartCard>

        <ReportPerformanceTable rows={data.rows} />
      </div>
    );
  };

  return (
    <PageContainer className="space-y-6">
      <ReportPageHeader
        title="Sales Performance"
        description="Revenue, targets and achievement for each salesperson."
        showBack
        actions={
          <button
            type="button"
            onClick={handleExport}
            disabled={!data}
            className="inline-flex h-9 items-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-medium text-white shadow transition-colors hover:bg-blue-600/90 disabled:pointer-events-none disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        }
      />
      <ReportFilterBar filters={filters} onChange={setFilters} show={['dateRange', 'team', 'region', 'owner']} ownerLabel="Salesperson" />
      {renderBody()}
    </PageContainer>
  );
};
