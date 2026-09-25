import React from 'react';
import { AlertCircle, RefreshCw, CalendarOff } from 'lucide-react';

interface LeaveErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

export const LeaveErrorView: React.FC<LeaveErrorViewProps> = ({
  message = 'Unable to load leave balance data. Please check your connection and try again.',
  onRetry,
}) => {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50/70 p-6 text-center text-red-800">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-red-900">Failed to Load Leave Data</h3>
      <p className="mt-1 text-sm text-red-700 max-w-md mx-auto">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-xs hover:bg-red-700 transition active:scale-95"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      )}
    </div>
  );
};

export const LeaveEmptyView: React.FC = () => {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <CalendarOff className="h-7 w-7" />
      </div>
      <h3 className="text-base font-semibold text-slate-800">No Leave Quotas Allocated</h3>
      <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
        There are currently no active leave policies or quota allocations configured for your profile for this period.
      </p>
    </div>
  );
};

export const LeaveCardsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {[1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs animate-pulse"
        >
          <div>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="space-y-1.5 flex-1">
                <div className="h-4 w-16 bg-slate-200 rounded-full" />
                <div className="h-5 w-28 bg-slate-200 rounded" />
              </div>
              <div className="h-10 w-10 bg-slate-100 rounded-lg shrink-0" />
            </div>

            <div className="h-3 w-4/5 bg-slate-100 rounded mb-4" />

            <div className="my-3">
              <div className="flex items-baseline gap-2 mb-2">
                <div className="h-8 w-12 bg-slate-200 rounded" />
                <div className="h-4 w-24 bg-slate-100 rounded" />
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full mt-3" />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-slate-50 p-2">
                <div className="h-3 w-8 bg-slate-200 rounded mx-auto mb-1" />
                <div className="h-4 w-6 bg-slate-200 rounded mx-auto" />
              </div>
              <div className="rounded-lg bg-slate-50 p-2">
                <div className="h-3 w-8 bg-slate-200 rounded mx-auto mb-1" />
                <div className="h-4 w-6 bg-slate-200 rounded mx-auto" />
              </div>
              <div className="rounded-lg bg-slate-50 p-2">
                <div className="h-3 w-8 bg-slate-200 rounded mx-auto mb-1" />
                <div className="h-4 w-6 bg-slate-200 rounded mx-auto" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
