import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OpportunityForm } from "../forms/opportunityForm";
import {useOpportunity,useUpdateOpportunity,} from "../hooks/useOpportunities";
import type { OpportunityFormValues } from "../schemas/opportunitySchema";

export function EditOpportunityPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: opportunity,
    isLoading,
    isError,
  } = useOpportunity(id ?? "");

  const updateMutation = useUpdateOpportunity();

  const handleSubmit = async (values: OpportunityFormValues) => {
    if (!id) {
      setErrorMessage("Opportunity ID is missing.");
      return;
    }

    setErrorMessage("");

    try {
      await updateMutation.mutateAsync({
        id,
        values,
      });

      navigate("/crm/opportunities");
    } catch (error) {
      console.error("Update opportunity error:", error);

      setErrorMessage("Unable to update opportunity. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading opportunity...</p>
      </main>
    );
  }

  if (isError || !opportunity) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-3xl rounded-xl border border-red-200 bg-red-50 p-6">
          <h1 className="text-xl font-semibold text-red-700">
            Opportunity Not Found
          </h1>

          <p className="mt-2 text-sm text-red-600">
            The requested opportunity could not be loaded.
          </p>

          <button
            type="button"
            onClick={() => navigate("/crm/opportunities")}
            className="mt-4 inline-flex w-fit items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
          >
            <span className="text-xl leading-none">←</span>
            <span>Back to Opportunities</span>
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          {/* Back Button - left aligned */}
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

          {/* Page Heading */}
          <div>
            <p className="text-sm text-gray-500">
              CRM / Opportunities / Edit
            </p>

            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Edit Opportunity
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Update the information for this opportunity.
            </p>
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <OpportunityForm
            initialValues={{
              name: opportunity.name,
              customerName: opportunity.customerName,
              contactName: opportunity.contactName ?? "",
              description: opportunity.description ?? "",
              stage: opportunity.stage,
              expectedRevenue: opportunity.expectedRevenue,
              probability: opportunity.probability,
              expectedCloseDate: opportunity.expectedCloseDate,
              ownerName: opportunity.ownerName,
              competitor: opportunity.competitor ?? "",
              source: opportunity.source ?? "",
              currency: opportunity.currency,
              notes: opportunity.notes ?? "",
            }}
            submitLabel={
              updateMutation.isPending
                ? "Updating..."
                : "Update Opportunity"
            }
            onSubmit={handleSubmit}
            isSubmitting={updateMutation.isPending}
          />
        </section>
      </div>
    </main>
  );
}