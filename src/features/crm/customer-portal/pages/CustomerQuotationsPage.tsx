import React from "react";

import { quotations } from "../../shared/data/quotations";

const currency = (value: number, code: string) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: code,
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const statusStyles: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-600 border-gray-200",
  SENT: "bg-blue-50 text-blue-700 border-blue-200",
  ACCEPTED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  REJECTED: "bg-red-50 text-red-700 border-red-200",
  EXPIRED: "bg-gray-100 text-gray-500 border-gray-200",
  PENDING_APPROVAL: "bg-amber-50 text-amber-700 border-amber-200",
  APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const statusLabels: Record<string, string> = {
  DRAFT: "Draft",
  SENT: "Sent",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  EXPIRED: "Expired",
  PENDING_APPROVAL: "Pending Approval",
  APPROVED: "Approved",
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
      statusStyles[status] ??
      "bg-gray-100 text-gray-600 border-gray-200"
    }`}
  >
    {statusLabels[status] ?? status}
  </span>
);

const CustomerQuotationsPage: React.FC = () => {
  const handleViewQuote = (quoteId: string) => {
    console.log("View quote", quoteId);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">
          Quotations
        </h1>

        <p className="text-sm text-gray-500">
          {quotations.length} total
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-100 text-sm">
          <thead className="bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">Quote Number</th>
              <th className="px-4 py-3">Customer ID</th>
              <th className="px-4 py-3">Opportunity ID</th>
              <th className="px-4 py-3">Quote Date</th>
              <th className="px-4 py-3">Valid Until</th>
              <th className="px-4 py-3 text-right">Subtotal</th>
              <th className="px-4 py-3 text-right">Discount</th>
              <th className="px-4 py-3 text-right">Tax</th>
              <th className="px-4 py-3 text-right">Grand Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {quotations.length === 0 ? (
              <tr>
                <td
                  colSpan={11}
                  className="px-4 py-8 text-center text-gray-400"
                >
                  No quotations found.
                </td>
              </tr>
            ) : (
              quotations.map((quotation) => (
                <tr
                  key={quotation.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {quotation.quotationNumber}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {quotation.customerId}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {quotation.opportunityId}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {formatDate(quotation.quotationDate)}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {formatDate(quotation.validUntil)}
                  </td>

                  <td className="px-4 py-3 text-right text-gray-600">
                    {currency(
                      quotation.subtotal,
                      quotation.currency,
                    )}
                  </td>

                  <td className="px-4 py-3 text-right text-gray-600">
                    {currency(
                      quotation.discountAmount,
                      quotation.currency,
                    )}
                  </td>

                  <td className="px-4 py-3 text-right text-gray-600">
                    {currency(
                      quotation.taxAmount,
                      quotation.currency,
                    )}
                  </td>

                  <td className="px-4 py-3 text-right font-medium text-gray-800">
                    {currency(
                      quotation.totalAmount,
                      quotation.currency,
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={quotation.status} />
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() =>
                        handleViewQuote(quotation.id)
                      }
                      className="rounded-md border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                    >
                      View quote
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { CustomerQuotationsPage };