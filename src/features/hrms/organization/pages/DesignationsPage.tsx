import DesignationTable from "../components/DesignationTable";
import { useDesignations } from "../hooks/useOrganization";

import "./DesignationsPage.css";

export default function DesignationsPage() {
  const {
    data: designations = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useDesignations();

  if (isLoading) {
    return (
      <div className="designations-page">
        <div className="designations-page__state">
          <div className="designations-page__spinner" />

          <p>Loading designations...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="designations-page">
        <div className="designations-page__state designations-page__state--error">
          <h2>Unable to load designations</h2>

          <p>
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading designations."}
          </p>

          <button
            type="button"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="designations-page">
      <header className="designations-page__header">
        <div>
          <h1>Designations</h1>

          <p>
            View organization designations.
          </p>
        </div>

        <div className="designations-page__count">
          {designations.length} designations
        </div>
      </header>

      <section className="designations-page__card">
        <div className="designations-page__card-header">
          <div>
            <h2>Designation List</h2>

            <p>
              All available designations
            </p>
          </div>
        </div>

        <DesignationTable
          designations={designations}
        />
      </section>
    </div>
  );
}