import type {
  QuotationFilters as QuotationFilterValues,
  QuotationStatus,
} from "../types/quotation.types";

interface QuotationFiltersProps {
  filters: QuotationFilterValues;
  onChange: (filters: QuotationFilterValues) => void;
}

const statusOptions: Array<{
  label: string;
  value: QuotationStatus | "all";
}> = [
  {
    label: "All statuses",
    value: "all",
  },
  {
    label: "Draft",
    value: "draft",
  },
  {
    label: "Sent",
    value: "sent",
  },
  {
    label: "Accepted",
    value: "accepted",
  },
  {
    label: "Rejected",
    value: "rejected",
  },
  {
    label: "Expired",
    value: "expired",
  },
];

const approvalOptions = [
  {
    label: "All approvals",
    value: "all",
  },
  {
    label: "Not submitted",
    value: "not_submitted",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Approved",
    value: "approved",
  },
  {
    label: "Rejected",
    value: "rejected",
  },
];

export function QuotationFilters({
  filters,
  onChange,
}: QuotationFiltersProps) {
  const updateFilter = (
    key: keyof QuotationFilterValues,
    value: string,
  ) => {
    onChange({
      ...filters,
      [key]: value || undefined,
      page: 1,
    });
  };

  const clearFilters = () => {
    onChange({
      search: "",
      status: "all",
      approvalStatus: "all",
      customerId: undefined,
      fromDate: undefined,
      toDate: undefined,
      page: 1,
      pageSize: 10,
    });
  };

  const hasFilters =
    Boolean(filters.search) ||
    Boolean(filters.fromDate) ||
    Boolean(filters.toDate) ||
    Boolean(
      filters.status &&
        filters.status !== "all",
    ) ||
    Boolean(
      filters.approvalStatus &&
        filters.approvalStatus !== "all",
    );

  return (
    <div className="flex flex-col gap-3 xl:flex-row xl:items-end">
      {/* Search */}
      <div className="min-w-0 flex-1">
        <label
          htmlFor="quotation-search"
          className="mb-1.5 block text-xs font-medium text-slate-600"
        >
          Search
        </label>

        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

          <input
            id="quotation-search"
            type="search"
            placeholder="Search quotations..."
            value={filters.search ?? ""}
            onChange={(event) =>
              updateFilter(
                "search",
                event.target.value,
              )
            }
            aria-label="Search quotations"
            className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />
        </div>
      </div>

      {/* Status */}
      <div className="w-full xl:w-40">
        <label
          htmlFor="quotation-status"
          className="mb-1.5 block text-xs font-medium text-slate-600"
        >
          Status
        </label>

        <select
          id="quotation-status"
          value={filters.status ?? "all"}
          onChange={(event) =>
            updateFilter(
              "status",
              event.target.value,
            )
          }
          aria-label="Quotation status"
          className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        >
          {statusOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Approval */}
      <div className="w-full xl:w-44">
        <label
          htmlFor="quotation-approval-status"
          className="mb-1.5 block text-xs font-medium text-slate-600"
        >
          Approval
        </label>

        <select
          id="quotation-approval-status"
          value={
            filters.approvalStatus ?? "all"
          }
          onChange={(event) =>
            updateFilter(
              "approvalStatus",
              event.target.value,
            )
          }
          aria-label="Approval status"
          className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        >
          {approvalOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* From date */}
      <div className="w-full sm:w-[calc(50%-0.375rem)] xl:w-36">
        <label
          htmlFor="quotation-from-date"
          className="mb-1.5 block text-xs font-medium text-slate-600"
        >
          From
        </label>

        <input
          id="quotation-from-date"
          type="date"
          value={filters.fromDate ?? ""}
          onChange={(event) =>
            updateFilter(
              "fromDate",
              event.target.value,
            )
          }
          aria-label="From date"
          className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        />
      </div>

      {/* To date */}
      <div className="w-full sm:w-[calc(50%-0.375rem)] xl:w-36">
        <label
          htmlFor="quotation-to-date"
          className="mb-1.5 block text-xs font-medium text-slate-600"
        >
          To
        </label>

        <input
          id="quotation-to-date"
          type="date"
          value={filters.toDate ?? ""}
          onChange={(event) =>
            updateFilter(
              "toDate",
              event.target.value,
            )
          }
          aria-label="To date"
          className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        />
      </div>

      {/* Clear */}
      {hasFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="h-9 shrink-0 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
