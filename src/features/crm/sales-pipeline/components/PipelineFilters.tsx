import { useState } from "react";

export interface PipelineFilterValues {
  search: string;
  owner: string;
  stage: string;
  customer: string;
  dateFrom: string;
  dateTo: string;
}

interface PipelineFiltersProps {
  owners?: string[];
  stages?: string[];
  customers?: string[];

  onApply?: (filters: PipelineFilterValues) => void;

  onReset?: () => void;
}

const defaultFilters: PipelineFilterValues = {
  search: "",
  owner: "",
  stage: "",
  customer: "",
  dateFrom: "",
  dateTo: "",
};

export default function PipelineFilters({
  owners = [],
  stages = [],
  customers = [],
  onApply,
  onReset,
}: PipelineFiltersProps) {
  const [filters, setFilters] = useState<PipelineFilterValues>(defaultFilters);

  const handleChange = (field: keyof PipelineFilterValues, value: string) => {
    setFilters((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleApply = () => {
    onApply?.(filters);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    onReset?.();
  };

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <div>
          <label
            htmlFor="pipeline-search"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Search
          </label>

          <input
            id="pipeline-search"
            type="text"
            value={filters.search}
            onChange={(event) => handleChange("search", event.target.value)}
            placeholder="Opportunity or customer..."
            className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
          />
        </div>

        <div>
          <label
            htmlFor="pipeline-owner"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Owner
          </label>

          <select
            id="pipeline-owner"
            value={filters.owner}
            onChange={(event) => handleChange("owner", event.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">All Owners</option>

            {owners.map((owner) => (
              <option key={owner} value={owner}>
                {owner}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="pipeline-stage"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Stage
          </label>

          <select
            id="pipeline-stage"
            value={filters.stage}
            onChange={(event) => handleChange("stage", event.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">All Stages</option>

            {stages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="pipeline-customer"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Customer
          </label>

          <select
            id="pipeline-customer"
            value={filters.customer}
            onChange={(event) => handleChange("customer", event.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">All Customers</option>

            {customers.map((customer) => (
              <option key={customer} value={customer}>
                {customer}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="pipeline-date-from"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Close Date From
          </label>

          <input
            id="pipeline-date-from"
            type="date"
            value={filters.dateFrom}
            onChange={(event) => handleChange("dateFrom", event.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="pipeline-date-to"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Close Date To
          </label>

          <input
            id="pipeline-date-to"
            type="date"
            value={filters.dateTo}
            onChange={(event) => handleChange("dateTo", event.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={handleApply}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white"
        >
          Apply Filters
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
