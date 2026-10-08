import React, { useCallback, useMemo, useState } from 'react';
import { AlertCircle, FileText, X } from 'lucide-react';
import { Button, PageContainer } from '@/shared/components/ui';

import {
  useApplications,
  useUpdateApplicationStatus,
} from '../hooks/useApplications';

import RecruitmentFilters from '../components/RecruitmentFilters';
import RecruitmentPagination from '../components/RecruitmentPagination';
import RecruitmentStatusBadge from '../components/RecruitmentStatusBadge';
import RecruitmentTable from '../components/RecruitmentTable';

import type {
  Application,
  ApplicationFilters,
  ApplicationStatus,
} from '../types/application.types';

const DEFAULT_LIMIT = 10;

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

const ApplicationsPage: React.FC = () => {
  const [filters, setFilters] = useState<ApplicationFilters>({
    page: 1,
    limit: DEFAULT_LIMIT,
  });

  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const { data, isLoading, isFetching, isError, error, refetch } =
    useApplications(filters);

  const updateApplicationStatus = useUpdateApplicationStatus();

  const updateFilters = useCallback(
    (nextFilters: ApplicationFilters) => {
      setFilters({
        ...nextFilters,
        page: nextFilters.page ?? 1,
        limit: nextFilters.limit ?? DEFAULT_LIMIT,
      });
    },
    [],
  );

  const clearFilters = useCallback(() => {
    setFilters({
      page: 1,
      limit: DEFAULT_LIMIT,
    });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters((current) => ({
      ...current,
      page,
    }));
  }, []);

  const handleViewApplication = useCallback(
    (application: Application) => {
      setSelectedApplication(application);
    },
    [],
  );

  const handleCloseDetails = useCallback(() => {
    setSelectedApplication(null);
  }, []);

  const handleStatusChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (!selectedApplication) {
        return;
      }

      const status = event.target.value as ApplicationStatus;

      updateApplicationStatus.mutate(
        {
          id: selectedApplication.id,
          status,
        },
        {
          onSuccess: (updatedApplication) => {
            setSelectedApplication(updatedApplication);
          },
        },
      );
    },
    [selectedApplication, updateApplicationStatus],
  );

  const hasActiveFilters = useMemo(
    () => Boolean(filters.search || filters.status),
    [filters],
  );

  return (
    <PageContainer>
      <div className="space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-slate-700" />
              <h1 className="text-xl font-semibold text-slate-900">
                Applications
              </h1>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Manage candidate applications and recruitment status.
            </p>
          </div>

          {isFetching && !isLoading && (
            <span className="text-xs font-medium text-slate-500">
              Updating...
            </span>
          )}
        </div>

        <RecruitmentFilters
          filters={filters}
          onChange={updateFilters}
          onClear={clearFilters}
        />

        {isLoading ? (
          <div className="rounded-lg border border-slate-200 bg-white px-5 py-12 text-center">
            <p className="text-sm text-slate-500">
              Loading applications...
            </p>
          </div>
        ) : isError ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-5 py-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 text-rose-600" />

              <div>
                <h2 className="text-sm font-semibold text-rose-800">
                  Unable to load applications
                </h2>

                <p className="mt-1 text-sm text-rose-700">
                  {error instanceof Error
                    ? error.message
                    : 'Something went wrong while loading applications.'}
                </p>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => refetch()}
                >
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        ) : data?.data.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white px-5 py-12 text-center">
            <p className="text-sm font-medium text-slate-700">
              No applications found
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {hasActiveFilters
                ? 'Try changing or clearing your filters.'
                : 'There are no applications available.'}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <RecruitmentTable
              applications={data?.data ?? []}
              onView={handleViewApplication}
            />

            {data && (
              <RecruitmentPagination
                result={data}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        )}
      </div>

      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Application Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {selectedApplication.id}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseDetails}
                className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close application details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-5 px-5 py-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Candidate
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {selectedApplication.candidateName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Email
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {selectedApplication.candidateEmail}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Job Opening
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {selectedApplication.jobTitle}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Applied Date
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {selectedApplication.appliedDate}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Recruiter
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {selectedApplication.recruiterName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Current Stage
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {selectedApplication.currentStage}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Status
                </p>

                <div className="mt-2">
                  <RecruitmentStatusBadge
                    status={selectedApplication.status}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="application-status-change"
                  className="text-xs font-medium text-slate-500"
                >
                  Change Status
                </label>

                <select
                  id="application-status-change"
                  value={selectedApplication.status}
                  onChange={handleStatusChange}
                  disabled={updateApplicationStatus.isPending}
                  className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-500 disabled:cursor-not-allowed disabled:bg-slate-100"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {updateApplicationStatus.isPending && (
                  <p className="mt-1 text-xs text-slate-500">
                    Updating status...
                  </p>
                )}

                {updateApplicationStatus.isError && (
                  <p className="mt-1 text-xs text-rose-600">
                    Failed to update status. Please try again.
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-200 px-5 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDetails}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default ApplicationsPage;