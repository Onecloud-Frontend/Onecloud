/**
 * OneCloud Enterprise ERP — Procurement & Sourcing Service
 *
 * Owned by Developer 5 (Suppliers), Developer 6 (Requisitions), and Developer 7 (POs).
 */

import { mockGoodsReceipts, mockPurchaseOrders, mockRequisitions } from '../mocks/procurement.mock';
import { mockSuppliers } from '../mocks/suppliers.mock';
import type { HrmsEmployeeReference } from '../types/common.types';
import type { GoodsReceivedNote, PurchaseOrder, PurchaseRequisition, Supplier } from '../types/procurement.types';

const simulateDelay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

export const erpProcurementService = {
  // ─── Suppliers ─────────────────────────────────────────────────────────────
  async listSuppliers(): Promise<Supplier[]> {
    await simulateDelay(300);
    return JSON.parse(JSON.stringify(mockSuppliers));
  },

  async getSupplierById(id: string): Promise<Supplier> {
    await simulateDelay(250);
    const supplier = mockSuppliers.find((s) => s.id === id);
    if (!supplier) throw new Error(`Supplier ${id} not found.`);
    return JSON.parse(JSON.stringify(supplier));
  },

  // ─── Requisitions ──────────────────────────────────────────────────────────
  async listRequisitions(): Promise<PurchaseRequisition[]> {
    await simulateDelay(300);
    return JSON.parse(JSON.stringify(mockRequisitions));
  },

  async getRequisitionById(id: string): Promise<PurchaseRequisition> {
    await simulateDelay(250);
    const requisition = mockRequisitions.find((r) => r.id === id);
    if (!requisition) throw new Error(`Requisition ${id} not found.`);
    return JSON.parse(JSON.stringify(requisition));
  },

  async createRequisition(
    data: Omit<PurchaseRequisition, 'id' | 'audit'>
  ): Promise<PurchaseRequisition> {
    await simulateDelay(400);
    const newReq: PurchaseRequisition = {
      ...data,
      id: `REQ-2026-${String(mockRequisitions.length + 1).padStart(3, '0')}`,
      audit: {
        createdAt: new Date().toISOString(),
        createdBy: data.requestedBy.employeeCode,
      },
    };
    mockRequisitions.push(newReq);
    return JSON.parse(JSON.stringify(newReq));
  },

  async approveRequisition(
    id: string,
    approver: HrmsEmployeeReference
  ): Promise<PurchaseRequisition> {
    await simulateDelay(350);
    const req = mockRequisitions.find((r) => r.id === id);
    if (!req) throw new Error(`Requisition ${id} not found.`);
    req.status = 'Approved';
    req.approver = approver;
    req.approvalDate = new Date().toISOString();
    return JSON.parse(JSON.stringify(req));
  },

  // ─── Purchase Orders ───────────────────────────────────────────────────────
  async listPurchaseOrders(): Promise<PurchaseOrder[]> {
    await simulateDelay(300);
    return JSON.parse(JSON.stringify(mockPurchaseOrders));
  },

  async getPurchaseOrderById(id: string): Promise<PurchaseOrder> {
    await simulateDelay(250);
    const po = mockPurchaseOrders.find((p) => p.id === id);
    if (!po) throw new Error(`Purchase Order ${id} not found.`);
    return JSON.parse(JSON.stringify(po));
  },

  // ─── Goods Receipt ─────────────────────────────────────────────────────────
  async listGoodsReceipts(): Promise<GoodsReceivedNote[]> {
    await simulateDelay(300);
    return JSON.parse(JSON.stringify(mockGoodsReceipts));
  },
};
