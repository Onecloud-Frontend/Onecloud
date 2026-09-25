import { useNavigate } from "react-router-dom";

import "../styles/quotation-form.css";

import { QuotationForm } from "../forms/QuotationForm";

import { useCreateQuotation } from "../hooks/useCreateQuotation";

import type { QuotationFormValues } from "../types/quotation.types";

export function CreateQuotationPage() {
  const navigate = useNavigate();

  const createQuotation =
    useCreateQuotation();

  const handleSubmit = async (
    values: QuotationFormValues,
  ) => {
    const quotation =
      await createQuotation.mutateAsync(
        values,
      );

    navigate(
      `/crm/quotations/${quotation.id}`,
    );
  };

  const handleCancel = () => {
    navigate("/crm/quotations");
  };

  return (
    <main className="quotation-form-page">
      <header className="quotation-form-header">
        <div>
          <p className="page-eyebrow">
            Sales / Quotations
          </p>

          <h1>
            Create quotation
          </h1>

          <p className="page-description">
            Prepare a quotation for a
            customer and submit it for
            review.
          </p>
        </div>
      </header>

      <QuotationForm
        submitLabel="Create quotation"
        isSubmitting={
          createQuotation.isPending
        }
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </main>
  );
}