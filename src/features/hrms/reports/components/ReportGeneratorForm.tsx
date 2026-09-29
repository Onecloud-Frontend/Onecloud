import React, { FormEvent, useEffect, useState } from 'react';
import { CalendarDays, FileText, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import type { ReportDefinition, ReportGenerationRequest } from '../types/report.types';

interface ReportGeneratorFormProps {
  definitions: ReportDefinition[];
  loading?: boolean;
  error?: string | null;
  onSubmit: (request: ReportGenerationRequest) => Promise<void> | void;
}

const ReportGeneratorForm: React.FC<ReportGeneratorFormProps> = ({
  definitions,
  loading = false,
  error,
  onSubmit,
}) => {
  const [reportId, setReportId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (!reportId && definitions.length > 0) setReportId(definitions[0].id);
  }, [definitions, reportId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError(null);

    if (!reportId) {
      setValidationError('Select a report type.');
      return;
    }

    if ((startDate && !endDate) || (!startDate && endDate)) {
      setValidationError('Select both start and end dates, or leave both dates empty.');
      return;
    }

    if (startDate && endDate && startDate > endDate) {
      setValidationError('Start date cannot be after the end date.');
      return;
    }

    await onSubmit({ reportId, startDate, endDate });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-start gap-3">
        <div className="rounded-lg bg-blue-50 p-2 text-blue-700">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">Generate report</h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose a report and optional date range. Generation uses the confirmed backend report contract.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2 md:col-span-1">
          <Label htmlFor="report-type">Report type</Label>
          <select
            id="report-type"
            value={reportId}
            onChange={(event) => setReportId(event.target.value)}
            disabled={loading || definitions.length === 0}
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {definitions.length === 0 ? <option value="">No reports available</option> : null}
            {definitions.map((definition) => (
              <option key={definition.id} value={definition.id}>
                {definition.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="start-date">Start date</Label>
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              disabled={loading}
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="end-date">End date</Label>
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              disabled={loading}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {(validationError || error) && (
        <div role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {validationError || error}
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-500">
          Export format and download behavior are intentionally controlled by the backend contract.
        </p>
        <Button type="submit" disabled={loading || definitions.length === 0}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
          {loading ? 'Generating…' : 'Generate report'}
        </Button>
      </div>
    </form>
  );
};

export default ReportGeneratorForm;
