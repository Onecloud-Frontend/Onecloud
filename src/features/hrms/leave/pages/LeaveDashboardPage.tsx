import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Palmtree, 
  Info,
  RefreshCw,
  ChevronDown
} from 'lucide-react';
import { useLeaveBalances, useLeaveSummary } from '../hooks/useLeaveBalances';
import { LeaveBalanceCards } from '../components/LeaveBalanceCards';
import { LeaveCardsSkeleton, LeaveEmptyView, LeaveErrorView } from '../components/LeaveStateViews';

export const LeaveDashboardPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2026);

  const {
    data: balances,
    isLoading: isBalancesLoading,
    isFetching: isBalancesFetching,
    isError: isBalancesError,
    error: balancesError,
    refetch: refetchBalances,
  } = useLeaveBalances({ year: selectedYear });

  const {
    data: summary,
    isLoading: isSummaryLoading,
    isFetching: isSummaryFetching,
    isError: isSummaryError,
    refetch: refetchSummary,
  } = useLeaveSummary({ year: selectedYear });

  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  const isFetching = isBalancesFetching || isSummaryFetching || isManualRefreshing;
  const isLoading = (isBalancesLoading || isSummaryLoading) && !balances;
  const isError = isBalancesError || isSummaryError;

  const handleRefresh = async () => {
    setIsManualRefreshing(true);
    try {
      await Promise.all([refetchBalances(), refetchSummary()]);
    } finally {
      // Keep subtle spin visible for at least 600ms so user clearly perceives the refresh
      setTimeout(() => {
        setIsManualRefreshing(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ─── Top Bar / Header ────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 tracking-wide uppercase">
                HRMS
              </span>
              <span className="text-xs text-slate-400 font-medium">Leave Management</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Leave Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Overview of your annual leave allowances, consumed days, and available balances.
            </p>
          </div>

          {/* Action & Filter Controls */}
          <div className="flex items-center gap-3">
            {/* Year Selector */}
            <div className="relative inline-flex items-center">
              <Calendar className="absolute left-3 h-4 w-4 text-slate-400 pointer-events-none" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="appearance-none rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-8 text-sm font-medium text-slate-700 shadow-xs hover:border-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value={2026}>Year 2026 (Current)</option>
                <option value={2025}>Year 2025</option>
                <option value={2024}>Year 2024</option>
              </select>
              <ChevronDown className="absolute right-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isFetching}
              title="Refresh leave balances"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-xs hover:bg-slate-50 disabled:opacity-75 transition active:scale-95"
            >
              <RefreshCw className={`h-4 w-4 transition-transform ${isFetching ? 'animate-spin text-blue-600' : 'text-slate-500'}`} />
              <span className="hidden sm:inline font-medium">
                {isFetching ? 'Refreshing...' : 'Refresh'}
              </span>
            </button>
          </div>
        </div>

        {/* ─── Scope Boundary Notice ────────────────────────────────────── */}
        <div className="flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50/60 p-3.5 text-xs text-blue-800">
          <Info className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
          <p>
            <span className="font-semibold">Notice:</span> This dashboard displays personal quota balances and usage. To submit new leave requests or review pending approvals, visit the Leave Requests workflow.
          </p>
        </div>

        {/* ─── Summary Metrics Strip ────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Total Allowance</span>
              <Palmtree className="h-4 w-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {isLoading ? (
                <div className="h-7 w-14 bg-slate-200 rounded animate-pulse" />
              ) : (
                summary?.totalAllowance ?? 0
              )}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Days credited in {selectedYear}</div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Consumed Days</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {isLoading ? (
                <div className="h-7 w-14 bg-slate-200 rounded animate-pulse" />
              ) : (
                summary?.totalUsed ?? 0
              )}
            </div>
            <div className="text-xs text-emerald-600 font-medium mt-0.5">Approved & taken</div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Available Days</span>
              <Palmtree className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {isLoading ? (
                <div className="h-7 w-14 bg-slate-200 rounded animate-pulse" />
              ) : (
                summary?.totalRemaining ?? 0
              )}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Ready for booking</div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Pending Review</span>
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-amber-600">
              {isLoading ? (
                <div className="h-7 w-14 bg-slate-200 rounded animate-pulse" />
              ) : (
                summary?.totalPending ?? 0
              )}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Awaiting manager approval</div>
          </div>
        </div>

        {/* ─── Leave Balance Cards Section ─────────────────────────────── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Leave Categories & Quotas
            </h2>
            <span className="text-xs text-slate-500">
              {balances ? `${balances.length} active leave categories` : ''}
            </span>
          </div>

          {/* Conditional rendering for States: Loading, Error, Empty, Success */}
          {isLoading && <LeaveCardsSkeleton />}

          {isError && !isLoading && (
            <LeaveErrorView 
              message={balancesError instanceof Error ? balancesError.message : undefined}
              onRetry={handleRefresh} 
            />
          )}

          {!isLoading && !isError && (!balances || balances.length === 0) && (
            <LeaveEmptyView />
          )}

          {!isLoading && !isError && balances && balances.length > 0 && (
            <LeaveBalanceCards balances={balances} />
          )}
        </div>

      </div>
    </div>
  );
};

export default LeaveDashboardPage;
