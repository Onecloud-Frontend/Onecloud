import React from 'react';

import type {
  ApplicationFilters,
  ApplicationStatus,
} from '../types/application.types';

interface RecruitmentFiltersProps {
  filters: ApplicationFilters;
  onChange: (filters: ApplicationFilters) => void;
  onClear: () => void;
}

const STATUS_OPTIONS: Array<{
  value: ApplicationStatus;
  label: string;
}> = [
  { value: 'APPLIED', label: 'Applied' },
  { value: 'UNDER_REVIEW', label: 'Under Review' },
  { value: 'SHORTLISTED', label: 'Shortlisted' },
  { value: 'REJECTED', label: 'Rejected' },
  { value: 'INTERVIEW', label: 'Interview' },
  { value: 'SELECTED', label: 'Selected' },
  { value: 'OFFER', label: 'Offer' },
  { value: 'HIRED', label: 'Hired' },
];

const RecruitmentFilters: React.FC<RecruitmentFiltersProps> = ({
  filters,
  onChange,
  onClear,
}) => {
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...filters,
      search: event.target.value,
      page: 1,
    });
  };

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const status = event.target.value as ApplicationStatus | '';

    onChange({
      ...filters,
      status: status || undefined,
      page: 1,
    });
  };

  return (
    <div className="mb-4 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 md:flex-row md:items-end">
      <div className="flex-1">
        <label
          htmlFor="application-search"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Search
        </label>

        <input
          id="application-search"
          type="text"
          value={filters.search ?? ''}
          onChange={handleSearchChange}
          placeholder="Search candidate or job..."
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500"
        />
      </div>

      <div className="w-full md:w-56">
        <label
          htmlFor="application-status"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Status
        </label>

        <select
          id="application-status"
          value={filters.status ?? ''}
          onChange={handleStatusChange}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-500"
        >
          <option value="">All Statuses</option>

          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        Clear
      </button>
    </div>
  );
};

export default RecruitmentFilters;