import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { PageContainer } from '@/shared/components/ui/PageContainer';
import { cn } from '@/shared/utils/cn';
import { useLeadConversionReport } from '../hooks/useReports';
import { DEFAULT_REPORT_FILTERS, type ReportFilters } from '../types/reports.types';
import { ReportBreakdownTable } from '../components/ReportBreakdownTable';
import { ReportChartCard } from '../components/ReportChartCard';
import { ReportFilterBar } from '../components/ReportFilterBar';
import { ReportFunnelChart } from '../components/ReportFunnelChart';
import { ReportKpiCard } from '../components/ReportKpiCard';
import { ReportPageHeader } from '../components/ReportPageHeader';
import { ReportTrendChart } from '../components/ReportTrendChart';
import { ReportEmpty, ReportError, ReportLoading } from '../components/ReportStates';
import { downloadCsv, type CsvColumn } from '../components/reportExport';
import { formatNumber, formatPercent } from '../components/reportFormatters';
import type { ConversionBreakdownRow } from '../types/reports.types';

const BREAKDOWN_EXPORT_COLUMNS: CsvColumn<ConversionBreakdownRow>[] = [
  { header: 'Name', value: (row) => row.name },
  { header: 'Total', value: (row) => row.total },
  { header: 'Converted', value: (row) => row.converted },
  { header: 'Conversion Rate (%)', value: (row) => row.conversionRate },
];

/** Route: /crm/reports/leads */
export const LeadConversionReportPage: React.FC = () => {
  const [filters, setFilters] = useState<ReportFilters>(DEFAULT_REPORT_FILTERS);
  const { data, isLoading, isError, error, refetch, isPlaceholderData } = useLeadConversionReport(filters);

  const handleExport = () => {
    if (!data) return;
    downloadCsv('lead-conversion-by-source.csv', BREAKDOWN_EXPORT_COLUMNS, data.sourceWise);
  };

  const renderBody = () => {
    if (isLoading) return <ReportLoading message="Loading lead conversion report..." />;

    if (isError || !data) {
      return <ReportError message={error?.message ?? 'Unknown error occurred'} onRetry={() => void refetch()} />;
    }

    if (data.summary.totalLeads === 0) {
      return <ReportEmpty onReset={() => setFilters(DEFAULT_REPORT_FILTERS)} />;
    }

    const { summary } = data;

    return (
      <div className={cn('space-y-6', isPlaceholderData && 'opacity-60 transition-opacity')}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ReportKpiCard label="Total Leads" value={formatNumber(summary.totalLeads)} />
          <ReportKpiCard label="New" value={formatNumber(summary.newLeads)} />
          <ReportKpiCard label="Contacted" value={formatNumber(summary.contactedLeads)} />
          <ReportKpiCard label="Qualified" value={formatNumber(summary.qualifiedLeads)} />
          <ReportKpiCard label="Converted" value={formatNumber(summary.convertedLeads)} />
          <ReportKpiCard label="Unqualified" value={formatNumber(summary.unqualifiedLeads)} />
          <ReportKpiCard label="Conversion Rate" value={formatPercent(summary.conversionRate)} caption="Converted out of total leads" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ReportChartCard title="Conversion Funnel" subtitle="Leads reaching each stage">
            <ReportFunnelChart data={data.funnel} />
          </ReportChartCard>
          <ReportChartCard title="Conversion Trend" subtitle="Monthly conversion rate">
            <ReportTrendChart data={data.trend} seriesName="Conversion rate" />
          </ReportChartCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ReportBreakdownTable title="Source-wise Conversion" nameHeader="Source" rows={data.sourceWise} />
          <ReportBreakdownTable title="Owner-wise Conversion" nameHeader="Owner" rows={data.ownerWise} />
        </div>
      </div>
    );
  };

  return (
    <PageContainer className="space-y-6">
      <ReportPageHeader
        title="Lead Conversion Report"
        description="How leads progress from creation through to conversion."
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
      <ReportFilterBar filters={filters} onChange={setFilters} show={['dateRange', 'source', 'owner']} ownerLabel="Owner" />
      {renderBody()}
    </PageContainer>
  );
};
