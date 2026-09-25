import { useMemo } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import "../styles/quotation-form.css";

import { QuotationForm } from "../forms/QuotationForm";

import { useQuotation } from "../hooks/useQuotation";

import { useUpdateQuotation } from "../hooks/useUpdateQuotation";

import type {
  QuotationFormValues,
} from "../types/quotation.types";

export function EditQuotationPage() {
  const { id } =
    useParams<{ id: string }>();

  const navigate = useNavigate();

  const quotationQuery =
    useQuotation(id ?? "");

  const updateQuotation =
    useUpdateQuotation();

  const initialValues =
    useMemo<
      QuotationFormValues | undefined
    >(() => {
      const quotation =
        quotationQuery.data;

      if (!quotation) {
        return undefined;
      }

      return {
        customerId:
          quotation.customerId,

        opportunityId:
          quotation.opportunityId ?? "",

        quoteDate:
          quotation.quoteDate,

        validUntil:
          quotation.validUntil,

        salespersonId:
          quotation.salespersonId,

        currency:
          quotation.currency,

        paymentTerms:
          quotation.paymentTerms ?? "",

        deliveryTerms:
          quotation.deliveryTerms ?? "",

        lineItems:
          quotation.lineItems,

        notes:
          quotation.notes ?? "",
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

    navigate(
      `/crm/quotations/${id}`,
    );
  };

  const handleCancel = () => {
    if (id) {
      navigate(
        `/crm/quotations/${id}`,
      );

      return;
    }

    navigate("/crm/quotations");
  };

  if (!id) {
    return (
      <main className="quotation-form-page">
        <div className="form-alert form-alert-error">
          <strong>
            Quotation not found
          </strong>

          <p>
            A quotation ID is required
            to edit this quotation.
          </p>
        </div>
      </main>
    );
  }

  if (quotationQuery.isLoading) {
    return (
      <main className="quotation-form-page">
        <div className="form-section">
          <p>
            Loading quotation...
          </p>
        </div>
      </main>
    );
  }

  if (
    quotationQuery.isError ||
    !quotationQuery.data
  ) {
    return (
      <main className="quotation-form-page">
        <div className="form-alert form-alert-error">
          <strong>
            Unable to load quotation
          </strong>

          <p>
            The quotation could not be
            loaded. Please try again.
          </p>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              navigate(
                "/crm/quotations",
              )
            }
          >
            Back to quotations
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="quotation-form-page">
      <header className="quotation-form-header">
        <div>
          <p className="page-eyebrow">
            Sales / Quotations
          </p>

          <h1>
            Edit quotation{" "}
            {quotationQuery.data.quoteNumber}
          </h1>

          <p className="page-description">
            Update quotation details,
            commercial terms, and line
            items.
          </p>
        </div>
      </header>

      {initialValues && (
        <QuotationForm
          initialValues={initialValues}
          submitLabel="Save changes"
          isSubmitting={
            updateQuotation.isPending
          }
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </main>
  );
}
