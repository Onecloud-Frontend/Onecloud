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
    <div className="quotation-filters">
      {/* Search */}

      <div className="quotation-search">
        <svg
          width="17"
          height="17"
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
        />
      </div>

      {/* Status */}

      <select
        className="quotation-filter-select"
        value={filters.status ?? "all"}
        onChange={(event) =>
          updateFilter(
            "status",
            event.target.value,
          )
        }
        aria-label="Quotation status"
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

      {/* Approval */}

      <select
        className="quotation-filter-select"
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

      {/* Date range */}

      <div className="quotation-date-filter">
        <label htmlFor="quotation-from-date">
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
        />
      </div>

      <div className="quotation-date-filter">
        <label htmlFor="quotation-to-date">
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
        />
      </div>

      {/* Clear */}

      {hasFilters && (
        <button
          type="button"
          className="quotation-clear-button"
          onClick={clearFilters}
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
