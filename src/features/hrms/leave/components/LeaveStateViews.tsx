import React from 'react';
import { AlertCircle, RefreshCw, Palmtree } from 'lucide-react';

interface LeaveErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

export const LeaveErrorView: React.FC<LeaveErrorViewProps> = ({ 
  message = 'Failed to load leave balance data. Please try again.',
  onRetry 
}) => {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50/70 p-6 text-center text-red-800">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-red-900">Unable to Fetch Balances</h3>
      <p className="mt-1 text-sm text-red-700 max-w-md mx-auto">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 transition"
        >
          <RefreshCw className="h-4 w-4" />
          Retry Now
        </button>
      )}
    </div>
  );
};

export const LeaveEmptyView: React.FC = () => {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Palmtree className="h-7 w-7" />
      </div>
      <h3 className="text-base font-semibold text-slate-800">No Leave Balances Configured</h3>
      <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
        There are currently no active leave policies or quota allocations configured for your profile for this period.
      </p>
    </div>
  );
};

export const LeaveCardsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-5 w-28 bg-slate-200 rounded-md" />
            <div className="h-8 w-8 bg-slate-100 rounded-lg" />
          </div>
          <div className="mb-4">
            <div className="h-10 w-20 bg-slate-200 rounded-md mb-2" />
            <div className="h-3 w-32 bg-slate-100 rounded-md" />
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full mb-4" />
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
            <div>
              <div className="h-2 w-8 bg-slate-100 rounded mb-1" />
              <div className="h-4 w-10 bg-slate-200 rounded" />
            </div>
            <div>
              <div className="h-2 w-8 bg-slate-100 rounded mb-1" />
              <div className="h-4 w-10 bg-slate-200 rounded" />
            </div>
            <div>
              <div className="h-2 w-8 bg-slate-100 rounded mb-1" />
              <div className="h-4 w-10 bg-slate-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
