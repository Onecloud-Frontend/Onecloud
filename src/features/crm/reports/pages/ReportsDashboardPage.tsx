import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { PageContainer } from '@/shared/components/ui/PageContainer';
import { cn } from '@/shared/utils/cn';
import { useReportsDashboard } from '../hooks/useReports';
import { DEFAULT_REPORT_FILTERS, type ReportFilters } from '../types/reports.types';
import { DashboardKpiGrid } from '../components/DashboardKpiGrid';
import { ReportChartCard } from '../components/ReportChartCard';
import { ReportConversionChart } from '../components/ReportConversionChart';
import { ReportFilterBar } from '../components/ReportFilterBar';
import { ReportNavCards } from '../components/ReportNavCards';
import { ReportPageHeader } from '../components/ReportPageHeader';
import { ReportRevenueChart } from '../components/ReportRevenueChart';
import { ReportEmpty, ReportError, ReportLoading } from '../components/ReportStates';
import { downloadCsv, type CsvColumn } from '../components/reportExport';

interface KpiExportRow {
  metric: string;
  value: number;
}

const KPI_EXPORT_COLUMNS: CsvColumn<KpiExportRow>[] = [
  { header: 'Metric', value: (row) => row.metric },
  { header: 'Value', value: (row) => row.value },
];

/** Route: /crm/reports */
export const ReportsDashboardPage: React.FC = () => {
  const [filters, setFilters] = useState<ReportFilters>(DEFAULT_REPORT_FILTERS);
  const { data, isLoading, isError, error, refetch, isPlaceholderData } = useReportsDashboard(filters);

  const handleExport = () => {
    if (!data) return;
    const { kpis } = data;
    const rows: KpiExportRow[] = [
      { metric: 'Total Revenue', value: kpis.totalRevenue },
      { metric: 'Lead Count', value: kpis.leadCount },
      { metric: 'Conversion Rate (%)', value: kpis.conversionRate },
      { metric: 'Opportunity Count', value: kpis.opportunityCount },
      { metric: 'Pipeline Value', value: kpis.pipelineValue },
      { metric: 'Win Rate (%)', value: kpis.winRate },
      { metric: 'Quote Count', value: kpis.quoteCount },
      { metric: 'Quote Value', value: kpis.quoteValue },
    ];
    downloadCsv('crm-reports-summary.csv', KPI_EXPORT_COLUMNS, rows);
  };

  const renderBody = () => {
    if (isLoading) return <ReportLoading message="Loading reports..." />;

    if (isError || !data) {
      return <ReportError message={error?.message ?? 'Unknown error occurred'} onRetry={() => void refetch()} />;
    }

    const { kpis } = data;
    if (kpis.leadCount + kpis.opportunityCount + kpis.quoteCount === 0) {
      return <ReportEmpty onReset={() => setFilters(DEFAULT_REPORT_FILTERS)} />;
    }

    return (
      // Previous results stay visible (dimmed) while a new filter combination loads.
      <div className={cn('space-y-6', isPlaceholderData && 'opacity-60 transition-opacity')}>
        <DashboardKpiGrid kpis={kpis} />
        <div className="grid gap-6 lg:grid-cols-2">
          <ReportChartCard title="Revenue Trend" subtitle="Won revenue by month">
            <ReportRevenueChart data={data.revenueTrend} />
          </ReportChartCard>
          <ReportChartCard title="Conversion Trend" subtitle="Share of leads converted, by month created">
            <ReportConversionChart data={data.conversionTrend} />
          </ReportChartCard>
        </div>
        <ReportNavCards />
      </div>
    );
  };

  return (
    <PageContainer className="space-y-6">
      <ReportPageHeader
        title="CRM Reports"
        description="Sales, pipeline and conversion analytics across the CRM."
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
      <ReportFilterBar filters={filters} onChange={setFilters} show={['dateRange', 'owner', 'team', 'region']} />
      {renderBody()}
    </PageContainer>
  );
};
