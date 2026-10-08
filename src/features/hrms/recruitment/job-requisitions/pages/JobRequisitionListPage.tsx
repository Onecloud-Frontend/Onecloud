import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FilePlus,
  FileText,
  Plus,
  RefreshCw,
  SearchX,
  Sparkles,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, PageContainer } from '@/shared/components/ui';
import { useJobRequisitions } from '../hooks/useJobRequisition';
import type { JobRequisition } from '../types/jobRequisition.types';
import type {
  JobRequisitionFilterState,
  JobRequisitionPaginationState,
  JobRequisitionSortState,
} from '../types/jobRequisitionList.types';
import { JobRequisitionFilters } from '../components/JobRequisitionFilters';
import { JobRequisitionTable } from '../components/JobRequisitionTable';
import { JobRequisitionPagination } from '../components/JobRequisitionPagination';

const INITIAL_FILTERS: JobRequisitionFilterState = {
  search: '',
  status: '',
  department: '',
  hiringManager: '',
  priority: '',
  expectedJoiningDate: '',
};

const INITIAL_SORT: JobRequisitionSortState = {
  field: 'createdAt',
  order: 'desc',
};

const INITIAL_PAGINATION: JobRequisitionPaginationState = {
  page: 1,
  limit: 10,
};

export const JobRequisitionListPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch, isFetching } = useJobRequisitions();

  const [filters, setFilters] = useState<JobRequisitionFilterState>(INITIAL_FILTERS);
  const [sortState, setSortState] = useState<JobRequisitionSortState>(INITIAL_SORT);
  const [pagination, setPagination] = useState<JobRequisitionPaginationState>(INITIAL_PAGINATION);

  // All requisitions from server/cache
  const allRequisitions = useMemo(() => data?.data ?? [], [data]);

  // Extract distinct departments & hiring managers for dropdown filters
  const departments = useMemo(() => {
    const set = new Set<string>();
    allRequisitions.forEach((req) => {
      if (req.department) set.add(req.department);
    });
    return Array.from(set).sort();
  }, [allRequisitions]);

  const hiringManagers = useMemo(() => {
    const set = new Set<string>();
    allRequisitions.forEach((req) => {
      if (req.hiringManager) set.add(req.hiringManager);
    });
    return Array.from(set).sort();
  }, [allRequisitions]);

  // Summary KPI statistics
  const stats = useMemo(() => {
    const total = allRequisitions.length;
    const drafts = allRequisitions.filter((r) => r.status === 'DRAFT').length;
    const pending = allRequisitions.filter((r) => r.status === 'PENDING_APPROVAL').length;
    const approved = allRequisitions.filter((r) => r.status === 'APPROVED').length;
    const openings = allRequisitions.filter((r) => r.status === 'JOB_OPENING').length;
    return { total, drafts, pending, approved, openings };
  }, [allRequisitions]);

  // Handle filter changes
  const handleFilterChange = <K extends keyof JobRequisitionFilterState>(
    key: K,
    value: JobRequisitionFilterState[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const hasActiveFilters = useMemo(() => {
    return Boolean(
      filters.search.trim() ||
        filters.status ||
        filters.department ||
        filters.hiringManager ||
        filters.priority ||
        filters.expectedJoiningDate,
    );
  }, [filters]);

  // Filtered & Sorted items
  const filteredAndSortedItems = useMemo(() => {
    let result = [...allRequisitions];

    // Search filter
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.id.toLowerCase().includes(q) ||
          r.jobTitle.toLowerCase().includes(q) ||
          r.department.toLowerCase().includes(q) ||
          r.hiringManager.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          r.education.toLowerCase().includes(q) ||
          r.skills.some((s) => s.toLowerCase().includes(q)),
      );
    }

    // Status filter
    if (filters.status) {
      result = result.filter((r) => r.status === filters.status);
    }

    // Department filter
    if (filters.department) {
      result = result.filter((r) => r.department === filters.department);
    }

    // Hiring manager filter
    if (filters.hiringManager) {
      result = result.filter((r) => r.hiringManager === filters.hiringManager);
    }

    // Priority filter
    if (filters.priority) {
      result = result.filter((r) => r.priority === filters.priority);
    }

    // Expected joining date filter
    if (filters.expectedJoiningDate) {
      result = result.filter((r) => r.expectedJoiningDate.startsWith(filters.expectedJoiningDate));
    }

    // Sorting
    const { field, order } = sortState;
    const factor = order === 'asc' ? 1 : -1;
    result.sort((a, b) => {
      const valA = a[field];
      const valB = b[field];

      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      if (typeof valA === 'number' && typeof valB === 'number') {
        return (valA - valB) * factor;
      }
      return String(valA).localeCompare(String(valB)) * factor;
    });

    return result;
  }, [allRequisitions, filters, sortState]);

  // Paginated items
  const totalFiltered = filteredAndSortedItems.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pagination.limit));
  const currentPage = Math.min(pagination.page, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pagination.limit;
    return filteredAndSortedItems.slice(start, start + pagination.limit);
  }, [filteredAndSortedItems, currentPage, pagination.limit]);

  // Handle sort column click
  const handleSort = (field: keyof JobRequisition) => {
    setSortState((prev) => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (newLimit: number) => {
    setPagination({ page: 1, limit: newLimit });
  };

  const handleViewDetails = (id: string) => {
    navigate(`/hrms/recruitment/job-requisitions/${id}`);
  };

  return (
    <PageContainer className="pb-10 pt-2 space-y-6">
      {/* Header section */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            HRMS / Recruitment
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0b1f4d]">
            Job Requisitions
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View, search, filter and track all recruitment job requisitions and approval statuses.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="h-9 gap-1.5 text-xs text-slate-700"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            Refresh
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={() => navigate('/hrms/recruitment/job-requisitions/new')}
            className="h-9 gap-1.5 bg-blue-600 px-4 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Create Requisition
          </Button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Requisitions</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <FileText className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{stats.total}</p>
          <p className="mt-0.5 text-[11px] text-slate-400">All hiring requests</p>
        </div>

        <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Drafts</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <FilePlus className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{stats.drafts}</p>
          <p className="mt-0.5 text-[11px] text-slate-400">Not yet submitted</p>
        </div>

        <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Pending Approval</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Clock className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-amber-600">{stats.pending}</p>
          <p className="mt-0.5 text-[11px] text-slate-400">Awaiting management signoff</p>
        </div>

        <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Approved</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-emerald-600">{stats.approved}</p>
          <p className="mt-0.5 text-[11px] text-slate-400">Ready for job opening</p>
        </div>

        <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)] col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Job Openings</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-blue-600">{stats.openings}</p>
          <p className="mt-0.5 text-[11px] text-slate-400">Active recruitment phase</p>
        </div>
      </div>

      {/* Filters Section */}
      <JobRequisitionFilters
        filters={filters}
        departments={departments}
        hiringManagers={hiringManagers}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Main Content: Loading, Error, Empty, or Table */}
      {isLoading ? (
        <div className="rounded-xl border border-slate-200/70 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto max-w-sm space-y-4">
            <div className="mx-auto h-10 w-10 animate-pulse rounded-full bg-blue-100" />
            <div className="space-y-2">
              <div className="mx-auto h-4 w-40 animate-pulse rounded bg-slate-100" />
              <div className="mx-auto h-3 w-56 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-8 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h2 className="mt-3 text-base font-bold text-rose-900">Unable to load job requisitions</h2>
          <p className="mt-1 text-xs text-rose-700">
            {error instanceof Error ? error.message : 'An error occurred while fetching requisitions.'}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="mt-4 border-rose-300 text-rose-800 hover:bg-rose-100"
          >
            Try Again
          </Button>
        </div>
      ) : totalFiltered === 0 ? (
        <div className="rounded-xl border border-slate-200/70 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <SearchX className="h-6 w-6" />
          </div>
          <h2 className="mt-3 text-sm font-bold text-slate-800">
            {hasActiveFilters ? 'No matching job requisitions' : 'No job requisitions found'}
          </h2>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            {hasActiveFilters
              ? 'No requisitions match your current search and filter criteria. Try adjusting or clearing your filters.'
              : 'Get started by creating your first job requisition to initiate the recruitment workflow.'}
          </p>

          <div className="mt-5 flex items-center justify-center gap-3">
            {hasActiveFilters ? (
              <Button type="button" variant="outline" size="sm" onClick={handleResetFilters} className="text-xs">
                Clear Filters
              </Button>
            ) : (
              <Button
                type="button"
                size="sm"
                onClick={() => navigate('/hrms/recruitment/job-requisitions/new')}
                className="bg-blue-600 text-xs text-white hover:bg-blue-700"
              >
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                Create First Requisition
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <JobRequisitionTable
            requisitions={paginatedItems}
            sortState={sortState}
            onSort={handleSort}
            onViewDetails={handleViewDetails}
          />

          <JobRequisitionPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalFiltered}
            itemsPerPage={pagination.limit}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </div>
      )}
    </PageContainer>
  );
};

export default JobRequisitionListPage;
