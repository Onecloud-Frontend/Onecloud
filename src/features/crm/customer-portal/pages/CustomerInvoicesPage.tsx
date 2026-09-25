import React, { useEffect, useState } from "react";

type PaymentStatus = "Paid" | "Unpaid" | "Overdue" | "Partially Paid";

interface Invoice {
  invoiceId: string;
  invoiceNumber: string;
  orderNumber: string;
  invoiceDate: string;
  dueDate: string;
  subtotal: number;
  tax: number;
  totalAmount: number;
  paidAmount: number;
  outstandingAmount: number;
  currency: string;
  paymentStatus: PaymentStatus;
  paymentDate: string | null;
}


async function fetchInvoices(): Promise<Invoice[]> {
  return [
    {
      invoiceId: "i1",
      invoiceNumber: "INV-3021",
      orderNumber: "ORD-8842",
      invoiceDate: "2026-09-19",
      dueDate: "2026-09-20",
      subtotal: 21000,
      tax: 1750,
      totalAmount: 22750,
      paidAmount: 22750,
      outstandingAmount: 0,
      currency: "INR",
      paymentStatus: "Paid",
      paymentDate: "2026-09-20",
    },
    {
      invoiceId: "i2",
      invoiceNumber: "INV-3014",
      orderNumber: "ORD-8817",
      invoiceDate: "2026-09-01",
      dueDate: "2026-09-10",
      subtotal: 91000,
      tax: 7500,
      totalAmount: 98500,
      paidAmount: 0,
      outstandingAmount: 98500,
      currency: "INR",
      paymentStatus: "Overdue",
      paymentDate: null,
    },
    {
      invoiceId: "i3",
      invoiceNumber: "INV-3009",
      orderNumber: "ORD-8790",
      invoiceDate: "2026-09-05",
      dueDate: "2026-10-05",
      subtotal: 56800,
      tax: 4450,
      totalAmount: 61250,
      paidAmount: 0,
      outstandingAmount: 61250,
      currency: "INR",
      paymentStatus: "Unpaid",
      paymentDate: null,
    },
  ];
}

const currency = (value: number, code: string) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: code, maximumFractionDigits: 0 }).format(value);

const formatDate = (value: string | null) => {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const statusStyles: Record<string, string> = {
  Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Unpaid: "bg-amber-50 text-amber-700 border-amber-200",
  Overdue: "bg-red-50 text-red-700 border-red-200",
  "Partially Paid": "bg-blue-50 text-blue-700 border-blue-200",
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
      statusStyles[status] ?? "bg-gray-100 text-gray-600 border-gray-200"
    }`}
  >
    {status}
  </span>
);


const CustomerInvoicesPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchInvoices()
      .then((result) => {
        if (isMounted) setInvoices(result);
      })
      .catch(() => {
        if (isMounted) setError("Could not load invoices. Please try again.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleViewInvoice = (invoiceId: string) => {
    console.log("View invoice", invoiceId);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-400">Loading invoices…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Invoices</h1>
        <p className="text-sm text-gray-500">{invoices.length} total</p>
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
              <th className="px-4 py-3">Payment Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoices.length === 0 ? (
              <tr>
                <td colSpan={12} className="px-4 py-8 text-center text-gray-400">
                  No invoices found.
                </td>
              </tr>
            ) : (
              invoices.map((inv) => (
                <tr key={inv.invoiceId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{inv.invoiceNumber}</td>
                  <td className="px-4 py-3 text-gray-600">{inv.orderNumber}</td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(inv.invoiceDate)}</td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(inv.dueDate)}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{currency(inv.subtotal, inv.currency)}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{currency(inv.tax, inv.currency)}</td>
                  <td className="px-4 py-3 text-right font-medium text-gray-800">
                    {currency(inv.totalAmount, inv.currency)}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-600">{currency(inv.paidAmount, inv.currency)}</td>
                  <td className="px-4 py-3 text-right text-gray-600">
                    {currency(inv.outstandingAmount, inv.currency)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={inv.paymentStatus} />
                  </td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(inv.paymentDate)}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleViewInvoice(inv.invoiceId)}
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

export {CustomerInvoicesPage}
