import React from 'react';

/** Shown while a report request is in flight and there is no previous result to display. */
export const ReportLoading: React.FC<{ message?: string }> = ({ message = 'Loading report...' }) => (
  <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
    <p className="text-sm font-medium text-slate-500">{message}</p>
  </div>
);

interface ReportErrorProps {
  message: string;
  onRetry?: () => void;
}

/** Shown when a report request fails; offers a retry when a handler is supplied. */
export const ReportError: React.FC<ReportErrorProps> = ({ message, onRetry }) => (
  <div className="rounded-lg border border-rose-200 bg-rose-50 p-4">
    <h3 className="text-sm font-semibold text-rose-800">Failed to load report</h3>
    <p className="mt-1 text-sm text-rose-600">{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 h-8 rounded-md border border-rose-200 bg-white px-3 text-sm font-medium text-rose-700 hover:bg-rose-100"
      >
        Try again
      </button>
    )}
  </div>
);

interface ReportEmptyProps {
  message?: string;
  onReset?: () => void;
}

/** Shown when the selected filters match no records. */
export const ReportEmpty: React.FC<ReportEmptyProps> = ({
  message = 'No records match the selected filters.',
  onReset,
}) => (
  <div className="flex min-h-[30vh] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center">
    <p className="text-sm font-medium text-slate-500">{message}</p>
    {onReset && (
      <button
        type="button"
        onClick={onReset}
        className="h-8 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
      >
        Reset filters
      </button>
    )}
  </div>
);
