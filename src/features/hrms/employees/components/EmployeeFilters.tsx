import React, { useEffect, useState } from 'react';
import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { Button, Input, Label } from '@/shared/components/ui';
import type { Department } from '../../shared/types/department.types';
import type { Designation } from '../../shared/types/designation.types';
import type { Employee, EmployeeFilters as EmployeeFilterState } from '../../shared/types/employee.types';

interface EmployeeFiltersProps {
  filters: EmployeeFilterState;
  departments: Department[];
  designations: Designation[];
  onChange: (filters: EmployeeFilterState) => void;
  onClear: () => void;
}

const STATUS_OPTIONS: Array<{ value: Employee['status']; label: string }> = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'PROBATION', label: 'Probation' },
  { value: 'ON_LEAVE', label: 'On Leave' },
  { value: 'TERMINATED', label: 'Terminated' },
];

export const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({
  filters,
  departments,
  designations,
  onChange,
  onClear,
}) => {
  const [search, setSearch] = useState(filters.search ?? '');

  useEffect(() => {
    setSearch(filters.search ?? '');
  }, [filters.search]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const nextSearch = search.trim();
      if (nextSearch !== (filters.search ?? '')) {
        onChange({ ...filters, search: nextSearch || undefined, page: 1 });
      }
    }, 300);

    return () => window.clearTimeout(timer);
  }, [search, filters, onChange]);

  const update = (patch: Partial<EmployeeFilterState>) => {
    onChange({ ...filters, ...patch, page: 1 });
  };

  return (
    <section className="rounded-xl border border-slate-200/70 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <SlidersHorizontal className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-sm font-bold text-[#0b1f4d]">Employee Filters</h2>
            <p className="text-xs text-slate-500">Search and narrow the employee directory</p>
          </div>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={onClear}>
          <RotateCcw className="h-3.5 w-3.5" />
          Clear filters
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2 lg:col-span-1">
          <Label htmlFor="employee-search">Search</Label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="employee-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Name or email..."
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="employee-department">Department</Label>
          <select
            id="employee-department"
            value={filters.departmentId ?? ''}
            onChange={(event) => update({ departmentId: event.target.value || undefined })}
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="">All departments</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="employee-designation">Designation</Label>
          <select
            id="employee-designation"
            value={filters.designationId ?? ''}
            onChange={(event) => update({ designationId: event.target.value || undefined })}
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="">All designations</option>
            {designations.map((designation) => (
              <option key={designation.id} value={designation.id}>
                {designation.title}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="employee-status">Status</Label>
          <select
            id="employee-status"
            value={filters.status ?? ''}
            onChange={(event) => update({ status: (event.target.value || undefined) as Employee['status'] | undefined })}
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="">All statuses</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};
