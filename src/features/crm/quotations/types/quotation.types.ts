export type QuotationStatus =
  | "draft"
  | "sent"
  | "accepted"
  | "rejected"
  | "expired";

export type ApprovalStatus =
  | "not_submitted"
  | "pending"
  | "approved"
  | "rejected";

export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP";

export interface QuotationLineItem {
  id: string;
  productId?: string;
  productName: string;
  description?: string;

  quantity: number;
  unitPrice: number;

  discountPercent: number;
  taxRate: number;

  discountAmount: number;
  taxAmount: number;
  subtotal: number;
  total: number;
}

export interface ApprovalHistoryItem {
  id: string;
  status: ApprovalStatus;
  actionBy: string;
  comment?: string;
  createdAt: string;
}

export interface Quotation {
  id: string;
  quoteNumber: string;

  customerId: string;
  customerName: string;
  customerAddress?: string;

  contactId?: string;
  contactName?: string;

  opportunityId?: string;
  opportunityName?: string;

  quoteDate: string;
  validUntil: string;

  salespersonId: string;
  salespersonName: string;

  currency: CurrencyCode;

  paymentTerms?: string;
  deliveryTerms?: string;

  lineItems: QuotationLineItem[];

  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  grandTotal: number;

  status: QuotationStatus;
  approvalStatus: ApprovalStatus;

  approvalHistory?: ApprovalHistoryItem[];

  notes?: string;

  createdAt: string;
  updatedAt: string;
}

export interface QuotationFormValues {
  customerId: string;
  opportunityId?: string;

  quoteDate: string;
  validUntil: string;

  salespersonId: string;
  currency: CurrencyCode;

  paymentTerms?: string;
  deliveryTerms?: string;

  lineItems: QuotationLineItem[];

  notes?: string;
}

export interface QuotationFilters {
  search?: string;
  status?: QuotationStatus | "all";
  approvalStatus?: ApprovalStatus | "all";
  customerId?: string;

  fromDate?: string;
  toDate?: string;

  page?: number;
  pageSize?: number;
}

export interface QuotationListResponse {
  data: Quotation[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
