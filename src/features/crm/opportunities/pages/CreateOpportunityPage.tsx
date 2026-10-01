import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateOpportunity } from "../hooks/useOpportunities";
import { OpportunityForm } from "../forms/opportunityForm";
import type { OpportunityFormValues } from "../schemas/opportunitySchema";

export function CreateOpportunityPage() {
  const navigate = useNavigate();

  const createMutation = useCreateOpportunity();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (values: OpportunityFormValues) => {
    setErrorMessage("");

    try {
      await createMutation.mutateAsync(values);
      navigate("/crm/opportunities");
    } catch (error) {
      console.error("Create opportunity error:", error);

      setErrorMessage("Unable to create opportunity. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">
        {/* Back Button - aligned to the left */}
        <div className="mb-6 flex w-full justify-start">
          <button
            type="button"
            onClick={() => navigate("/crm/opportunities")}
            className="inline-flex w-fit items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
          >
            <span className="text-xl leading-none">←</span>
            <span>Back to Opportunities</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            CRM / Opportunities / Create
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Create Opportunity
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Add a new sales opportunity to your CRM.
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {/* Form Card */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <OpportunityForm
            submitLabel={
              createMutation.isPending
                ? "Creating..."
                : "Create Opportunity"
            }
            onSubmit={handleSubmit}
            isSubmitting={createMutation.isPending}
          />
        </section>
      </div>
    </main>
  );
}