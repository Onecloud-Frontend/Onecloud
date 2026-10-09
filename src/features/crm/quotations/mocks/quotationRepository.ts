import type {
  Quotation,
  QuotationFormValues,
} from "../types/quotation.types";

import {
  customers,
  contacts,
  opportunities,
  products,
  users,
} from "../../shared/data";

import {
  calculateCompleteLineItem,
  calculateQuotationTotals,
} from "../utils/quotationCalculations";

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

/**
 * Maps quotation form values into the
 * feature-level quotation model.
 *
 * All CRM relationships are resolved
 * from the centralized CRM dataset.
 */
function mapFormValuesToQuotation(
  values: QuotationFormValues,
  existing?: Quotation,
): Quotation {
  const now =
    new Date().toISOString();

  /*
   * Resolve the selected customer from
   * the centralized CRM dataset.
   */
  const customer = customers.find(
    (item) =>
      item.id === values.customerId,
  );

  if (!customer) {
    throw new Error(
      "Selected customer was not found in the CRM dataset.",
    );
  }

  /*
   * Resolve the selected opportunity.
   */
  const opportunity =
    values.opportunityId
      ? opportunities.find(
          (item) =>
            item.id ===
            values.opportunityId,
        )
      : undefined;

  if (
    values.opportunityId &&
    !opportunity
  ) {
    throw new Error(
      "Selected opportunity was not found in the CRM dataset.",
    );
  }

  /*
   * If an opportunity is selected,
   * make sure it actually belongs to
   * the selected customer.
   */
  if (
    opportunity &&
    opportunity.customerId !==
      customer.id
  ) {
    throw new Error(
      "Selected opportunity does not belong to the selected customer.",
    );
  }

  /*
   * Resolve the salesperson from the
   * centralized users dataset.
   */
  const salesperson = users.find(
    (item) =>
      item.id ===
      values.salespersonId,
  );

  if (!salesperson) {
    throw new Error(
      "Selected salesperson was not found in the CRM dataset.",
    );
  }

  if (!salesperson.isActive) {
    throw new Error(
      "Selected salesperson is inactive.",
    );
  }

  /*
   * Find the customer's primary
   * contact from the centralized
   * contacts dataset.
   *
   * The form currently does not ask
   * the user to select a contact, so
   * we resolve the primary contact
   * automatically.
   */
  const primaryContact =
    contacts.find(
      (contact) =>
        contact.customerId ===
          customer.id &&
        contact.isPrimary &&
        contact.status ===
          "ACTIVE",
    );

  /*
   * Recalculate every line item using
   * the centralized product dataset.
   *
   * Product ID is the relationship.
   */
  const lineItems =
    values.lineItems.map((item) => {
      if (!item.productId) {
        throw new Error(
          "Every quotation line item must have a valid product.",
        );
      }

      const product =
        products.find(
          (productItem) =>
            productItem.id ===
            item.productId,
        );

      if (!product) {
        throw new Error(
          `Product ${item.productId} was not found in the CRM dataset.`,
        );
      }

      if (!product.isActive) {
        throw new Error(
          `${product.name} is currently inactive.`,
        );
      }

      /*
       * Product master data is the source
       * of truth for product identity,
       * description, price and tax rate.
       *
       * Quantity and discount come from
       * the quotation form.
       */
      return calculateCompleteLineItem({
        id: item.id,
        productId: product.id,
        productName: product.name,
        description:
          item.description ??
          product.description ??
          "",
        quantity: item.quantity,
        unitPrice: product.unitPrice,
        discountPercent:
          item.discountPercent,
        taxRate: product.taxRate,
      });
    });

  /*
   * Calculate quotation totals from the
   * final calculated line items.
   */
  const totals =
    calculateQuotationTotals(
      lineItems,
    );

  return {
    id:
      existing?.id ??
      `quotation-${Date.now()}`,

    quoteNumber:
      existing?.quoteNumber ??
      createQuoteNumber(),

    /*
     * Customer relationship.
     */
    customerId:
      customer.id,

    customerName:
      customer.companyName,

    customerAddress:
      customer.billingAddress
        ? [
            customer.billingAddress
              .addressLine1,
            customer.billingAddress
              .addressLine2,
            customer.billingAddress
              .city,
            customer.billingAddress
              .state,
            customer.billingAddress
              .postalCode,
            customer.billingAddress
              .country,
          ]
            .filter(Boolean)
            .join(", ")
        : undefined,

    /*
     * Contact relationship.
     */
    contactId:
      primaryContact?.id ??
      existing?.contactId,

    contactName:
      primaryContact
        ? `${primaryContact.firstName} ${primaryContact.lastName}`
        : existing?.contactName,

    /*
     * Opportunity relationship.
     */
    opportunityId:
      opportunity?.id ??
      undefined,

    opportunityName:
      opportunity?.name,

    quoteDate:
      values.quoteDate,

    validUntil:
      values.validUntil,

    /*
     * Salesperson relationship.
     */
    salespersonId:
      salesperson.id,

    salespersonName:
      `${salesperson.firstName} ${salesperson.lastName}`,

    currency:
      values.currency,

    paymentTerms:
      values.paymentTerms ||
      undefined,

    deliveryTerms:
      values.deliveryTerms ||
      undefined,

    /*
     * Final calculated line items.
     */
    lineItems,

    /*
     * Final calculated quotation totals.
     */
    subtotal:
      totals.subtotal,

    discountAmount:
      totals.discountAmount,

    taxAmount:
      totals.taxAmount,

    grandTotal:
      totals.grandTotal,

    /*
     * Preserve workflow state while
     * editing an existing quotation.
     */
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

    updatedAt:
      now,
  };
}

/*
 * Return all quotations.
 */
export async function findAll(): Promise<
  Quotation[]
> {
  return [...quotations];
}

/*
 * Find a quotation by ID.
 */
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

/*
 * Create a new quotation.
 */
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

/*
 * Update an existing quotation.
 */
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

/*
 * Submit a quotation for approval.
 */
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

    status: "sent",

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

/*
 * Revise a rejected or expired
 * quotation.
 */
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

    status: "draft",

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
