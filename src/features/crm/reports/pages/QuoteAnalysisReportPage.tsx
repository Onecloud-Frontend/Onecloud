import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { PageContainer } from '@/shared/components/ui/PageContainer';
import { cn } from '@/shared/utils/cn';
import { useQuoteAnalysis } from '../hooks/useReports';
import { DEFAULT_REPORT_FILTERS, type ReportFilters, type QuoteRecord } from '../types/reports.types';
import { ReportChartCard } from '../components/ReportChartCard';
import { ReportDonutChart } from '../components/ReportDonutChart';
import { ReportFilterBar } from '../components/ReportFilterBar';
import { ReportKpiCard } from '../components/ReportKpiCard';
import { ReportPageHeader } from '../components/ReportPageHeader';
import { ReportQuoteTable } from '../components/ReportQuoteTable';
import { ReportEmpty, ReportError, ReportLoading } from '../components/ReportStates';
import { downloadCsv, type CsvColumn } from '../components/reportExport';
import { formatCompactCurrency, formatNumber, formatPercent } from '../components/reportFormatters';

const QUOTE_EXPORT_COLUMNS: CsvColumn<QuoteRecord>[] = [
  { header: 'Quote Number', value: (row) => row.quoteNumber },
  { header: 'Customer', value: (row) => row.customer },
  { header: 'Owner', value: (row) => row.owner },
  { header: 'Status', value: (row) => row.status },
  { header: 'Approval Status', value: (row) => row.approvalStatus },
  { header: 'Subtotal', value: (row) => row.subtotal },
  { header: 'Discount', value: (row) => row.discount },
  { header: 'Tax', value: (row) => row.tax },
  { header: 'Total', value: (row) => row.total },
  { header: 'Quote Date', value: (row) => row.quoteDate },
];

/** Route: /crm/reports/quotations */
export const QuoteAnalysisReportPage: React.FC = () => {
  const [filters, setFilters] = useState<ReportFilters>(DEFAULT_REPORT_FILTERS);
  const { data, isLoading, isError, error, refetch, isPlaceholderData } = useQuoteAnalysis(filters);

  const handleExport = () => {
    if (!data) return;
    downloadCsv('quote-analysis.csv', QUOTE_EXPORT_COLUMNS, data.rows);
  };

  const renderBody = () => {
    if (isLoading) return <ReportLoading message="Loading quote analysis..." />;

    if (isError || !data) {
      return <ReportError message={error?.message ?? 'Unknown error occurred'} onRetry={() => void refetch()} />;
    }

    if (data.summary.totalQuotations === 0) {
      return <ReportEmpty onReset={() => setFilters(DEFAULT_REPORT_FILTERS)} />;
    }

    const { summary } = data;

    return (
      <div className={cn('space-y-6', isPlaceholderData && 'opacity-60 transition-opacity')}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ReportKpiCard label="Total Quotations" value={formatNumber(summary.totalQuotations)} />
          <ReportKpiCard label="Total Value" value={formatCompactCurrency(summary.totalQuoteValue)} />
          <ReportKpiCard label="Approved" value={formatNumber(summary.approvedQuotes)} />
          <ReportKpiCard label="Pending" value={formatNumber(summary.pendingQuotes)} />
          <ReportKpiCard label="Rejected" value={formatNumber(summary.rejectedQuotes)} />
          <ReportKpiCard label="Converted" value={formatNumber(summary.convertedQuotes)} />
          <ReportKpiCard label="Conversion Rate" value={formatPercent(summary.conversionRate)} />
          <ReportKpiCard label="Average Quote Value" value={formatCompactCurrency(summary.averageQuoteValue)} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ReportChartCard title="Status Breakdown" subtitle="Quote count by status">
            <ReportDonutChart data={data.statusBreakdown} />
          </ReportChartCard>
          <ReportChartCard title="Approval Breakdown" subtitle="Quote count by approval state">
            <ReportDonutChart data={data.approvalBreakdown} />
          </ReportChartCard>
        </div>

        <ReportQuoteTable rows={data.rows} />
      </div>
    );
  };

  return (
    <PageContainer className="space-y-6">
      <ReportPageHeader
        title="Quote Analysis"
        description="Quote status, approvals, conversion and discounts."
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
      <ReportFilterBar filters={filters} onChange={setFilters} show={['dateRange', 'status', 'owner']} ownerLabel="Owner" />
      {renderBody()}
    </PageContainer>
  );
};
