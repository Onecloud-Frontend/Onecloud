import React from 'react';
import { Calendar, Filter, RotateCcw, Search } from 'lucide-react';
import { Button, Input, Label } from '@/shared/components/ui';
import type { JobRequisitionStatus, RequisitionPriority } from '../types/jobRequisition.types';
import type { JobRequisitionFilterState } from '../types/jobRequisitionList.types';

interface JobRequisitionFiltersProps {
  filters: JobRequisitionFilterState;
  departments: string[];
  hiringManagers: string[];
  onFilterChange: <K extends keyof JobRequisitionFilterState>(key: K, value: JobRequisitionFilterState[K]) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

const STATUS_OPTIONS: Array<{ value: JobRequisitionStatus; label: string }> = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'PENDING_APPROVAL', label: 'Pending Approval' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'JOB_OPENING', label: 'Job Opening' },
];

const PRIORITY_OPTIONS: Array<{ value: RequisitionPriority; label: string }> = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'URGENT', label: 'Urgent' },
];

export const JobRequisitionFilters: React.FC<JobRequisitionFiltersProps> = ({
  filters,
  departments,
  hiringManagers,
  onFilterChange,
  onResetFilters,
  hasActiveFilters,
}) => {
  return (
    <section
      aria-label="Job Requisition Filters"
      className="rounded-xl border border-slate-200/70 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Filter className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-sm font-bold text-[#0b1f4d]">Filter Requisitions</h2>
            <p className="text-xs text-slate-500">Filter by search keyword, status, department, hiring manager, priority, or date</p>
          </div>
        </div>

        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="text-xs text-slate-600 hover:text-blue-600"
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Reset all filters
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {/* Search */}
        <div className="space-y-1.5 sm:col-span-2 md:col-span-1 xl:col-span-2">
          <Label htmlFor="req-search" className="text-xs font-semibold text-slate-700">
            Search
          </Label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="req-search"
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              placeholder="Title, ID, manager, or skill..."
              className="h-9 pl-9 text-xs"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="space-y-1.5">
          <Label htmlFor="req-status" className="text-xs font-semibold text-slate-700">
            Status
          </Label>
          <select
            id="req-status"
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value as JobRequisitionStatus | '')}
            className="h-9 w-full rounded-md border border-input bg-white px-3 text-xs outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Department Filter */}
        <div className="space-y-1.5">
          <Label htmlFor="req-department" className="text-xs font-semibold text-slate-700">
            Department
          </Label>
          <select
            id="req-department"
            value={filters.department}
            onChange={(e) => onFilterChange('department', e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-white px-3 text-xs outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Hiring Manager Filter */}
        <div className="space-y-1.5">
          <Label htmlFor="req-manager" className="text-xs font-semibold text-slate-700">
            Hiring Manager
          </Label>
          <select
            id="req-manager"
            value={filters.hiringManager}
            onChange={(e) => onFilterChange('hiringManager', e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-white px-3 text-xs outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="">All Managers</option>
            {hiringManagers.map((mgr) => (
              <option key={mgr} value={mgr}>
                {mgr}
              </option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div className="space-y-1.5">
          <Label htmlFor="req-priority" className="text-xs font-semibold text-slate-700">
            Priority
          </Label>
          <select
            id="req-priority"
            value={filters.priority}
            onChange={(e) => onFilterChange('priority', e.target.value as RequisitionPriority | '')}
            className="h-9 w-full rounded-md border border-input bg-white px-3 text-xs outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="">All Priorities</option>
            {PRIORITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Expected Joining Date Filter */}
        <div className="space-y-1.5 sm:col-span-2 md:col-span-1 xl:col-span-1">
          <Label htmlFor="req-date" className="text-xs font-semibold text-slate-700">
            Joining Date
          </Label>
          <div className="relative">
            <Calendar className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <Input
              id="req-date"
              type="date"
              value={filters.expectedJoiningDate}
              onChange={(e) => onFilterChange('expectedJoiningDate', e.target.value)}
              className="h-9 pl-8 text-xs"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
