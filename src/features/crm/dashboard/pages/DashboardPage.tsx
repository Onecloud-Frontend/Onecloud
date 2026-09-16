import React from 'react';
import { PageContainer } from '@/shared/components/ui/PageContainer';
import { useDashboardMetrics } from '../hooks/useDashboardMetrics';
import { MetricCard } from '../components/MetricCard';
import { RevenueTrendChart } from '../components/RevenueTrendChart';
import { PipelineFunnel } from '../components/PipelineFunnel';
import { RecentLeadsTable } from '../components/RecentLeadsTable';

/** Route: /crm/dashboard */
const CrmDashboardPage: React.FC = () => {
  const { data, isLoading, isError, error } = useDashboardMetrics();

  if (isLoading) {
    return (
      <PageContainer className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />
          <p className="text-sm font-medium text-slate-500">Loading dashboard...</p>
        </div>
      </PageContainer>
    );
  }

  if (isError || !data) {
    return (
      <PageContainer>
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-rose-800">Failed to load dashboard metrics</h3>
          <p className="text-sm text-rose-600 mt-1">{error?.message || 'Unknown error occurred'}</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="max-w-[1400px] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0b1f4d]">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">CRM overview and key performance metrics.</p>
        </div>
        
        {/* Placeholder for future date filters or global actions */}
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 h-9 px-4 py-2">
            This Month
          </button>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white shadow hover:bg-blue-600/90 h-9 px-4 py-2">
            Download Report
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard data={data.totalRevenue} />
        <MetricCard data={data.activeLeads} />
        <MetricCard data={data.winRate} />
        <MetricCard data={data.activeOpportunityValue} />
      </div>

      {/* Analytics Section */}
      <div className="grid gap-6 lg:grid-cols-[60%_1fr]">
        <div className="h-[400px]">
          <RevenueTrendChart data={data.revenueTrend} />
        </div>
        <div className="h-[400px]">
          <PipelineFunnel data={data.pipelineStages} />
        </div>
      </div>

      {/* Actionable Data Section */}
      <div>
        <RecentLeadsTable data={data.recentLeads} />
      </div>
    </PageContainer>
  );
};

export default CrmDashboardPage;
