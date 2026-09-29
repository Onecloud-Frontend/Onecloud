import type { Quotation } from "../types/quotation.types";

interface QuotationTableProps {
  quotations: Quotation[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

const statusLabels: Record<Quotation["status"], string> = {
  draft: "Draft",
  sent: "Sent",
  accepted: "Accepted",
  rejected: "Rejected",
  expired: "Expired",
};

const approvalLabels: Record<
  Quotation["approvalStatus"],
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
) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getStatusClasses(
  status: Quotation["status"],
) {
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
  approvalStatus: Quotation["approvalStatus"],
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

export function QuotationTable({
  quotations,
  onView,
  onEdit,
}: QuotationTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[1200px] border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/70">
            <th
              scope="col"
              className="w-[150px] min-w-[150px] whitespace-nowrap px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500"
            >
              Quotation
            </th>

            <th
              scope="col"
              className="whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500"
            >
              Customer
            </th>

            <th
              scope="col"
              className="whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500"
            >
              Opportunity
            </th>

            <th
              scope="col"
              className="whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500"
            >
              Quote date
            </th>

            <th
              scope="col"
              className="whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500"
            >
              Valid until
            </th>

            <th
              scope="col"
              className="whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500"
            >
              Salesperson
            </th>

            <th
              scope="col"
              className="whitespace-nowrap px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500"
            >
              Grand total
            </th>

            <th
              scope="col"
              className="whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500"
            >
              Status
            </th>

            <th
              scope="col"
              className="whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500"
            >
              Approval
            </th>

            <th
              scope="col"
              className="w-[120px] px-4 py-3"
              aria-label="Actions"
            />
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {quotations.map((quotation) => (
            <tr
              key={quotation.id}
              className="group transition-colors hover:bg-slate-50/70"
            >
              {/* Quotation */}
              <td className="w-[150px] min-w-[150px] px-5 py-4 align-middle">
                <div className="flex min-w-0 flex-col">
                  <button
                    type="button"
                    onClick={() => onView(quotation.id)}
                    className="w-fit whitespace-nowrap text-sm font-semibold text-slate-900 underline-offset-4 transition-colors hover:text-slate-700 hover:underline focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-1"
                  >
                    {quotation.quoteNumber}
                  </button>

                  <span
                    className="mt-0.5 max-w-full truncate text-xs text-slate-400"
                    title={quotation.id}
                  >
                    {quotation.id}
                  </span>
                </div>
              </td>

              {/* Customer */}
              <td className="max-w-[220px] px-4 py-4 align-middle">
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-medium text-slate-800">
                    {quotation.customerName}
                  </span>

                  {quotation.contactName && (
                    <span className="mt-0.5 truncate text-xs text-slate-500">
                      {quotation.contactName}
                    </span>
                  )}
                </div>
              </td>

              {/* Opportunity */}
              <td className="max-w-[190px] px-4 py-4 align-middle">
                <span className="block truncate text-sm text-slate-600">
                  {quotation.opportunityName ?? "—"}
                </span>
              </td>

              {/* Quote date */}
              <td className="whitespace-nowrap px-4 py-4 align-middle text-sm text-slate-600">
                {formatDate(quotation.quoteDate)}
              </td>

              {/* Valid until */}
              <td className="whitespace-nowrap px-4 py-4 align-middle text-sm text-slate-600">
                {formatDate(quotation.validUntil)}
              </td>

              {/* Salesperson */}
              <td className="max-w-[170px] px-4 py-4 align-middle">
                <span className="block truncate text-sm text-slate-600">
                  {quotation.salespersonName}
                </span>
              </td>

              {/* Grand total */}
              <td className="whitespace-nowrap px-4 py-4 text-right align-middle">
                <span className="text-sm font-semibold text-slate-900">
                  {formatCurrency(
                    quotation.grandTotal,
                    quotation.currency,
                  )}
                </span>
              </td>

              {/* Status */}
              <td className="px-4 py-4 align-middle">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${getStatusClasses(
                    quotation.status,
                  )}`}
                >
                  {statusLabels[quotation.status]}
                </span>
              </td>

              {/* Approval */}
              <td className="px-4 py-4 align-middle">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${getApprovalClasses(
                    quotation.approvalStatus,
                  )}`}
                >
                  {approvalLabels[quotation.approvalStatus]}
                </span>
              </td>

              {/* Actions */}
              <td className="px-4 py-4 align-middle">
                <div className="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => onView(quotation.id)}
                    aria-label={`View ${quotation.quoteNumber}`}
                    className="rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  >
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => onEdit(quotation.id)}
                    aria-label={`Edit ${quotation.quoteNumber}`}
                    className="rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}