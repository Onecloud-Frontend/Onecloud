import type { QuotationSettings } from "../types/quotationSettings.types";

export const quotationSettingsMockData: QuotationSettings = {
  quoteNumberPrefix: "QT-",
  nextQuoteNumber: 7,
  quoteNumberFormat: "QT-{YYYY}-{####}",

  quoteStatuses: [
    {
      id: "quote-status-draft",
      name: "Draft",
      code: "draft",
      description: "Quotation is being prepared and has not been submitted.",
      active: true,
    },
    {
      id: "quote-status-sent",
      name: "Sent",
      code: "sent",
      description: "Quotation has been sent to the customer.",
      active: true,
    },
    {
      id: "quote-status-accepted",
      name: "Accepted",
      code: "accepted",
      description: "Customer has accepted the quotation.",
      active: true,
    },
    {
      id: "quote-status-rejected",
      name: "Rejected",
      code: "rejected",
      description: "Quotation has been rejected.",
      active: true,
    },
    {
      id: "quote-status-expired",
      name: "Expired",
      code: "expired",
      description: "Quotation is no longer valid.",
      active: true,
    },
  ],

  approvalRequired: true,
  approvalThreshold: 100000,

  defaultCurrency: "INR",
  defaultTaxRate: 18,
  allowDiscount: true,
  maximumDiscount: 20,

  updatedAt: "2026-09-29T09:00:00.000Z",
  updatedBy: "VENNELA GOPICHAND",
};
