import React from "react";

import { invoices } from "../../shared/data";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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
  PAID: "bg-emerald-50 text-emerald-700 border-emerald-200",
  UNPAID: "bg-amber-50 text-amber-700 border-amber-200",
  OVERDUE: "bg-red-50 text-red-700 border-red-200",
  PARTIALLY_PAID: "bg-blue-50 text-blue-700 border-blue-200",
};

const statusLabels: Record<string, string> = {
  PAID: "Paid",
  UNPAID: "Unpaid",
  OVERDUE: "Overdue",
  PARTIALLY_PAID: "Partially Paid",
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

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const CustomerInvoicesPage: React.FC = () => {
  const handleViewInvoice = (invoiceId: string) => {
    // TODO: navigate to invoice detail
    console.log("View invoice", invoiceId);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">
          Invoices
        </h1>

        <p className="text-sm text-gray-500">
          {invoices.length} total
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-100 text-sm">
          <thead className="bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">Invoice Number</th>
              <th className="px-4 py-3">Order Number</th>
              <th className="px-4 py-3">Invoice Date</th>
              <th className="px-4 py-3">Due Date</th>
              <th className="px-4 py-3 text-right">Subtotal</th>
              <th className="px-4 py-3 text-right">Tax</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3 text-right">Paid</th>
              <th className="px-4 py-3 text-right">Outstanding</th>
              <th className="px-4 py-3">Payment Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {invoices.length === 0 ? (
              <tr>
                <td
                  colSpan={11}
                  className="px-4 py-8 text-center text-gray-400"
                >
                  No invoices found.
                </td>
              </tr>
            ) : (
              invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {invoice.invoiceNumber}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {invoice.orderId}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {formatDate(invoice.invoiceDate)}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {formatDate(invoice.dueDate)}
                  </td>

                  <td className="px-4 py-3 text-right text-gray-600">
                    {currency(invoice.subtotal, invoice.currency)}
                  </td>

                  <td className="px-4 py-3 text-right text-gray-600">
                    {currency(invoice.taxAmount, invoice.currency)}
                  </td>

                  <td className="px-4 py-3 text-right font-medium text-gray-800">
                    {currency(invoice.totalAmount, invoice.currency)}
                  </td>

                  <td className="px-4 py-3 text-right text-gray-600">
                    {currency(invoice.paidAmount, invoice.currency)}
                  </td>

                  <td className="px-4 py-3 text-right text-gray-600">
                    {currency(invoice.balanceAmount, invoice.currency)}
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={invoice.status} />
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleViewInvoice(invoice.id)}
                      className="rounded-md border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                    >
                      View invoice
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

export { CustomerInvoicesPage };