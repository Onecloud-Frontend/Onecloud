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

  return (
    <main className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
              Sales / Quotations
            </p>

            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Create quotation
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
              Prepare a quotation for a customer and submit it for
              review.
            </p>
          </div>
        </header>

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
