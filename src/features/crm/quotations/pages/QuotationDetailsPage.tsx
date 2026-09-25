import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useQuotation } from "../hooks/useQuotation";
import { useSubmitQuotationApproval } from "../hooks/useSubmitQuotationApproval";
import { useReviseQuotation } from "../hooks/useReviseQuotation";

import type {
  ApprovalStatus,
  Quotation,
  QuotationStatus,
} from "../types/quotation.types";

import "../styles/quotation-details.css";

const statusLabels: Record<
  QuotationStatus,
  string
> = {
  draft: "Draft",
  sent: "Sent",
  accepted: "Accepted",
  rejected: "Rejected",
  expired: "Expired",
};

const approvalLabels: Record<
  ApprovalStatus,
  string
> = {
  not_submitted: "Not submitted",
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

function formatCurrency(
  amount: number,
  currency: Quotation["currency"],
): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(
  date?: string,
): string {
  if (!date) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatDateTime(
  date?: string,
): string {
  if (!date) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function QuotationDetailsPage() {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  const quotationQuery =
    useQuotation(id ?? "");

  const submitApproval =
    useSubmitQuotationApproval();

  const reviseQuotation =
    useReviseQuotation();

  const [actionMessage, setActionMessage] =
    useState<string | null>(null);

  const [actionError, setActionError] =
    useState<string | null>(null);

  const quotation =
    quotationQuery.data as
      | Quotation
      | undefined;

  const handleBack = () => {
    navigate("/crm/quotations");
  };

  const handleEdit = () => {
    if (!quotation) {
      return;
    }

    navigate(
      `/crm/quotations/${quotation.id}/edit`,
    );
  };

  const handleSubmitApproval =
    async () => {
      if (!id) {
        return;
      }

      setActionMessage(null);
      setActionError(null);

      try {
        await submitApproval.mutateAsync(
          id,
        );

        setActionMessage(
          "Quotation submitted for approval.",
        );
      } catch (error) {
        setActionError(
          error instanceof Error
            ? error.message
            : "Unable to submit quotation for approval. Please try again.",
        );
      }
    };

  const handleRevise = async () => {
    if (!id) {
      return;
    }

    setActionMessage(null);
    setActionError(null);

    try {
      await reviseQuotation.mutateAsync(
        id,
      );

      setActionMessage(
        "Quotation revised successfully and returned to draft.",
      );
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Unable to revise quotation. Please try again.",
      );
    }
  };

  if (quotationQuery.isLoading) {
    return (
      <main className="quotation-details-page">
        <div className="quotation-details-state">
          <div
            className="loading-spinner"
            aria-hidden="true"
          />

          <p>
            Loading quotation...
          </p>
        </div>
      </main>
    );
  }

  if (
    quotationQuery.isError ||
    !quotation
  ) {
    return (
      <main className="quotation-details-page">
        <div className="quotation-details-state quotation-details-error">
          <h2>
            Quotation not found
          </h2>

          <p>
            We couldn't load the requested
            quotation.
          </p>

          <button
            type="button"
            className="details-btn details-btn-secondary"
            onClick={handleBack}
          >
            Back to quotations
          </button>
        </div>
      </main>
    );
  }

  const canSubmitApproval =
    quotation.status === "draft" &&
    quotation.approvalStatus ===
      "not_submitted";

  const canRevise =
    quotation.status === "rejected" ||
    quotation.status === "expired";

  const isActionPending =
    submitApproval.isPending ||
    reviseQuotation.isPending;

  return (
    <main className="quotation-details-page">
      <div className="quotation-details-container">
        {/* Header */}
        <header className="quotation-details-header">
          <div className="quotation-details-heading">
            <button
              type="button"
              className="back-button"
              onClick={handleBack}
            >
              ← Back to quotations
            </button>

            <div className="quotation-title-row">
              <div>
                <p className="page-eyebrow">
                  Quotation
                </p>

                <h1>
                  {quotation.quoteNumber}
                </h1>

                <p className="quotation-details-id">
                  ID: {quotation.id}
                </p>
              </div>

              <div className="quotation-header-statuses">
                <span
                  className={`quotation-status quotation-status-${quotation.status}`}
                >
                  {
                    statusLabels[
                      quotation.status
                    ]
                  }
                </span>

                <span
                  className={`quotation-approval quotation-approval-${quotation.approvalStatus}`}
                >
                  {
                    approvalLabels[
                      quotation.approvalStatus
                    ]
                  }
                </span>
              </div>
            </div>
          </div>

          <div className="quotation-details-actions">
            <button
              type="button"
              className="details-btn details-btn-secondary"
              onClick={handleEdit}
              disabled={isActionPending}
            >
              Edit
            </button>

            {canSubmitApproval && (
              <button
                type="button"
                className="details-btn details-btn-primary"
                onClick={
                  handleSubmitApproval
                }
                disabled={
                  submitApproval.isPending
                }
              >
                {submitApproval.isPending
                  ? "Submitting..."
                  : "Submit approval"}
              </button>
            )}

            {canRevise && (
              <button
                type="button"
                className="details-btn details-btn-secondary"
                onClick={handleRevise}
                disabled={
                  reviseQuotation.isPending
                }
              >
                {reviseQuotation.isPending
                  ? "Revising..."
                  : "Revise"}
              </button>
            )}
          </div>
        </header>

        {/* Action Feedback */}
        {(actionMessage ||
          actionError) && (
          <div
            className={`quotation-action-feedback ${
              actionError
                ? "quotation-action-feedback-error"
                : "quotation-action-feedback-success"
            }`}
            role={
              actionError
                ? "alert"
                : "status"
            }
          >
            <span
              className="quotation-action-feedback-icon"
              aria-hidden="true"
            >
              {actionError
                ? "!"
                : "✓"}
            </span>

            <span>
              {actionError ??
                actionMessage}
            </span>

            <button
              type="button"
              className="quotation-action-feedback-close"
              onClick={() => {
                setActionMessage(null);
                setActionError(null);
              }}
              aria-label="Dismiss message"
            >
              ×
            </button>
          </div>
        )}

        {/* Quotation Overview */}
        <section className="quotation-details-section">
          <div className="quotation-section-header">
            <div>
              <h2>
                Quotation overview
              </h2>

              <p>
                Basic quotation and sales
                information.
              </p>
            </div>
          </div>

          <div className="quotation-info-grid">
            <div className="quotation-info-item">
              <span className="quotation-info-label">
                Quote date
              </span>

              <span className="quotation-info-value">
                {formatDate(
                  quotation.quoteDate,
                )}
              </span>
            </div>

            <div className="quotation-info-item">
              <span className="quotation-info-label">
                Valid until
              </span>

              <span className="quotation-info-value">
                {formatDate(
                  quotation.validUntil,
                )}
              </span>
            </div>

            <div className="quotation-info-item">
              <span className="quotation-info-label">
                Salesperson
              </span>

              <span className="quotation-info-value">
                {quotation.salespersonName}
              </span>
            </div>

            <div className="quotation-info-item">
              <span className="quotation-info-label">
                Currency
              </span>

              <span className="quotation-info-value">
                {quotation.currency}
              </span>
            </div>

            <div className="quotation-info-item">
              <span className="quotation-info-label">
                Payment terms
              </span>

              <span className="quotation-info-value">
                {quotation.paymentTerms ??
                  "—"}
              </span>
            </div>

            <div className="quotation-info-item">
              <span className="quotation-info-label">
                Delivery terms
              </span>

              <span className="quotation-info-value">
                {quotation.deliveryTerms ??
                  "—"}
              </span>
            </div>
          </div>
        </section>

        {/* Customer */}
        <section className="quotation-details-section">
          <div className="quotation-section-header">
            <div>
              <h2>
                Customer
              </h2>

              <p>
                Customer and opportunity
                information.
              </p>
            </div>
          </div>

          <div className="quotation-customer-grid">
            <div className="quotation-customer-card">
              <span className="quotation-info-label">
                Customer
              </span>

              <strong>
                {quotation.customerName}
              </strong>

              <p>
                {quotation.customerAddress ??
                  "Address not available"}
              </p>
            </div>

            <div className="quotation-customer-card">
              <span className="quotation-info-label">
                Contact
              </span>

              <strong>
                {quotation.contactName ??
                  "—"}
              </strong>
            </div>

            <div className="quotation-customer-card">
              <span className="quotation-info-label">
                Opportunity
              </span>

              <strong>
                {quotation.opportunityName ??
                  "—"}
              </strong>

              {quotation.opportunityId && (
                <p>
                  {quotation.opportunityId}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Line Items */}
        <section className="quotation-details-section">
          <div className="quotation-section-header">
            <div>
              <h2>
                Line items
              </h2>

              <p>
                Products and services included
                in this quotation.
              </p>
            </div>
          </div>

          <div className="quotation-line-items-wrapper">
            <table className="quotation-line-items-table">
              <thead>
                <tr>
                  <th>
                    Product / Service
                  </th>

                  <th>
                    Description
                  </th>

                  <th className="numeric-cell">
                    Quantity
                  </th>

                  <th className="numeric-cell">
                    Unit price
                  </th>

                  <th className="numeric-cell">
                    Discount
                  </th>

                  <th className="numeric-cell">
                    Tax
                  </th>

                  <th className="numeric-cell">
                    Subtotal
                  </th>

                  <th className="numeric-cell">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {quotation.lineItems.map(
                  (
                    item: Quotation["lineItems"][number],
                  ) => (
                    <tr key={item.id}>
                      <td>
                        <strong>
                          {item.productName}
                        </strong>
                      </td>

                      <td>
                        {item.description ??
                          "—"}
                      </td>

                      <td className="numeric-cell">
                        {item.quantity}
                      </td>

                      <td className="numeric-cell">
                        {formatCurrency(
                          item.unitPrice,
                          quotation.currency,
                        )}
                      </td>

                      <td className="numeric-cell">
                        {item.discountPercent}%
                      </td>

                      <td className="numeric-cell">
                        {item.taxRate}%
                      </td>

                      <td className="numeric-cell">
                        {formatCurrency(
                          item.subtotal,
                          quotation.currency,
                        )}
                      </td>

                      <td className="numeric-cell quotation-line-total">
                        {formatCurrency(
                          item.total,
                          quotation.currency,
                        )}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing */}
        <section className="quotation-details-section quotation-pricing-section">
          <div className="quotation-section-header">
            <div>
              <h2>
                Pricing
              </h2>

              <p>
                Quotation pricing summary.
              </p>
            </div>
          </div>

          <div className="quotation-pricing-summary">
            <div className="quotation-pricing-row">
              <span>
                Subtotal
              </span>

              <strong>
                {formatCurrency(
                  quotation.subtotal,
                  quotation.currency,
                )}
              </strong>
            </div>

            <div className="quotation-pricing-row">
              <span>
                Discount
              </span>

              <strong>
                -
                {formatCurrency(
                  quotation.discountAmount,
                  quotation.currency,
                )}
              </strong>
            </div>

            <div className="quotation-pricing-row">
              <span>
                Tax
              </span>

              <strong>
                {formatCurrency(
                  quotation.taxAmount,
                  quotation.currency,
                )}
              </strong>
            </div>

            <div className="quotation-pricing-divider" />

            <div className="quotation-pricing-row quotation-grand-total">
              <span>
                Grand total
              </span>

              <strong>
                {formatCurrency(
                  quotation.grandTotal,
                  quotation.currency,
                )}
              </strong>
            </div>
          </div>
        </section>

        {/* Approval History */}
        <section className="quotation-details-section">
          <div className="quotation-section-header">
            <div>
              <h2>
                Approval history
              </h2>

              <p>
                Approval actions and status
                changes.
              </p>
            </div>
          </div>

          {quotation.approvalHistory &&
          quotation.approvalHistory.length >
            0 ? (
            <div className="quotation-approval-timeline">
              {quotation.approvalHistory.map(
                (
                  history: NonNullable<
                    Quotation["approvalHistory"]
                  >[number],
                ) => (
                  <div
                    key={history.id}
                    className="quotation-timeline-item"
                  >
                    <div className="quotation-timeline-marker" />

                    <div className="quotation-timeline-content">
                      <div className="quotation-timeline-header">
                        <strong>
                          {
                            approvalLabels[
                              history.status
                            ]
                          }
                        </strong>

                        <span>
                          {formatDateTime(
                            history.createdAt,
                          )}
                        </span>
                      </div>

                      <p>
                        {history.comment ??
                          "No comment provided."}
                      </p>

                      <span className="quotation-timeline-user">
                        By{" "}
                        {history.actionBy}
                      </span>
                    </div>
                  </div>
                ),
              )}
            </div>
          ) : (
            <div className="quotation-empty-history">
              <p>
                No approval activity yet.
              </p>
            </div>
          )}
        </section>

        {/* Notes */}
        <section className="quotation-details-section">
          <div className="quotation-section-header">
            <div>
              <h2>
                Notes
              </h2>

              <p>
                Additional information about
                this quotation.
              </p>
            </div>
          </div>

          <div className="quotation-notes">
            {quotation.notes ? (
              <p>
                {quotation.notes}
              </p>
            ) : (
              <p className="quotation-muted-text">
                No notes added to this
                quotation.
              </p>
            )}
          </div>
        </section>

        {/* Metadata */}
        <footer className="quotation-details-footer">
          <span>
            Created{" "}
            {formatDateTime(
              quotation.createdAt,
            )}
          </span>

          <span>
            Last updated{" "}
            {formatDateTime(
              quotation.updatedAt,
            )}
          </span>
        </footer>
      </div>
    </main>
  );
}