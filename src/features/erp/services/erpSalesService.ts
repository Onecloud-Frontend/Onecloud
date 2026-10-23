/**
 * OneCloud Enterprise ERP — Sales Orders & Billing Service
 *
 * Owned by Developer 10 (Sales Orders) and Developer 11 (Invoices & Billing).
 */

import { mockInvoices, mockPayments, mockSalesOrders } from '../mocks/sales.mock';
import type { Invoice, Payment, SalesOrder } from '../types/sales.types';

const simulateDelay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

export const erpSalesService = {
  // ─── Sales Orders ──────────────────────────────────────────────────────────
  async listSalesOrders(): Promise<SalesOrder[]> {
    await simulateDelay(300);
    return JSON.parse(JSON.stringify(mockSalesOrders));
  },

  async getSalesOrderById(id: string): Promise<SalesOrder> {
    await simulateDelay(250);
    const order = mockSalesOrders.find((so) => so.id === id);
    if (!order) throw new Error(`Sales Order ${id} not found.`);
    return JSON.parse(JSON.stringify(order));
  },

  // ─── Invoices ──────────────────────────────────────────────────────────────
  async listInvoices(): Promise<Invoice[]> {
    await simulateDelay(300);
    return JSON.parse(JSON.stringify(mockInvoices));
  },

  async getInvoiceById(id: string): Promise<Invoice> {
    await simulateDelay(250);
    const invoice = mockInvoices.find((inv) => inv.id === id);
    if (!invoice) throw new Error(`Invoice ${id} not found.`);
    return JSON.parse(JSON.stringify(invoice));
  },

  // ─── Payments ──────────────────────────────────────────────────────────────
  async listPayments(): Promise<Payment[]> {
    await simulateDelay(300);
    return JSON.parse(JSON.stringify(mockPayments));
  },
};
