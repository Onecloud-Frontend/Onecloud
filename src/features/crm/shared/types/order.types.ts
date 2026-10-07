export type OrderStatus =
  | "DRAFT"
  | "CONFIRMED"
  | "PROCESSING"
  | "COMPLETED"
  | "CANCELLED";

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  quotationId?: string;
  opportunityId?: string;

  orderDate: string;
  status: OrderStatus;

  lineItems: QuotationLineItem[];

  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;

  currency: "INR";

  createdBy: string;

  createdAt: string;
  updatedAt: string;
}