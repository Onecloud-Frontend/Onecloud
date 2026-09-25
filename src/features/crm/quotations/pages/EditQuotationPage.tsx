import { useMemo } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { QuotationForm } from "../forms/QuotationForm";
import { useQuotation } from "../hooks/useQuotation";
import { useUpdateQuotation } from "../hooks/useUpdateQuotation";
import type {
  QuotationFormValues,
} from "../types/quotation.types";

export function EditQuotationPage() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const quotationQuery = useQuotation(id ?? "");

  const updateQuotation = useUpdateQuotation();

  const initialValues = useMemo<
    QuotationFormValues | undefined
  >(() => {
    const quotation = quotationQuery.data;

    if (!quotation) {
      return undefined;
    }

    return {
      customerId: quotation.customerId,
      opportunityId: quotation.opportunityId ?? "",
      quoteDate: quotation.quoteDate,
      validUntil: quotation.validUntil,
      salespersonId: quotation.salespersonId,
      currency: quotation.currency,
      paymentTerms: quotation.paymentTerms ?? "",
      deliveryTerms: quotation.deliveryTerms ?? "",
      lineItems: quotation.lineItems,
      notes: quotation.notes ?? "",
    };
  }, [quotationQuery.data]);

  const handleSubmit = async (
    values: QuotationFormValues,
  ) => {
    if (!id) {
      return;
    }

    await updateQuotation.mutateAsync({
      id,
      values,
    });

    navigate(`/crm/quotations/${id}`);
  };

  const handleCancel = () => {
    if (id) {
      navigate(`/crm/quotations/${id}`);
      return;
    }

    navigate("/crm/quotations");
  };

  if (!id) {
    return (
      <main className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800"
          >
            <strong className="block font-semibold">
              Quotation not found
            </strong>

            <p className="mt-1 text-red-700">
              A quotation ID is required to edit this
              quotation.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (quotationQuery.isLoading) {
    return (
      <main className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border border-slate-200 bg-white px-5 py-8 shadow-sm">
            <p className="text-sm text-slate-500">
              Loading quotation...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (
    quotationQuery.isError ||
    !quotationQuery.data
  ) {
    return (
      <main className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800"
          >
            <strong className="block font-semibold">
              Unable to load quotation
            </strong>

            <p className="mt-1 text-red-700">
              The quotation could not be loaded. Please
              try again.
            </p>
          </div>

          <div className="mt-4 flex justify-start">
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
              onClick={() =>
                navigate("/crm/quotations")
              }
            >
              Back to quotations
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
              Sales / Quotations
            </p>

            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Edit quotation{" "}
              <span className="font-medium text-slate-500">
                {quotationQuery.data.quoteNumber}
              </span>
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
              Update quotation details, commercial terms,
              and line items.
            </p>
          </div>
        </header>

        {initialValues && (
          <QuotationForm
            initialValues={initialValues}
            submitLabel="Save changes"
            isSubmitting={updateQuotation.isPending}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </div>
    </main>
  );
}
