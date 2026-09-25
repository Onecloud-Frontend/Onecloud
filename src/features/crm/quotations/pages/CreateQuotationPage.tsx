import { useNavigate } from "react-router-dom";

import { QuotationForm } from "../forms/QuotationForm";
import { useCreateQuotation } from "../hooks/useCreateQuotation";
import type { QuotationFormValues } from "../types/quotation.types";

export function CreateQuotationPage() {
  const navigate = useNavigate();
  const createQuotation = useCreateQuotation();

  const handleSubmit = async (
    values: QuotationFormValues,
  ) => {
    const quotation =
      await createQuotation.mutateAsync(values);

    navigate(`/crm/quotations/${quotation.id}`);
  };

  const handleCancel = () => {
    navigate("/crm/quotations");
  };

  const handleBackToQuotations = () => {
    navigate("/crm/quotations");
  };

  return (
    <main className="min-h-full bg-slate-50">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-5 lg:px-8 lg:py-6">
        {/* Quotation-level navigation */}
        <button
          type="button"
          onClick={handleBackToQuotations}
          className="mb-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-100"
        >
          <span
            aria-hidden="true"
            className="text-base leading-none"
          >
            ←
          </span>
          Back to Quotations
        </button>

        <div className="mb-6">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
            Sales / Quotations
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Create quotation
          </h1>

          <p className="mt-1.5 text-sm text-slate-500">
            Prepare a quotation for a customer and submit it for review.
          </p>
        </div>

        <QuotationForm
          submitLabel="Create quotation"
          isSubmitting={createQuotation.isPending}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </main>
  );
}
