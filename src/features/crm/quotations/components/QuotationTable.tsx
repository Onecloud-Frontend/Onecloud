import type { Quotation } from "../types/quotation.types";

interface QuotationTableProps {
  quotations: Quotation[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

const statusLabels: Record<
  Quotation["status"],
  string
> = {
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

export function QuotationTable({
  quotations,
  onView,
  onEdit,
}: QuotationTableProps) {
  return (
    <div className="quotation-table-wrapper">
      <table className="quotation-table">
        <thead>
          <tr>
            <th>Quotation</th>
            <th>Customer</th>
            <th>Opportunity</th>
            <th>Quote date</th>
            <th>Valid until</th>
            <th>Salesperson</th>
            <th>Grand total</th>
            <th>Status</th>
            <th>Approval</th>
            <th aria-label="Actions" />
          </tr>
        </thead>

        <tbody>
          {quotations.map((quotation) => (
            <tr key={quotation.id}>
              {/* Quotation */}

              <td>
                <button
                  type="button"
                  className="quotation-number"
                  onClick={() =>
                    onView(quotation.id)
                  }
                >
                  {quotation.quoteNumber}
                </button>

                <span className="quotation-id">
                  {quotation.id}
                </span>
              </td>

              {/* Customer */}

              <td>
                <span className="quotation-customer">
                  {quotation.customerName}
                </span>

                {quotation.contactName && (
                  <span className="secondary-text">
                    {quotation.contactName}
                  </span>
                )}
              </td>

              {/* Opportunity */}

              <td>
                <span className="quotation-opportunity">
                  {quotation.opportunityName ??
                    "—"}
                </span>
              </td>

              {/* Quote date */}

              <td>
                {formatDate(
                  quotation.quoteDate,
                )}
              </td>

              {/* Valid until */}

              <td>
                {formatDate(
                  quotation.validUntil,
                )}
              </td>

              {/* Salesperson */}

              <td>
                {quotation.salespersonName}
              </td>

              {/* Grand total */}

              <td>
                <span className="quotation-amount">
                  {formatCurrency(
                    quotation.grandTotal,
                    quotation.currency,
                  )}
                </span>
              </td>

              {/* Status */}

              <td>
                <span
                  className={`quotation-status quotation-status-${quotation.status}`}
                >
                  {statusLabels[
                    quotation.status
                  ]}
                </span>
              </td>

              {/* Approval */}

              <td>
                <span
                  className={`quotation-approval quotation-approval-${quotation.approvalStatus}`}
                >
                  {
                    approvalLabels[
                      quotation.approvalStatus
                    ]
                  }
                </span>
              </td>

              {/* Actions */}

              <td>
                <div className="quotation-actions">
                  <button
                    type="button"
                    className="quotation-action-button"
                    onClick={() =>
                      onView(quotation.id)
                    }
                    aria-label={`View ${quotation.quoteNumber}`}
                  >
                    View
                  </button>

                  <button
                    type="button"
                    className="quotation-action-button"
                    onClick={() =>
                      onEdit(quotation.id)
                    }
                    aria-label={`Edit ${quotation.quoteNumber}`}
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
