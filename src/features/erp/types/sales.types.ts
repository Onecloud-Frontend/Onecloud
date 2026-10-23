/**
 * OneCloud Enterprise ERP — Sales Orders, Customer Invoices & Payments Types
 *
 * Owned by Developer 10 (Sales Orders & Fulfillment) and
 * Developer 11 (Invoices, Payments & Financial Reporting).
 */

import { AuditMetadata, CrmCustomerReference } from './common.types';

export type SalesOrderStatus =
  | 'Draft'
  | 'Confirmed'
  | 'In Production'
  | 'Partially Fulfilled'
  | 'Fulfilled'
  | 'Cancelled';

export type FulfillmentStatus = 'Unfulfilled' | 'Partial' | 'Fulfilled';

export interface SalesOrderLine {
  id: string;
  productId: string;
  productSku: string;
  productName: string;
  quantityOrdered: number;
  quantityFulfilled: number;
  unitPrice: number;
  discount: number;
  lineTotal: number;
}

export interface SalesOrder {
  id: string;
  orderNumber: string;
  customer: CrmCustomerReference;
  orderDate: string;
  expectedDeliveryDate: string;
  status: SalesOrderStatus;
  fulfillmentStatus: FulfillmentStatus;
  lines: SalesOrderLine[];
  subtotal: number;
  taxAmount: number;
  discountTotal: number;
  totalAmount: number;
  shippingAddress: string;
  notes?: string;
  audit: AuditMetadata;
}

export type InvoiceType = 'Customer Invoice' | 'Vendor Bill';

export type InvoiceStatus =
  | 'Draft'
  | 'Issued'
  | 'Partially Paid'
  | 'Paid'
  | 'Overdue'
  | 'Void';

export interface InvoiceLine {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  total: number;
  accountId?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  type: InvoiceType;
  relatedOrderId?: string;
  entityId: string;
  entityName: string;
  entityType: 'Customer' | 'Supplier';
  issueDate: string;
  dueDate: string;
  lines: InvoiceLine[];
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  amountPaid: number;
  amountDue: number;
  status: InvoiceStatus;
  paymentTerms: string;
  audit: AuditMetadata;
}

export type PaymentMethod =
  | 'Bank Transfer'
  | 'Credit Card'
  | 'ACH'
  | 'Cheque'
  | 'Wire Transfer';

export type PaymentStatus = 'Pending' | 'Completed' | 'Failed' | 'Reconciled';

export interface Payment {
  id: string;
  paymentNumber: string;
  invoiceId: string;
  invoiceNumber: string;
  payerType: 'Customer' | 'Company';
  payerName: string;
  amount: number;
  paymentDate: string;
  method: PaymentMethod;
  transactionReference: string;
  status: PaymentStatus;
  audit: AuditMetadata;
}
