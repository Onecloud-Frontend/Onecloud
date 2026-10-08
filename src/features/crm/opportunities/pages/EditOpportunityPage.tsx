import { useState } from "react";
import {useNavigate,useParams,} from "react-router-dom";
import OpportunityForm from "../forms/opportunityForm";
import {useOpportunity,useUpdateOpportunity,} from "../hooks/useOpportunities";
import type { OpportunityFormValues } from "../schemas/opportunitySchema";

export function EditOpportunityPage() {
  const navigate = useNavigate();

  const { id } =
    useParams<{ id: string }>();

  const [errorMessage, setErrorMessage] =
    useState("");

  const {
    data: opportunity,
    isLoading,
    isError,
  } = useOpportunity(id ?? "");

  const updateMutation =
    useUpdateOpportunity();

  const handleSubmit = async (
    values: OpportunityFormValues,
  ) => {
    if (!id) {
      setErrorMessage(
        "Opportunity ID is missing.",
      );
      return;
    }

    setErrorMessage("");

    try {
      await updateMutation.mutateAsync({
        id,
        values,
      });

      navigate(
        `/crm/opportunities/${id}`,
      );
    } catch (error) {
      console.error(
        "Update opportunity error:",
        error,
      );

      setErrorMessage(
        "Unable to update opportunity. Please try again.",
      );
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading opportunity...
          </p>
        </div>
      </main>
    );
  }

  if (isError || !opportunity) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-xl border border-red-200 bg-red-50 p-6">
          <h1 className="text-xl font-semibold text-red-700">
            Opportunity Not Found
          </h1>

          <p className="mt-2 text-sm text-red-600">
            The requested opportunity could
            not be loaded.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/crm/opportunities",
              )
            }
            className="mt-4 inline-flex items-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <span className="text-xl leading-none">
              ←
            </span>

            <span>
              Back to Opportunities
            </span>
          </button>
        </div>
      </main>
    );
  }

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
            <span className="text-xl leading-none">
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
            CRM / Opportunities / Edit
          </p>

          <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Edit Opportunity
              </h1>

              <p className="mt-2 text-sm text-slate-600">
                Update the information for
                this opportunity.
              </p>
            </div>

            <div className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600">
              {opportunity.opportunityCode}
            </div>
          </div>
        </header>

        {/* Error */}
        {errorMessage && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <OpportunityForm
          initialValues={{
            name: opportunity.name,

            customerId:
              opportunity.customerId,

            contactId:
              opportunity.contactId ?? "",

            leadId:
              opportunity.leadId ?? "",

            stage:
              opportunity.stage,

            probability:
              opportunity.probability,

            expectedRevenue:
              opportunity.expectedRevenue,

            amount:
              opportunity.amount,

            expectedCloseDate:
              opportunity.expectedCloseDate,

            assignedTo:
              opportunity.assignedTo,

            source:
              opportunity.source ?? "",

            competitors:
              opportunity.competitors ?? [],

            description:
              opportunity.description ?? "",
          }}
          submitLabel={
            updateMutation.isPending
              ? "Updating..."
              : "Update Opportunity"
          }
          onSubmit={handleSubmit}
          isSubmitting={
            updateMutation.isPending
          }
        />
      </div>
    </main>
  );
}