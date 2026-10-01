export type QuoteStatusCode =
  | "draft"
  | "sent"
  | "accepted"
  | "rejected"
  | "expired";

export interface QuoteStatusSetting {
  id: string;
  name: string;
  code: QuoteStatusCode;
  description: string;
  active: boolean;
}

export interface QuotationSettings {
  quoteNumberPrefix: string;
  nextQuoteNumber: number;
  quoteNumberFormat: string;

  quoteStatuses: QuoteStatusSetting[];

  approvalRequired: boolean;
  approvalThreshold: number;

  defaultCurrency: string;
  defaultTaxRate: number;
  allowDiscount: boolean;
  maximumDiscount: number;

  updatedAt: string;
  updatedBy: string;
}
