import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateOpportunity } from "../hooks/useOpportunities";
import OpportunityForm from "../forms/opportunityForm";
import type { OpportunityFormValues } from "../schemas/opportunitySchema";

export function CreateOpportunityPage() {
  const navigate = useNavigate();

  const createMutation =
    useCreateOpportunity();

  const [errorMessage, setErrorMessage] =
    useState("");

  const handleSubmit = async (
    values: OpportunityFormValues,
  ) => {
    setErrorMessage("");

    try {
      await createMutation.mutateAsync(
        values,
      );

      navigate("/crm/opportunities");
    } catch (error) {
      console.error(
        "Create opportunity error:",
        error,
      );

      setErrorMessage(
        "Unable to create opportunity. Please try again.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">

        {/* Back button */}
        <div className="mb-6 flex w-full justify-start">
          <button
            type="button"
            onClick={() =>
              navigate(
                "/crm/opportunities",
              )
            }
            className="inline-flex w-fit items-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <span
              className="text-xl leading-none"
              aria-hidden="true"
            >
              ←
            </span>

            <span>
              Back to Opportunities
            </span>
          </button>
        </div>

        {/* Header */}
        <header className="mb-6">
          <p className="text-sm text-slate-500">
            CRM / Opportunities / Create
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Create Opportunity
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Add a new sales opportunity to
            your CRM.
          </p>
        </header>

        {/* Error */}
        {errorMessage && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <section>
          <OpportunityForm
            submitLabel={
              createMutation.isPending
                ? "Creating..."
                : "Create Opportunity"
            }
            onSubmit={handleSubmit}
            isSubmitting={
              createMutation.isPending
            }
          />
        </section>
      </div>
    </main>
  );
}