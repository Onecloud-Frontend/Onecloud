import React, { useEffect, useState } from "react";

type QuoteStatus = "Draft" | "Sent" | "Accepted" | "Rejected" | "Expired";
type ApprovalStatus = "Not Submitted" | "Pending" | "Approved" | "Rejected";

interface Quote {
  quoteId: string;
  quoteNumber: string;
  quoteDate: string;
  validUntil: string;
  customer: string;
  opportunity: string;
  subtotal: number;
  discount: number;
  tax: number;
  grandTotal: number;
  currency: string;
  quoteStatus: QuoteStatus;
  approvalStatus: ApprovalStatus;
}

async function fetchQuotations(): Promise<Quote[]> {
  return [
    {
      quoteId: "q1",
      quoteNumber: "QUO-1190",
      quoteDate: "2026-09-18",
      validUntil: "2026-10-18",
      customer: "Meridian Logistics Pvt Ltd",
      opportunity: "Q4 Fleet Maintenance",
      subtotal: 80000,
      discount: 2000,
      tax: 6500,
      grandTotal: 84500,
      currency: "INR",
      quoteStatus: "Sent",
      approvalStatus: "Pending",
    },
    {
      quoteId: "q2",
      quoteNumber: "QUO-1185",
      quoteDate: "2026-09-12",
      validUntil: "2026-10-12",
      customer: "Meridian Logistics Pvt Ltd",
      opportunity: "Warehouse Racking Upgrade",
      subtotal: 140000,
      discount: 5000,
      tax: 17000,
      grandTotal: 152000,
      currency: "INR",
      quoteStatus: "Accepted",
      approvalStatus: "Approved",
    },
    {
      quoteId: "q3",
      quoteNumber: "QUO-1179",
      quoteDate: "2026-09-08",
      validUntil: "2026-09-30",
      customer: "Meridian Logistics Pvt Ltd",
      opportunity: "Annual Software License",
      subtotal: 37000,
      discount: 0,
      tax: 2900,
      grandTotal: 39900,
      currency: "INR",
      quoteStatus: "Draft",
      approvalStatus: "Not Submitted",
    },
  ];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const currency = (value: number, code: string) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: code, maximumFractionDigits: 0 }).format(value);

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const statusStyles: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-600 border-gray-200",
  Sent: "bg-blue-50 text-blue-700 border-blue-200",
  Accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
  Expired: "bg-gray-100 text-gray-500 border-gray-200",
  "Not Submitted": "bg-gray-100 text-gray-600 border-gray-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
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

const CustomerQuotationsPage: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchQuotations()
      .then((result) => {
        if (isMounted) setQuotes(result);
      })
      .catch(() => {
        if (isMounted) setError("Could not load quotations. Please try again.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleViewQuote = (quoteId: string) => {
    console.log("View quote", quoteId);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-400">Loading quotations…</p>
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
        <h1 className="text-xl font-semibold text-gray-900">Quotations</h1>
        <p className="text-sm text-gray-500">{quotes.length} total</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-100 text-sm">
          <thead className="bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">Quote Number</th>
              <th className="px-4 py-3">Opportunity</th>
              <th className="px-4 py-3">Quote Date</th>
              <th className="px-4 py-3">Valid Until</th>
              <th className="px-4 py-3 text-right">Subtotal</th>
              <th className="px-4 py-3 text-right">Discount</th>
              <th className="px-4 py-3 text-right">Tax</th>
              <th className="px-4 py-3 text-right">Grand Total</th>
              <th className="px-4 py-3">Quote Status</th>
              <th className="px-4 py-3">Approval Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {quotes.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-4 py-8 text-center text-gray-400">
                  No quotations found.
                </td>
              </tr>
            ) : (
              quotes.map((q) => (
                <tr key={q.quoteId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{q.quoteNumber}</td>
                  <td className="px-4 py-3 text-gray-600">{q.opportunity}</td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(q.quoteDate)}</td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(q.validUntil)}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{currency(q.subtotal, q.currency)}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{currency(q.discount, q.currency)}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{currency(q.tax, q.currency)}</td>
                  <td className="px-4 py-3 text-right font-medium text-gray-800">
                    {currency(q.grandTotal, q.currency)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={q.quoteStatus} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={q.approvalStatus} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleViewQuote(q.quoteId)}
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

export {CustomerQuotationsPage}
