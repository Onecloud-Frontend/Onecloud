import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { QuotationFilters } from "../components/QuotationFilters";
import { QuotationTable } from "../components/QuotationTable";
import { useQuotations } from "../hooks/useQuotations";

import type {
  QuotationFilters as QuotationFilterValues,
} from "../types/quotation.types";

const DEFAULT_FILTERS: QuotationFilterValues = {
  search: "",
  status: "all",
  approvalStatus: "all",
  page: 1,
  pageSize: 10,
};

export function QuotationsPage() {
  const navigate = useNavigate();

  const [filters, setFilters] =
    useState<QuotationFilterValues>(DEFAULT_FILTERS);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuotations(filters);

  const handleView = (id: string) => {
    navigate(`/crm/quotations/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/crm/quotations/${id}/edit`);
  };

  const handleCreate = () => {
    navigate("/crm/quotations/new");
  };

  const goToPage = (page: number) => {
    setFilters((current) => ({
      ...current,
      page,
    }));
  };

  const handleFiltersChange = (
    nextFilters: QuotationFilterValues,
  ) => {
    setFilters({
      ...nextFilters,
      page: 1,
    });
  };

  return (
    <main className="min-h-full bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Page header */}
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Sales
            </p>

            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Quotations
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Create, review and manage customer quotations.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCreate}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            <span
              aria-hidden="true"
              className="text-base leading-none"
            >
              +
            </span>

            New quotation
          </button>
        </header>

        {/* Main content */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* Filters */}
          <div className="border-b border-slate-200 p-4 sm:p-5">
            <QuotationFilters
              filters={filters}
              onChange={handleFiltersChange}
            />
          </div>

          {/* List header */}
          <div className="flex flex-col gap-1 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                All quotations
              </h2>

              {!isLoading && data && (
                <span className="mt-0.5 block text-xs text-slate-500">
                  {data.total}{" "}
                  {data.total === 1
                    ? "quotation"
                    : "quotations"}
                </span>
              )}
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div
              className="flex min-h-[360px] flex-col items-center justify-center px-6 py-12"
              role="status"
              aria-live="polite"
            >
              <div
                className="mb-3 h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-slate-700"
                aria-hidden="true"
              />

              <p className="text-sm font-medium text-slate-600">
                Loading quotations...
              </p>
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="flex min-h-[360px] items-center justify-center px-6 py-12">
              <div className="w-full max-w-md rounded-lg border border-red-200 bg-red-50 p-5">
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-700"
                    aria-hidden="true"
                  >
                    !
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-red-900">
                      Couldn't load quotations
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-red-700">
                      Something went wrong while loading the
                      quotation list.
                    </p>

                    <button
                      type="button"
                      onClick={() => refetch()}
                      className="mt-4 inline-flex h-9 items-center justify-center rounded-md border border-red-300 bg-white px-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty */}
          {!isLoading &&
            !isError &&
            data &&
            data.data.length === 0 && (
              <div className="flex min-h-[360px] flex-col items-center justify-center px-6 py-12 text-center">
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-500"
                  aria-hidden="true"
                >
                  Q
                </div>

                <h3 className="text-sm font-semibold text-slate-900">
                  No quotations found
                </h3>

                <p className="mt-1 max-w-sm text-sm leading-5 text-slate-500">
                  Try changing your filters or create a new
                  quotation.
                </p>

                <button
                  type="button"
                  onClick={handleCreate}
                  className="mt-5 inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-slate-900 px-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                  <span aria-hidden="true">+</span>
                  New quotation
                </button>
              </div>
            )}

          {/* Data */}
          {!isLoading &&
            !isError &&
            data &&
            data.data.length > 0 && (
              <>
                <div className="overflow-x-auto">
                  <QuotationTable
                    quotations={data.data}
                    onView={handleView}
                    onEdit={handleEdit}
                  />
                </div>

                {/* Pagination */}
                <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <span className="text-xs text-slate-500">
                    Showing{" "}
                    <span className="font-medium text-slate-700">
                      {data.data.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-slate-700">
                      {data.total}
                    </span>
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={data.page <= 1}
                      onClick={() =>
                        goToPage(data.page - 1)
                      }
                      className="inline-flex h-8 items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Previous
                    </button>

                    <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-md bg-slate-900 px-2 text-xs font-semibold text-white">
                      {data.page}
                    </span>

                    <button
                      type="button"
                      disabled={
                        data.page >= data.totalPages
                      }
                      onClick={() =>
                        goToPage(data.page + 1)
                      }
                      className="inline-flex h-8 items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
        </section>
      </div>
    </main>
  );
}
