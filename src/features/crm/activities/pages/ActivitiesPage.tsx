import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import ActivityFilters from "../components/ActivityFilters";
import ActivityTable from "../components/ActivityTable";
import { useActivities } from "../hooks/useActivities";
import type { ActivityFilters as ActivityFilterState } from "../types/activity.types";
export const ActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ActivityFilterState>({
    page: 1,
    limit: 10,
  });
  const { data, isLoading, isError, error, refetch } = useActivities(filters);
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-red-500">Activities</h1>
          <p className="mt-1 text-sm font-bold text-black-500">
            Manage calls, meetings, tasks, notes, emails and reminders.
          </p>
        </div>
        <Button onClick={() => navigate("/crm/activities/new")}>
          <Plus className="h-4 w-4" />
          Create Activity
        </Button>
      </div>
      <ActivityFilters filters={filters} onChange={setFilters} />
      {isLoading && (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
          <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
          <p className="mt-3 text-sm text-slate-900">Loading activities...</p>
        </div>
      )}
      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h3 className="font-semibold text-red-800">
            Unable to load activities
          </h3>
          <p className="mt-1 text-sm text-red-600">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading activities."}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => refetch()}
          >
            Try Again
          </Button>
        </div>
      )}
      {!isLoading && !isError && data && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-900">
              Showing{" "}
              <span className="font-medium text-slate-700">
                {data.data.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-700">{data.total}</span>{" "}
              activities
            </p>
            <p className="text-sm text-slate-900">
              Page {data.page} of {Math.max(data.totalPages, 1)}
            </p>
          </div>
          <ActivityTable activities={data.data} />
          {data.totalPages > 1 && (
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={filters.page === 1}
                onClick={() =>
                  setFilters((current) => ({
                    ...current,
                    page: Math.max((current.page ?? 1) - 1, 1),
                  }))
                }
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={filters.page === data.totalPages}
                onClick={() =>
                  setFilters((current) => ({
                    ...current,
                    page: Math.min((current.page ?? 1) + 1, data.totalPages),
                  }))
                }
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
