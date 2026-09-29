import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { PageContainer } from '@/shared/components/ui/PageContainer';
import { cn } from '@/shared/utils/cn';
import { useOpportunityReport } from '../hooks/useReports';
import { DEFAULT_REPORT_FILTERS, type ReportFilters, type OpportunityRecord } from '../types/reports.types';
import { ReportChartCard } from '../components/ReportChartCard';
import { ReportFilterBar } from '../components/ReportFilterBar';
import { ReportKpiCard } from '../components/ReportKpiCard';
import { ReportOpportunityTable } from '../components/ReportOpportunityTable';
import { ReportPageHeader } from '../components/ReportPageHeader';
import { ReportStageChart } from '../components/ReportStageChart';
import { ReportEmpty, ReportError, ReportLoading } from '../components/ReportStates';
import { downloadCsv, type CsvColumn } from '../components/reportExport';
import { formatCompactCurrency, formatNumber, formatPercent } from '../components/reportFormatters';

const OPPORTUNITY_EXPORT_COLUMNS: CsvColumn<OpportunityRecord>[] = [
  { header: 'Opportunity', value: (row) => row.name },
  { header: 'Customer', value: (row) => row.customer },
  { header: 'Owner', value: (row) => row.owner },
  { header: 'Stage', value: (row) => row.stage },
  { header: 'Expected Revenue', value: (row) => row.expectedRevenue },
  { header: 'Probability (%)', value: (row) => row.probability },
  { header: 'Expected Close Date', value: (row) => row.expectedCloseDate },
];

/** Route: /crm/reports/opportunities */
export const OpportunityReportPage: React.FC = () => {
  const [filters, setFilters] = useState<ReportFilters>(DEFAULT_REPORT_FILTERS);
  const { data, isLoading, isError, error, refetch, isPlaceholderData } = useOpportunityReport(filters);

  const handleExport = () => {
    if (!data) return;
    downloadCsv('opportunity-report.csv', OPPORTUNITY_EXPORT_COLUMNS, data.rows);
  };

  const renderBody = () => {
    if (isLoading) return <ReportLoading message="Loading opportunity report..." />;

    if (isError || !data) {
      return <ReportError message={error?.message ?? 'Unknown error occurred'} onRetry={() => void refetch()} />;
    }

    if (data.summary.opportunityCount === 0) {
      return <ReportEmpty onReset={() => setFilters(DEFAULT_REPORT_FILTERS)} />;
    }

    const { summary } = data;

    return (
      <div className={cn('space-y-6', isPlaceholderData && 'opacity-60 transition-opacity')}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ReportKpiCard label="Opportunities" value={formatNumber(summary.opportunityCount)} />
          <ReportKpiCard label="Pipeline Value" value={formatCompactCurrency(summary.totalPipelineValue)} caption="Open opportunities" />
          <ReportKpiCard label="Expected Revenue" value={formatCompactCurrency(summary.expectedRevenue)} caption="Weighted by probability" />
          <ReportKpiCard label="Win Rate" value={formatPercent(summary.winRate)} />
          <ReportKpiCard label="Won Value" value={formatCompactCurrency(summary.wonValue)} />
          <ReportKpiCard label="Lost Value" value={formatCompactCurrency(summary.lostValue)} />
          <ReportKpiCard label="Average Deal Size" value={formatCompactCurrency(summary.averageDealSize)} />
          <ReportKpiCard label="Average Sales Cycle" value={`${summary.averageSalesCycleDays} days`} />
        </div>

        <ReportChartCard title="Stage Distribution" subtitle="Pipeline value by stage">
          <ReportStageChart data={data.stageDistribution} />
        </ReportChartCard>

        <ReportOpportunityTable rows={data.rows} />
      </div>
    );
  };

  return (
    <PageContainer className="space-y-6">
      <ReportPageHeader
        title="Opportunity Report"
        description="Pipeline value, stage distribution and win rate across opportunities."
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
      <ReportFilterBar filters={filters} onChange={setFilters} show={['dateRange', 'stage', 'owner']} ownerLabel="Owner" />
      {renderBody()}
    </PageContainer>
  );
};
