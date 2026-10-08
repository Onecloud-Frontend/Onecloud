export type InvoiceStatus =
  | "DRAFT"
  | "SENT"
  | "PARTIALLY_PAID"
  | "PAID"
  | "OVERDUE"
  | "CANCELLED";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  orderId: string;

  invoiceDate: string;
  dueDate: string;

  status: InvoiceStatus;

  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;

  currency: "INR";

  createdAt: string;
  updatedAt: string;
}