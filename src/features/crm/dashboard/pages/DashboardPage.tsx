import React, { useState } from 'react';
import { PageContainer } from '@/shared/components/ui/PageContainer';
import { useDashboardMetrics } from '../hooks/useDashboardMetrics';
import { MetricCard } from '../components/MetricCard';
import { RevenueTrendChart } from '../components/RevenueTrendChart';
import { PipelineFunnel } from '../components/PipelineFunnel';
import { RecentLeadsTable } from '../components/RecentLeadsTable';

/** Route: /crm/dashboard */
const CrmDashboardPage: React.FC = () => {
  const { data, isLoading, isError, error } = useDashboardMetrics();
  const [dateRange, setDateRange] = useState('last-6-months');
  const filteredRevenueTrend =
  dateRange === 'this-month'
    ? data?.revenueTrend.slice(-1) ?? []
    : dateRange === 'last-month'
      ? data?.revenueTrend.slice(-2, -1) ?? []
      : dateRange === 'last-3-months'
        ? data?.revenueTrend.slice(-3) ?? []
        : dateRange === 'last-6-months'
          ? data?.revenueTrend.slice(-6) ?? []
          : data?.revenueTrend ?? [];

  const handleDownloadReport = () => {
    const rows = [
      ['CRM Dashboard Report'],
      [''],
      ['Metric', 'Value'],
      ['Total Revenue', data?.totalRevenue.value],
      ['Active Leads', data?.activeLeads.value],
      ['Qualified Leads', data?.qualifiedLeads.value],
      ['Win Rate', `${data?.winRate.value}%`],
      ['Active Opportunities', data?.activeOpportunityValue.value],
      ['Pipeline Value', data?.pipelineValue.value],
      [''],
      ['Sales Performance'],
      ['Salesperson', 'Deals', 'Revenue', 'Target', 'Achievement'],
      ...(data?.salesPerformance ?? []).map((person) => [
        person.name,
        person.deals,
        person.revenue,
        person.target,
        `${person.achievement}%`,
      ]),
    ];

    const csvContent = rows
      .map((row) =>
        row
          .map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n');

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'crm-dashboard-report.csv';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <PageContainer className="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <p className="text-sm font-medium text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </PageContainer>
    );
  }

  if (isError || !data) {
    return (
      <PageContainer>
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4">
          <h3 className="text-sm font-semibold text-rose-800">
            Failed to load dashboard metrics
          </h3>

          <p className="mt-1 text-sm text-rose-600">
            {error?.message || 'Unknown error occurred'}
          </p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="max-w-[1400px] space-y-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0b1f4d]">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            CRM overview and key performance metrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={dateRange}
            onChange={(event) => setDateRange(event.target.value)}
            className="h-9 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition-colors hover:bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            aria-label="Select date range"
          >
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="last-6-months">Last 6 Months</option>
            <option value="this-year">This Year</option>
          </select>

          <button
            type="button"
            onClick={handleDownloadReport}
            className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-600/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50"
          >
            Download Report
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <MetricCard data={data.totalRevenue} />
        <MetricCard data={data.activeLeads} />
        <MetricCard data={data.qualifiedLeads} />
        <MetricCard data={data.winRate} />
        <MetricCard data={data.activeOpportunityValue} />
        <MetricCard data={data.pipelineValue} />
      </div>

      {/* Analytics Section */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(320px,2fr)]">
        <div className="h-[400px] min-w-0">
          <RevenueTrendChart data={filteredRevenueTrend} />
        </div>

        <div className="h-[400px] min-w-0">
          <PipelineFunnel data={data.pipelineStages} />
        </div>
      </div>

      {/* Recent Leads + Recent Activities */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Leads */}
        <div className="min-w-0">
          <RecentLeadsTable data={data.recentLeads} />
        </div>

        {/* Recent Activities */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="text-base font-semibold text-slate-900">
              Recent Activities
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Latest sales and customer activities
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {data.recentActivities.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <p className="text-sm text-slate-500">
                  No recent activities found.
                </p>
              </div>
            ) : (
              data.recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-slate-50"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                    {activity.type.charAt(0)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-medium text-slate-900">
                          {activity.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {activity.description}
                        </p>
                      </div>

                      <span className="shrink-0 text-xs text-slate-400">
                        {new Date(activity.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <p className="mt-2 text-xs font-medium text-slate-400">
                      {activity.type} · {activity.user}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Sales Performance Summary */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            Sales Performance Summary
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Sales team revenue and target achievement
          </p>
        </div>

        {data.salesPerformance.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-slate-500">
              No sales performance data available.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left">
                  <th className="px-5 py-3 font-medium text-slate-500">
                    Salesperson
                  </th>

                  <th className="px-5 py-3 font-medium text-slate-500">
                    Deals
                  </th>

                  <th className="px-5 py-3 font-medium text-slate-500">
                    Revenue
                  </th>

                  <th className="px-5 py-3 font-medium text-slate-500">
                    Target
                  </th>

                  <th className="px-5 py-3 font-medium text-slate-500">
                    Achievement
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {data.salesPerformance.map((person) => (
                  <tr
                    key={person.id}
                    className="transition-colors hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 font-medium text-slate-900">
                      {person.name}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {person.deals}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      ₹{person.revenue.toLocaleString('en-IN')}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      ₹{person.target.toLocaleString('en-IN')}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{
                              width: `${Math.min(
                                person.achievement,
                                100
                              )}%`,
                            }}
                          />
                        </div>

                        <span className="font-medium text-slate-700">
                          {person.achievement}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-slate-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Quickly access common CRM actions
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <button
            type="button"
            onClick={() => {
              window.location.href = '/crm/leads/new';
            }}
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-blue-200 hover:bg-blue-50"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-semibold text-blue-600">
              +
            </span>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Add Lead
              </p>

              <p className="text-xs text-slate-500">
                Create a new lead
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.href = '/crm/opportunities/new';
            }}
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-indigo-200 hover:bg-indigo-50"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-semibold text-indigo-600">
              +
            </span>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Create Opportunity
              </p>

              <p className="text-xs text-slate-500">
                Add a new opportunity
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.href = '/crm/activities/new';
            }}
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-emerald-200 hover:bg-emerald-50"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-sm font-semibold text-emerald-600">
              ✓
            </span>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Log Activity
              </p>

              <p className="text-xs text-slate-500">
                Record a customer activity
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.href = '/crm/reports';
            }}
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-violet-200 hover:bg-violet-50"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-sm font-semibold text-violet-600">
              ↗
            </span>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                View Reports
              </p>

              <p className="text-xs text-slate-500">
                Open reports and analytics
              </p>
            </div>
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

export default CrmDashboardPage;