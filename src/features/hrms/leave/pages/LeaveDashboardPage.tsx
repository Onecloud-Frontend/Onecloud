import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useLeaveBalances, useLeaveRequests, useLeaveSummary } from '../hooks/useLeave';
import LeaveSummaryCards from '../components/LeaveSummaryCards';
import LeaveBalanceCards from '../components/LeaveBalanceCards';
import LeaveHistoryTable from '../components/LeaveHistoryTable';

export const LeaveDashboardPage: React.FC = () => {
  const {
    data: balances = [],
    isLoading: isBalancesLoading,
    isError: isBalancesError,
    refetch: refetchBalances,
    isFetching: isBalancesFetching,
  } = useLeaveBalances();

  const {
    data: summary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
    refetch: refetchSummary,
    isFetching: isSummaryFetching,
  } = useLeaveSummary();

  const {
    data: requests = [],
    isLoading: isRequestsLoading,
    isError: isRequestsError,
    refetch: refetchRequests,
    isFetching: isRequestsFetching,
  } = useLeaveRequests();

  const isLoading = isBalancesLoading || isSummaryLoading || isRequestsLoading;
  const isError = isBalancesError || isSummaryError || isRequestsError;
  const isRefreshing = isBalancesFetching || isSummaryFetching || isRequestsFetching;

  const handleRetry = () => {
    refetchBalances();
    refetchSummary();
    refetchRequests();
  };

  return (
    <div className="min-h-full bg-gray-50/50 p-6 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Leave Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor your leave balances, quota allowances, and recent leave activity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRetry}
            disabled={isLoading || isRefreshing}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <RefreshCw
              className={`h-4 w-4 text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`}
            />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
            <p className="mt-4 text-sm font-medium text-gray-600">
              Loading leave balances and summary...
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && !isLoading && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-red-800">
                Unable to load leave information
              </h2>
              <p className="mt-1 text-sm text-red-600">
                An error occurred while retrieving your leave balances or requests. Please check your connection and try again.
              </p>
              <button
                type="button"
                onClick={handleRetry}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Dashboard Content */}
      {!isLoading && !isError && (
        <>
          {/* Summary KPIs */}
          {summary ? (
            <section aria-labelledby="leave-summary-heading">
              <h2 id="leave-summary-heading" className="sr-only">
                Leave Summary Overview
              </h2>
              <LeaveSummaryCards summary={summary} />
            </section>
          ) : null}

          {/* Leave Balances Section */}
          <section aria-labelledby="leave-balances-heading" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2
                  id="leave-balances-heading"
                  className="text-lg font-semibold text-gray-900"
                >
                  Leave Balances & Entitlements
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Overview of current allocated quotas and days remaining for the calendar year.
                </p>
              </div>
            </div>

            <LeaveBalanceCards balances={balances} />
          </section>

          {/* Recent Leave History Section */}
          <section aria-labelledby="leave-history-heading" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2
                  id="leave-history-heading"
                  className="text-lg font-semibold text-gray-900"
                >
                  Recent Leave Activity
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Recent leave requests submitted and their current approval status.
                </p>
              </div>
            </div>

            <LeaveHistoryTable requests={requests} />
          </section>
        </>
      )}
    </div>
  );
};

export default LeaveDashboardPage;
