export type QuotationStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "SENT"
  | "ACCEPTED"
  | "REJECTED"
  | "EXPIRED";

export interface QuotationLineItem {
  id: string;
  productId: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  taxPercent: number;
  subtotal: number;
  taxAmount: number;
  total: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  customerId: string;
  contactId?: string;
  opportunityId?: string;

  quotationDate: string;
  validUntil: string;

  status: QuotationStatus;

  lineItems: QuotationLineItem[];

  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;

  currency: "INR";

  createdBy: string;
  approvedBy?: string;

  notes?: string;

  createdAt: string;
  updatedAt: string;
}