import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { QuotationFilters } from "../components/QuotationFilters";
import { QuotationTable } from "../components/QuotationTable";
import { useQuotations } from "../hooks/useQuotations";

import type {
  QuotationFilters as QuotationFilterValues,
} from "../types/quotation.types";

import "../styles/quotations.css";

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
    useState<QuotationFilterValues>(
      DEFAULT_FILTERS,
    );

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
    <main className="quotations-page">
      {/* Page header */}

      <header className="quotations-header">
        <div>
          <p className="page-eyebrow">
            Sales
          </p>

          <h1>Quotations</h1>

          <p className="page-description">
            Create, review and manage customer
            quotations.
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={handleCreate}
        >
          <span aria-hidden="true">+</span>
          New quotation
        </button>
      </header>

      {/* Main content */}

      <section className="quotation-content">
        <QuotationFilters
          filters={filters}
          onChange={handleFiltersChange}
        />

        {/* List header */}

        <div className="quotation-list-header">
          <div>
            <h2>
              All quotations
            </h2>

            {!isLoading && data && (
              <span>
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
          <div className="quotation-state">
            <div
              className="loading-spinner"
              aria-hidden="true"
            />

            <p>
              Loading quotations...
            </p>
          </div>
        )}

        {/* Error */}

        {isError && (
          <div className="quotation-state quotation-error">
            <div>
              <h3>
                Couldn't load quotations
              </h3>

              <p>
                Something went wrong while
                loading the quotation list.
              </p>
            </div>

            <button
              type="button"
              onClick={() => refetch()}
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty */}

        {!isLoading &&
          !isError &&
          data &&
          data.data.length === 0 && (
            <div className="quotation-state">
              <div
                className="empty-icon"
                aria-hidden="true"
              >
                Q
              </div>

              <h3>
                No quotations found
              </h3>

              <p>
                Try changing your filters or
                create a new quotation.
              </p>

              <button
                type="button"
                className="primary-button"
                onClick={handleCreate}
              >
                + New quotation
              </button>
            </div>
          )}

        {/* Data */}

        {!isLoading &&
          !isError &&
          data &&
          data.data.length > 0 && (
            <>
              <QuotationTable
                quotations={data.data}
                onView={handleView}
                onEdit={handleEdit}
              />

              {/* Pagination */}

              <div className="quotation-pagination">
                <span>
                  Showing{" "}
                  {data.data.length} of{" "}
                  {data.total}
                </span>

                <div className="pagination-controls">
                  <button
                    type="button"
                    disabled={data.page <= 1}
                    onClick={() =>
                      goToPage(data.page - 1)
                    }
                  >
                    Previous
                  </button>

                  <span className="page-number">
                    {data.page}
                  </span>

                  <button
                    type="button"
                    disabled={
                      data.page >=
                      data.totalPages
                    }
                    onClick={() =>
                      goToPage(data.page + 1)
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
      </section>
    </main>
  );
}
