import React from 'react';
import { 
  Palmtree, 
  CheckCircle2, 
  Clock, 
  CalendarDays, 
  RefreshCw, 
  Info 
} from 'lucide-react';
import { useLeaveBalances, useLeaveSummary } from '../hooks/useLeaveBalances';
import { LeaveBalanceCards } from '../components/LeaveBalanceCards';
import { LeaveCardsSkeleton, LeaveEmptyView, LeaveErrorView } from '../components/LeaveStateViews';

export const LeaveDashboardPage: React.FC = () => {
  const {
    data: balances,
    isLoading: isBalancesLoading,
    isFetching: isBalancesFetching,
    isError: isBalancesError,
    error: balancesError,
    refetch: refetchBalances,
  } = useLeaveBalances();

  const {
    data: summary,
    isLoading: isSummaryLoading,
    isFetching: isSummaryFetching,
    isError: isSummaryError,
    refetch: refetchSummary,
  } = useLeaveSummary();

  const isLoading = isBalancesLoading || isSummaryLoading;
  const isFetching = isBalancesFetching || isSummaryFetching;
  const isError = isBalancesError || isSummaryError;

  const handleRefresh = () => {
    refetchBalances();
    refetchSummary();
  };

  return (
    <div className="min-h-full bg-slate-50/50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-700">
                HRMS
              </span>
              <span className="text-xs text-slate-500 font-medium">Leave Management</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Leave Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Overview of your annual leave allowances, consumed days, and available balances.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isFetching}
              title="Refresh balances"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-xs hover:bg-slate-50 disabled:opacity-60 transition active:scale-95"
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin text-blue-600' : 'text-slate-500'}`} />
              <span>{isFetching ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Scope Boundary Notification */}
        <div className="flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50/70 p-3.5 text-xs text-blue-800">
          <Info className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
          <p>
            <span className="font-semibold">Notice:</span> This dashboard provides a summary of personal quota allocations and usage. To submit a new leave request or review pending approvals, visit the Leave Requests workflow.
          </p>
        </div>

        {/* Summary Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Total Allowance</span>
              <CalendarDays className="h-4 w-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {isLoading ? (
                <div className="h-7 w-12 bg-slate-200 rounded animate-pulse" />
              ) : (
                `${summary?.totalAllowance ?? 0} days`
              )}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Annual quota allocated</div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Consumed Days</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {isLoading ? (
                <div className="h-7 w-12 bg-slate-200 rounded animate-pulse" />
              ) : (
                `${summary?.totalUsed ?? 0} days`
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
                <div className="h-7 w-12 bg-slate-200 rounded animate-pulse" />
              ) : (
                `${summary?.totalRemaining ?? 0} days`
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
                <div className="h-7 w-12 bg-slate-200 rounded animate-pulse" />
              ) : (
                `${summary?.pendingRequestsCount ?? 0} requests`
              )}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Awaiting manager review</div>
          </div>
        </div>

        {/* Leave Category Quotas Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Leave Categories & Quotas
            </h2>
            {balances && (
              <span className="text-xs text-slate-500">
                {balances.length} active categories
              </span>
            )}
          </div>

          {/* Loading state */}
          {isLoading && <LeaveCardsSkeleton />}

          {/* Error state */}
          {isError && !isLoading && (
            <LeaveErrorView
              message={balancesError instanceof Error ? balancesError.message : undefined}
              onRetry={handleRefresh}
            />
          )}

          {/* Empty state */}
          {!isLoading && !isError && (!balances || balances.length === 0) && (
            <LeaveEmptyView />
          )}

          {/* Loaded data state */}
          {!isLoading && !isError && balances && balances.length > 0 && (
            <LeaveBalanceCards balances={balances} />
          )}
        </div>

      </div>
    </div>
  );
};

export default LeaveDashboardPage;
