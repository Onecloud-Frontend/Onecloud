/**
 * OneCloud Enterprise ERP — Procurement, Supplier & PO Types
 *
 * Owned by Developer 5 (Suppliers), Developer 6 (Requisitions & Approvals),
 * and Developer 7 (Purchase Orders & Receiving).
 */

import { AuditMetadata, HrmsEmployeeReference } from './common.types';

export type SupplierStatus = 'Active' | 'Pending' | 'Inactive' | 'Blacklisted';

export type PaymentTerms = 'Net 15' | 'Net 30' | 'Net 45' | 'Net 60' | 'Due on Receipt';

export interface Supplier {
  id: string;
  supplierCode: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
  paymentTerms: PaymentTerms;
  rating: number; // 1 to 5
  status: SupplierStatus;
  category: string;
  audit: AuditMetadata;
}

export type RequisitionPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type RequisitionStatus = 'Draft' | 'Submitted' | 'Approved' | 'Rejected' | 'Converted to PO';

export interface RequisitionLine {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  estimatedTotal: number;
  notes?: string;
}

export interface PurchaseRequisition {
  id: string;
  requisitionNumber: string;
  requestedBy: HrmsEmployeeReference;
  department: string;
  requiredDate: string;
  priority: RequisitionPriority;
  status: RequisitionStatus;
  lines: RequisitionLine[];
  totalAmount: number;
  approver?: HrmsEmployeeReference;
  approvalDate?: string;
  rejectionReason?: string;
  audit: AuditMetadata;
}

export type PurchaseOrderStatus = 'Draft' | 'Issued' | 'Partially Received' | 'Received' | 'Cancelled';

export interface PurchaseOrderLine {
  id: string;
  productId: string;
  productSku: string;
  productName: string;
  quantityOrdered: number;
  quantityReceived: number;
  unitPrice: number;
  lineTotal: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  requisitionId?: string;
  orderDate: string;
  expectedDeliveryDate: string;
  status: PurchaseOrderStatus;
  lines: PurchaseOrderLine[];
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  paymentTerms: PaymentTerms;
  notes?: string;
  audit: AuditMetadata;
}

export type GrnStatus = 'Draft' | 'Verified' | 'Discrepancy';

export interface GrnLine {
  id: string;
  poLineId: string;
  productId: string;
  quantityReceived: number;
  quantityAccepted: number;
  quantityRejected: number;
  rejectionReason?: string;
}

export interface GoodsReceivedNote {
  id: string;
  grnNumber: string;
  poId: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  receiptDate: string;
  receivedBy: HrmsEmployeeReference;
  status: GrnStatus;
  lines: GrnLine[];
  warehouseId: string;
  notes?: string;
  audit: AuditMetadata;
}
