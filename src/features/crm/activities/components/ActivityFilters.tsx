import React from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import type {
  ActivityFilters as ActivityFilterState,
  ActivityStatus,
  ActivityType,
} from "../types/activity.types";
interface ActivityFiltersProps {
  filters: ActivityFilterState;
  onChange: (filters: ActivityFilterState) => void;
}
const ActivityFilters: React.FC<ActivityFiltersProps> = ({
  filters,
  onChange,
}) => {
  const updateFilter = (
    key: keyof ActivityFilterState,
    value: string | number | undefined,
  ) => {
    onChange({
      ...filters,
      [key]: value || undefined,
      page: 1,
    });
  };
  const clearFilters = () => {
    onChange({
      page: 1,
      limit: filters.limit ?? 10,
    });
  };
  const hasFilters =
    Boolean(filters.search) ||
    Boolean(filters.activityType) ||
    Boolean(filters.status) ||
    Boolean(filters.owner) ||
    Boolean(filters.dueDate);
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
        <div className="relative xl:col-span-2">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={filters.search ?? ""}
            onChange={(event) => updateFilter("search", event.target.value)}
            placeholder="Search activities..."
            className="pl-9"
          />
        </div>
        <select
          value={filters.activityType ?? ""}
          onChange={(event) =>
            updateFilter("activityType", event.target.value as ActivityType)
          }
          className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/50"
        >
          <option value="">All Types</option>
          <option value="CALL">Call</option>
          <option value="MEETING">Meeting</option>
          <option value="TASK">Task</option>
          <option value="NOTE">Note</option>
          <option value="EMAIL">Email</option>
        </select>
        <select
          value={filters.status ?? ""}
          onChange={(event) =>
            updateFilter("status", event.target.value as ActivityStatus)
          }
          className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/50"
        >
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <Input
          type="date"
          value={filters.dueDate ?? ""}
          onChange={(event) => updateFilter("dueDate", event.target.value)}
        />
      </div>
      {hasFilters && (
        <div className="mt-3 flex justify-end">
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};
export default ActivityFilters;
