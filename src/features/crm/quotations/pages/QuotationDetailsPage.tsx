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

function formatDate(date?: string): string {
  if (!date) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatDateTime(date?: string): string {
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

function getStatusClasses(status: QuotationStatus) {
  switch (status) {
    case "draft":
      return "bg-slate-100 text-slate-700 ring-slate-200";

    case "sent":
      return "bg-blue-50 text-blue-700 ring-blue-200";

    case "accepted":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";

    case "rejected":
      return "bg-red-50 text-red-700 ring-red-200";

    case "expired":
      return "bg-amber-50 text-amber-700 ring-amber-200";

    default:
      return "bg-slate-100 text-slate-700 ring-slate-200";
  }
}

function getApprovalClasses(
  approvalStatus: ApprovalStatus,
) {
  switch (approvalStatus) {
    case "not_submitted":
      return "bg-slate-100 text-slate-600 ring-slate-200";

    case "pending":
      return "bg-amber-50 text-amber-700 ring-amber-200";

    case "approved":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";

    case "rejected":
      return "bg-red-50 text-red-700 ring-red-200";

    default:
      return "bg-slate-100 text-slate-600 ring-slate-200";
  }
}

export function QuotationDetailsPage() {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  const quotationQuery = useQuotation(id ?? "");

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
        await submitApproval.mutateAsync(id);

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
      await reviseQuotation.mutateAsync(id);

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
      <main className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex min-h-[500px] flex-col items-center justify-center">
          <div
            className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-700"
            aria-hidden="true"
          />

          <p className="text-sm font-medium text-slate-600">
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
      <main className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-sm font-semibold text-red-600">
              !
            </div>

            <h2 className="text-base font-semibold text-slate-900">
              Quotation not found
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              We couldn't load the requested
              quotation.
            </p>

            <button
              type="button"
              className="mt-5 inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
              onClick={handleBack}
            >
              Back to quotations
            </button>
          </div>
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
    <main className="min-h-full bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <header className="mb-5">
          <button
            type="button"
            onClick={handleBack}
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
          >
            <span aria-hidden="true">←</span>
            Back to quotations
          </button>

          <div className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="mb-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Quotation
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                    {quotation.quoteNumber}
                  </h1>

                  <p className="mt-1 text-xs text-slate-400">
                    ID: {quotation.id}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${getStatusClasses(
                      quotation.status,
                    )}`}
                  >
                    {statusLabels[
                      quotation.status
                    ]}
                  </span>

                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${getApprovalClasses(
                      quotation.approvalStatus,
                    )}`}
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

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleEdit}
                disabled={isActionPending}
                className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
              >
                Edit
              </button>

              {canSubmitApproval && (
                <button
                  type="button"
                  onClick={
                    handleSubmitApproval
                  }
                  disabled={
                    submitApproval.isPending
                  }
                  className="inline-flex h-9 items-center justify-center rounded-lg bg-slate-900 px-3.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                  {submitApproval.isPending
                    ? "Submitting..."
                    : "Submit approval"}
                </button>
              )}

              {canRevise && (
                <button
                  type="button"
                  onClick={handleRevise}
                  disabled={
                    reviseQuotation.isPending
                  }
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
                >
                  {reviseQuotation.isPending
                    ? "Revising..."
                    : "Revise"}
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Action Feedback */}
        {(actionMessage ||
          actionError) && (
          <div
            className={`mb-5 flex items-center gap-3 rounded-lg border px-4 py-3 text-sm ${
              actionError
                ? "border-red-200 bg-red-50 text-red-800"
                : "border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}
            role={
              actionError
                ? "alert"
                : "status"
            }
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                actionError
                  ? "bg-red-100 text-red-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
              aria-hidden="true"
            >
              {actionError ? "!" : "✓"}
            </span>

            <span className="min-w-0 flex-1">
              {actionError ?? actionMessage}
            </span>

            <button
              type="button"
              className="shrink-0 rounded-md p-1 text-current/60 transition-colors hover:bg-black/5 hover:text-current focus:outline-none focus:ring-2 focus:ring-current/20"
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
        <section className="mb-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Quotation overview
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Basic quotation and sales
              information.
            </p>
          </div>

          <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3 xl:grid-cols-6">
            {[
              {
                label: "Quote date",
                value: formatDate(
                  quotation.quoteDate,
                ),
              },
              {
                label: "Valid until",
                value: formatDate(
                  quotation.validUntil,
                ),
              },
              {
                label: "Salesperson",
                value: quotation.salespersonName,
              },
              {
                label: "Currency",
                value: quotation.currency,
              },
              {
                label: "Payment terms",
                value:
                  quotation.paymentTerms ??
                  "—",
              },
              {
                label: "Delivery terms",
                value:
                  quotation.deliveryTerms ??
                  "—",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="px-5 py-4 sm:px-4"
              >
                <span className="block text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  {item.label}
                </span>

                <span className="mt-1.5 block text-sm font-medium text-slate-800">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Customer */}
        <section className="mb-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Customer
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Customer and opportunity
              information.
            </p>
          </div>

          <div className="grid grid-cols-1 divide-y divide-slate-100 md:grid-cols-3 md:divide-x md:divide-y-0">
            <div className="px-5 py-5 sm:px-6">
              <span className="block text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Customer
              </span>

              <strong className="mt-1.5 block text-sm font-semibold text-slate-900">
                {quotation.customerName}
              </strong>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                {quotation.customerAddress ??
                  "Address not available"}
              </p>
            </div>

            <div className="px-5 py-5 sm:px-6">
              <span className="block text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Contact
              </span>

              <strong className="mt-1.5 block text-sm font-semibold text-slate-900">
                {quotation.contactName ??
                  "—"}
              </strong>
            </div>

            <div className="px-5 py-5 sm:px-6">
              <span className="block text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Opportunity
              </span>

              <strong className="mt-1.5 block text-sm font-semibold text-slate-900">
                {quotation.opportunityName ??
                  "—"}
              </strong>

              {quotation.opportunityId && (
                <p className="mt-1 text-xs text-slate-400">
                  {quotation.opportunityId}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Line Items */}
        <section className="mb-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Line items
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Products and services included
              in this quotation.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Product / Service
                  </th>

                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Description
                  </th>

                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Quantity
                  </th>

                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Unit price
                  </th>

                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Discount
                  </th>

                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Tax
                  </th>

                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Subtotal
                  </th>

                  <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {quotation.lineItems.map(
                  (
                    item: Quotation["lineItems"][number],
                  ) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/50"
                    >
                      <td className="px-5 py-4 align-middle">
                        <strong className="text-sm font-medium text-slate-800">
                          {item.productName}
                        </strong>
                      </td>

                      <td className="max-w-[240px] px-4 py-4 align-middle">
                        <span className="block truncate text-sm text-slate-500">
                          {item.description ??
                            "—"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right align-middle text-sm text-slate-600">
                        {item.quantity}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right align-middle text-sm text-slate-600">
                        {formatCurrency(
                          item.unitPrice,
                          quotation.currency,
                        )}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right align-middle text-sm text-slate-600">
                        {item.discountPercent}%
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right align-middle text-sm text-slate-600">
                        {item.taxRate}%
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right align-middle text-sm text-slate-600">
                        {formatCurrency(
                          item.subtotal,
                          quotation.currency,
                        )}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-right align-middle text-sm font-semibold text-slate-900">
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
        <section className="mb-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Pricing
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Quotation pricing summary.
            </p>
          </div>

          <div className="ml-auto w-full max-w-md px-5 py-5 sm:px-6">
            <div className="flex items-center justify-between py-2 text-sm">
              <span className="text-slate-500">
                Subtotal
              </span>

              <strong className="font-medium text-slate-800">
                {formatCurrency(
                  quotation.subtotal,
                  quotation.currency,
                )}
              </strong>
            </div>

            <div className="flex items-center justify-between py-2 text-sm">
              <span className="text-slate-500">
                Discount
              </span>

              <strong className="font-medium text-slate-800">
                -
                {formatCurrency(
                  quotation.discountAmount,
                  quotation.currency,
                )}
              </strong>
            </div>

            <div className="flex items-center justify-between py-2 text-sm">
              <span className="text-slate-500">
                Tax
              </span>

              <strong className="font-medium text-slate-800">
                {formatCurrency(
                  quotation.taxAmount,
                  quotation.currency,
                )}
              </strong>
            </div>

            <div className="my-3 border-t border-slate-200" />

            <div className="flex items-center justify-between pt-1">
              <span className="text-sm font-semibold text-slate-900">
                Grand total
              </span>

              <strong className="text-lg font-semibold text-slate-900">
                {formatCurrency(
                  quotation.grandTotal,
                  quotation.currency,
                )}
              </strong>
            </div>
          </div>
        </section>

        {/* Approval History */}
        <section className="mb-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Approval history
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Approval actions and status
              changes.
            </p>
          </div>

          {quotation.approvalHistory &&
          quotation.approvalHistory.length >
            0 ? (
            <div className="px-5 py-5 sm:px-6">
              <div className="relative ml-2 border-l border-slate-200 pl-6">
                {quotation.approvalHistory.map(
                  (
                    history: NonNullable<
                      Quotation["approvalHistory"]
                    >[number],
                  ) => (
                    <div
                      key={history.id}
                      className="relative pb-6 last:pb-0"
                    >
                      <div className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-slate-400 ring-1 ring-slate-300" />

                      <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-4">
                        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                          <strong className="text-sm font-semibold text-slate-800">
                            {
                              approvalLabels[
                                history.status
                              ]
                            }
                          </strong>

                          <span className="text-xs text-slate-400">
                            {formatDateTime(
                              history.createdAt,
                            )}
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-5 text-slate-600">
                          {history.comment ??
                            "No comment provided."}
                        </p>

                        <span className="mt-2 block text-xs text-slate-400">
                          By {history.actionBy}
                        </span>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          ) : (
            <div className="px-5 py-8 text-center sm:px-6">
              <p className="text-sm text-slate-500">
                No approval activity yet.
              </p>
            </div>
          )}
        </section>

        {/* Notes */}
        <section className="mb-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Notes
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Additional information about
              this quotation.
            </p>
          </div>

          <div className="px-5 py-5 sm:px-6">
            {quotation.notes ? (
              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
                {quotation.notes}
              </p>
            ) : (
              <p className="text-sm text-slate-400">
                No notes added to this quotation.
              </p>
            )}
          </div>
        </section>

        {/* Metadata */}
        <footer className="flex flex-col gap-1 border-t border-slate-200 py-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
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
