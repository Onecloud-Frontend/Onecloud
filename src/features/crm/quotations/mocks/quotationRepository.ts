import type {
  Quotation,
  QuotationFormValues,
} from "../types/quotation.types";

import { quotationMockData } from "./quotationMockData";

let quotations: Quotation[] = [
  ...quotationMockData,
];

function createQuoteNumber(): string {
  const year =
    new Date().getFullYear();

  const maxNumber =
    quotations.reduce(
      (max, quotation) => {
        const match =
          quotation.quoteNumber.match(
            /(\d+)$/,
          );

        if (!match) {
          return max;
        }

        return Math.max(
          max,
          Number(match[1]),
        );
      },
      0,
    );

  return `QT-${year}-${String(
    maxNumber + 1,
  ).padStart(3, "0")}`;
}

function mapFormValuesToQuotation(
  values: QuotationFormValues,
  existing?: Quotation,
): Quotation {
  const now =
    new Date().toISOString();

  const subtotal =
    values.lineItems.reduce(
      (sum, item) =>
        sum + item.subtotal,
      0,
    );

  const discountAmount =
    values.lineItems.reduce(
      (sum, item) =>
        sum + item.discountAmount,
      0,
    );

  const taxAmount =
    values.lineItems.reduce(
      (sum, item) =>
        sum + item.taxAmount,
      0,
    );

  const grandTotal =
    values.lineItems.reduce(
      (sum, item) =>
        sum + item.total,
      0,
    );

  const customerName =
    getCustomerName(
      values.customerId,
    );

  const opportunityName =
    getOpportunityName(
      values.opportunityId,
    );

  const salespersonName =
    getSalespersonName(
      values.salespersonId,
    );

  return {
    id:
      existing?.id ??
      `quotation-${Date.now()}`,

    quoteNumber:
      existing?.quoteNumber ??
      createQuoteNumber(),

    customerId:
      values.customerId,

    customerName,

    customerAddress:
      existing?.customerAddress,

    contactId:
      existing?.contactId,

    contactName:
      existing?.contactName,

    opportunityId:
      values.opportunityId ||
      undefined,

    opportunityName,

    quoteDate:
      values.quoteDate,

    validUntil:
      values.validUntil,

    salespersonId:
      values.salespersonId,

    salespersonName,

    currency:
      values.currency,

    paymentTerms:
      values.paymentTerms ||
      undefined,

    deliveryTerms:
      values.deliveryTerms ||
      undefined,

    lineItems:
      values.lineItems,

    subtotal,

    discountAmount,

    taxAmount,

    grandTotal,

    status:
      existing?.status ??
      "draft",

    approvalStatus:
      existing?.approvalStatus ??
      "not_submitted",

    approvalHistory:
      existing?.approvalHistory ??
      [],

    notes:
      values.notes ||
      undefined,

    createdAt:
      existing?.createdAt ??
      now,

    updatedAt: now,
  };
}

/*
 * These temporary lookup functions will eventually
 * be replaced by Customer / Opportunity / User APIs.
 */

function getCustomerName(
  customerId: string,
): string {
  const customers: Record<
    string,
    string
  > = {
    "cust-001":
      "Acme Technologies",

    "cust-002":
      "GlobalTech Solutions",

    "cust-003":
      "Nova Retail Group",

    "cust-004":
      "Vertex Manufacturing Ltd",

    "cust-005":
      "BrightWave Digital Services",
  };

  return (
    customers[customerId] ??
    "Unknown customer"
  );
}

function getOpportunityName(
  opportunityId?: string,
): string | undefined {
  if (!opportunityId) {
    return undefined;
  }

  const opportunities: Record<
    string,
    string
  > = {
    "opp-001":
      "Acme Cloud Migration",

    "opp-002":
      "GlobalTech Infrastructure",

    "opp-003":
      "Nova Retail Expansion",

    "opp-004":
      "Vertex ERP Upgrade",
  };

  return opportunities[
    opportunityId
  ];
}

function getSalespersonName(
  salespersonId: string,
): string {
  const salespeople: Record<
    string,
    string
  > = {
    "sp-001":
      "Vennela Gopichand",

    "sp-002":
      "Rahul Sharma",

    "sp-003":
      "Priya Reddy",
  };

  return (
    salespeople[salespersonId] ??
    "Unknown salesperson"
  );
}

export async function findAll(): Promise<
  Quotation[]
> {
  return [...quotations];
}

export async function findById(
  id: string,
): Promise<
  Quotation | undefined
> {
  return quotations.find(
    (quotation) =>
      quotation.id === id,
  );
}

export async function create(
  values: QuotationFormValues,
): Promise<Quotation> {
  const quotation =
    mapFormValuesToQuotation(
      values,
    );

  quotations = [
    quotation,
    ...quotations,
  ];

  return quotation;
}

export async function update(
  id: string,
  values: QuotationFormValues,
): Promise<Quotation> {
  const existing =
    quotations.find(
      (quotation) =>
        quotation.id === id,
    );

  if (!existing) {
    throw new Error(
      "Quotation not found",
    );
  }

  const updated =
    mapFormValuesToQuotation(
      values,
      existing,
    );

  quotations = quotations.map(
    (quotation) =>
      quotation.id === id
        ? updated
        : quotation,
  );

  return updated;
}

export async function submitApproval(
  id: string,
): Promise<Quotation> {
  const existing =
    quotations.find(
      (quotation) =>
        quotation.id === id,
    );

  if (!existing) {
    throw new Error(
      "Quotation not found",
    );
  }

  /*
   * A quotation can only enter the
   * approval workflow from the initial
   * draft / not-submitted state.
   */
  if (
    existing.status !== "draft" ||
    existing.approvalStatus !==
      "not_submitted"
  ) {
    throw new Error(
      "Only draft quotations that have not yet been submitted can be submitted for approval",
    );
  }

  const now =
    new Date().toISOString();

  const updated: Quotation = {
    ...existing,

    /*
     * Once the quotation is submitted
     * into the approval workflow, its
     * quotation status becomes Sent.
     */
    status: "sent",

    /*
     * The approval workflow is now
     * waiting for an approver.
     */
    approvalStatus:
      "pending",

    approvalHistory: [
      ...(existing.approvalHistory ??
        []),

      {
        id: `approval-${Date.now()}`,

        status: "pending",

        actionBy:
          existing.salespersonName,

        comment:
          "Quotation submitted for approval.",

        createdAt: now,
      },
    ],

    updatedAt: now,
  };

  quotations = quotations.map(
    (quotation) =>
      quotation.id === id
        ? updated
        : quotation,
  );

  return updated;
}

export async function revise(
  id: string,
): Promise<Quotation> {
  const existing =
    quotations.find(
      (quotation) =>
        quotation.id === id,
    );

  if (!existing) {
    throw new Error(
      "Quotation not found",
    );
  }

  if (
    existing.status !==
      "rejected" &&
    existing.status !==
      "expired"
  ) {
    throw new Error(
      "Only rejected or expired quotations can be revised",
    );
  }

  const now =
    new Date().toISOString();

  const updated: Quotation = {
    ...existing,

    /*
     * A revised quotation goes back
     * to the preparation stage.
     */
    status: "draft",

    /*
     * Approval must be submitted
     * again after revision.
     */
    approvalStatus:
      "not_submitted",

    approvalHistory: [
      ...(existing.approvalHistory ??
        []),

      {
        id: `approval-${Date.now()}`,

        status:
          "not_submitted",

        actionBy:
          existing.salespersonName,

        comment:
          "Quotation revised and returned to draft.",

        createdAt: now,
      },
    ],

    updatedAt: now,
  };

  quotations = quotations.map(
    (quotation) =>
      quotation.id === id
        ? updated
        : quotation,
  );

  return updated;
}
