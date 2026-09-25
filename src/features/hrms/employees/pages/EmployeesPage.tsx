import React, { useCallback, useMemo, useState } from 'react';
import { AlertCircle, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, PageContainer } from '@/shared/components/ui';
import { mockDepartments, mockDesignations } from '../mocks/employeesMockData';
import { useEmployees } from '../hooks/useEmployees';
import type { Employee, EmployeeFilters } from '../../shared/types/employee.types';
import { EmployeeFilters as EmployeeFiltersPanel } from '../components/EmployeeFilters';
import { EmployeePagination } from '../components/EmployeePagination';
import { EmployeeTable } from '../components/EmployeeTable';

const DEFAULT_LIMIT = 10;

const EmployeesPage: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<EmployeeFilters>({ page: 1, limit: DEFAULT_LIMIT });

  const { data, isLoading, isFetching, isError, error, refetch } = useEmployees(filters);

  const departments = mockDepartments;
  const designations = mockDesignations;

  const updateFilters = useCallback((nextFilters: EmployeeFilters) => {
    setFilters({ ...nextFilters, page: nextFilters.page ?? 1, limit: nextFilters.limit ?? DEFAULT_LIMIT });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ page: 1, limit: DEFAULT_LIMIT });
  }, []);

  const handleSort = useCallback((field: keyof Employee) => {
    setFilters((current) => ({
      ...current,
      page: 1,
      sortBy: field,
      sortOrder: current.sortBy === field && current.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters((current) => ({ ...current, page }));
  }, []);

  const hasActiveFilters = useMemo(
    () => Boolean(filters.search || filters.departmentId || filters.designationId || filters.status),
    [filters],
  );

  return (
    <PageContainer className="pb-8">
      <div className="pt-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">HRMS / Employees</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0b1f4d]">Employee List</h1>
        <p className="mt-1 text-sm text-slate-500">Search, filter and manage the employee directory.</p>
      </div>

      <EmployeeFiltersPanel
        filters={filters}
        departments={departments}
        designations={designations}
        onChange={updateFilters}
        onClear={clearFilters}
      />

      {isLoading ? (
        <div className="rounded-xl border border-slate-200/70 bg-white p-12 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="mx-auto max-w-sm space-y-4 text-center">
            <div className="mx-auto h-10 w-10 animate-pulse rounded-full bg-blue-100" />
            <div className="space-y-2">
              <div className="mx-auto h-4 w-36 animate-pulse rounded bg-slate-100" />
              <div className="mx-auto h-3 w-56 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <AlertCircle className="h-5 w-5" />
            </div>
            <h2 className="mt-3 text-sm font-bold text-rose-900">Unable to load employees</h2>
            <p className="mt-1 max-w-md text-xs text-rose-700">
              {error instanceof Error ? error.message : 'Something went wrong while loading the employee directory.'}
            </p>
            <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => refetch()}>
              Try again
            </Button>
          </div>
        </div>
      ) : data && data.data.length > 0 ? (
        <div className="relative">
          {isFetching && (
            <div className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-blue-600 shadow-sm ring-1 ring-slate-200">
              Updating…
            </div>
          )}
          <EmployeeTable
            employees={data.data}
            departments={departments}
            designations={designations}
            sortBy={filters.sortBy}
            sortOrder={filters.sortOrder}
            onSort={handleSort}
            onView={(employeeId) => navigate(`/hrms/employees/${employeeId}`)}
          />
          <EmployeePagination result={data} onPageChange={handlePageChange} />
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <Users className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-sm font-bold text-[#0b1f4d]">No employees found</h2>
          <p className="mx-auto mt-1 max-w-md text-xs text-slate-500">
            {hasActiveFilters
              ? 'No employees match the selected filters. Clear the filters and try again.'
              : 'There are no employees available in the current employee directory.'}
          </p>
          {hasActiveFilters && (
            <Button type="button" variant="outline" size="sm" className="mt-4" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>
      )}
    </PageContainer>
  );
};

export default EmployeesPage;
