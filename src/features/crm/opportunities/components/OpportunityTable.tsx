import { useNavigate } from "react-router-dom";
import type { Opportunity } from "../types/opportunityTypes";
import { OpportunityStatusBadge } from "./OpportunityStatusBadge";

interface OpportunityTableProps {
  opportunities: Opportunity[];
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

function formatCurrency(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString("en-IN")}`;
  }
}

function formatDate(date: string) {
  if (!date) return "N/A";

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "N/A";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

function getStageStyle(stage: string) {
  if (stage === "Closed Won") return "bg-emerald-50 text-emerald-700";
  if (stage === "Closed Lost") return "bg-red-50 text-red-700";
  if (stage === "Negotiation") return "bg-purple-50 text-purple-700";
  if (stage === "Proposal") return "bg-orange-50 text-orange-700";

  return "bg-indigo-50 text-indigo-700";
}

export function OpportunityTable({
  opportunities,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onDelete,
  isDeleting = false,
}: OpportunityTableProps) {
  const navigate = useNavigate();

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const firstItem = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastItem = Math.min(page * pageSize, totalCount);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  if (totalCount === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <span className="text-xl" aria-hidden="true">📁</span>
        </div>
        <h3 className="text-base font-semibold text-slate-900">
          No opportunities found
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Try changing your filters or create a new opportunity.
        </p>
      </div>
    );
  }

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div
        className="w-full overflow-x-auto"
        role="region"
        aria-label="Opportunities table"
        tabIndex={0}
      >
        <table className="w-full min-w-[2200px] table-auto text-left">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              {[
                "Opportunity ID",
                "Opportunity Name",
                "Customer",
                "Contact",
                "Lead Source",
                "Stage",
                "Expected Revenue",
                "Probability",
                "Expected Close Date",
                "Owner",
                "Competitor",
                "Status",
                "Created Date",
                "Last Updated",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="whitespace-nowrap px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {opportunities.map((opportunity) => (
              <tr
                key={opportunity.id}
                className="transition-colors hover:bg-slate-50/80"
              >
                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                  {opportunity.id}
                </td>

                <td className="px-5 py-4">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/crm/opportunities/${opportunity.id}`)
                    }
                    className="text-left"
                  >
                    <span className="block max-w-[220px] truncate text-sm font-semibold text-slate-900 hover:text-indigo-600">
                      {opportunity.name}
                    </span>
                  </button>
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">
                  {opportunity.customerName}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                  {opportunity.contactName || "N/A"}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                  {opportunity.source || "N/A"}
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  <span
                    className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-semibold ${getStageStyle(
                      opportunity.stage,
                    )}`}
                  >
                    {opportunity.stage}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-900">
                  {formatCurrency(
                    opportunity.expectedRevenue,
                    opportunity.currency,
                  )}
                </td>

                <td className="px-5 py-4">
                  <div className="w-28">
                    <div className="mb-1 text-xs font-semibold text-slate-700">
                      {opportunity.probability}%
                    </div>
                    <div
                      className="h-1.5 overflow-hidden rounded-full bg-slate-100"
                      aria-label={`Probability ${opportunity.probability}%`}
                    >
                      <div
                        className="h-full rounded-full bg-indigo-500 transition-all"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(0, opportunity.probability),
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                  {formatDate(opportunity.expectedCloseDate)}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                  {opportunity.ownerName}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                  {opportunity.competitor || "N/A"}
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  <OpportunityStatusBadge status={opportunity.status} />
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                  {formatDate(opportunity.createdAt)}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                  {formatDate(opportunity.updatedAt)}
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/crm/opportunities/${opportunity.id}`)
                      }
                      className="rounded-lg px-3 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/crm/opportunities/${opportunity.id}/edit`,
                        )
                      }
                      className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() => onDelete(opportunity.id)}
                      className="rounded-lg px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Responsive pagination footer */}
      <div className="flex flex-col gap-4 border-t border-slate-200 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:gap-4">
          <p>
            Showing{" "}
            <span className="font-semibold text-slate-700">{firstItem}</span>
            {"–"}
            <span className="font-semibold text-slate-700">{lastItem}</span>
            {" of "}
            <span className="font-semibold text-slate-700">{totalCount}</span>
            {" opportunities"}
          </p>

          <label className="flex items-center gap-2">
            <span>Rows per page</span>
            <select
              value={pageSize}
              onChange={(event) => onPageSizeChange(Number(event.target.value))}
              className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {[10, 25, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>

        <nav
          className="flex flex-wrap items-center gap-1"
          aria-label="Pagination"
        >
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Go to previous page"
          >
            Previous
          </button>

          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              aria-current={pageNumber === page ? "page" : undefined}
              className={`min-w-9 rounded-lg px-3 py-2 text-sm font-semibold ${
                pageNumber === page
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {pageNumber}
            </button>
          ))}

          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Go to next page"
          >
            Next
          </button>
        </nav>
      </div>
    </section>
  );
}