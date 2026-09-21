import React from 'react';
import {
  ALL_OPTION,
  DATE_RANGE_OPTIONS,
  DEFAULT_REPORT_FILTERS,
  LEAD_SOURCES,
  OPPORTUNITY_STAGES,
  QUOTE_STATUSES,
  type ReportFilters,
} from '../types/reports.types';
import { useReportFilterOptions } from '../hooks/useReports';

export type ReportFilterKey = keyof ReportFilters;

interface SelectOption {
  value: string;
  label: string;
}

interface ReportFilterBarProps {
  filters: ReportFilters;
  onChange: (next: ReportFilters) => void;
  /** Which filter controls this report exposes. */
  show: ReportFilterKey[];
  /** Label for the owner control, e.g. "Salesperson" on the performance report. */
  ownerLabel?: string;
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ label, value, options, onChange }) => (
  <label className="flex flex-col gap-1">
    <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</span>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-9 min-w-[150px] rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);

/** Prepends the "All" choice to a list of plain values. */
const withAll = (values: readonly string[]): SelectOption[] => [
  { value: ALL_OPTION, label: 'All' },
  ...values.map((value) => ({ value, label: value })),
];

const isDefaultFilters = (filters: ReportFilters): boolean =>
  (Object.keys(DEFAULT_REPORT_FILTERS) as ReportFilterKey[]).every(
    (key) => filters[key] === DEFAULT_REPORT_FILTERS[key],
  );

/**
 * Filter controls shared by every report page.
 * The page owns the filter state; this component only renders the requested controls
 * and reports changes through onChange.
 */
export const ReportFilterBar: React.FC<ReportFilterBarProps> = ({
  filters,
  onChange,
  show,
  ownerLabel = 'Owner',
}) => {
  const { data: options } = useReportFilterOptions();

  const update = (patch: Partial<ReportFilters>) => onChange({ ...filters, ...patch });

  const handleDateRange = (value: string) => {
    const match = DATE_RANGE_OPTIONS.find((option) => option.value === value);
    if (match) update({ dateRange: match.value });
  };

  return (
    <div className="flex flex-wrap items-end gap-4 rounded-xl border border-slate-200/60 bg-white p-4">
      {show.includes('dateRange') && (
        <FilterSelect
          label="Date Range"
          value={filters.dateRange}
          options={DATE_RANGE_OPTIONS.map((option) => ({ value: option.value, label: option.label }))}
          onChange={handleDateRange}
        />
      )}
      {show.includes('owner') && (
        <FilterSelect
          label={ownerLabel}
          value={filters.owner}
          options={withAll(options?.owners ?? [])}
          onChange={(owner) => update({ owner })}
        />
      )}
      {show.includes('team') && (
        <FilterSelect
          label="Team"
          value={filters.team}
          options={withAll(options?.teams ?? [])}
          onChange={(team) => update({ team })}
        />
      )}
      {show.includes('region') && (
        <FilterSelect
          label="Region"
          value={filters.region}
          options={withAll(options?.regions ?? [])}
          onChange={(region) => update({ region })}
        />
      )}
      {show.includes('source') && (
        <FilterSelect
          label="Lead Source"
          value={filters.source}
          options={withAll(LEAD_SOURCES)}
          onChange={(source) => update({ source })}
        />
      )}
      {show.includes('stage') && (
        <FilterSelect
          label="Stage"
          value={filters.stage}
          options={withAll(OPPORTUNITY_STAGES)}
          onChange={(stage) => update({ stage })}
        />
      )}
      {show.includes('status') && (
        <FilterSelect
          label="Quote Status"
          value={filters.status}
          options={withAll(QUOTE_STATUSES)}
          onChange={(status) => update({ status })}
        />
      )}
      <button
        type="button"
        onClick={() => onChange(DEFAULT_REPORT_FILTERS)}
        disabled={isDefaultFilters(filters)}
        className="h-9 rounded-md px-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-40"
      >
        Reset
      </button>
    </div>
  );
};
