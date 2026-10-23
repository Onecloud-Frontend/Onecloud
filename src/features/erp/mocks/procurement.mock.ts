/**
 * OneCloud Enterprise ERP — Procurement Mock Fixtures
 *
 * Owned by Developer 6 (Requisitions) and Developer 7 (Purchase Orders & Receiving).
 */

import type { GoodsReceivedNote, PurchaseOrder, PurchaseRequisition } from '../types/procurement.types';
import type { HrmsEmployeeReference } from '../types/common.types';

export const mockHrmsEmployees: Record<string, HrmsEmployeeReference> = {
  requesterSarah: {
    id: 1042,
    employeeCode: 'EMP-1042',
    fullName: 'Sarah Jenkins',
    department: 'Engineering',
    designation: 'Lead Robotics Engineer',
    email: 'sarah.jenkins@onecloud.internal',
  },
  approverDavid: {
    id: 1008,
    employeeCode: 'EMP-1008',
    fullName: 'David Vance',
    department: 'Operations',
    designation: 'VP of Procurement & Operations',
    email: 'david.vance@onecloud.internal',
  },
  receiverMarcus: {
    id: 1077,
    employeeCode: 'EMP-1077',
    fullName: 'Marcus Brody',
    department: 'Supply Chain',
    designation: 'Warehouse Operations Lead',
    email: 'marcus.brody@onecloud.internal',
  },
  buyerElena: {
    id: 1024,
    employeeCode: 'EMP-1024',
    fullName: 'Elena Rostova',
    department: 'Procurement',
    designation: 'Senior Sourcing Specialist',
    email: 'elena.rostova@onecloud.internal',
  },
};

export const mockRequisitions: PurchaseRequisition[] = [
  {
    id: 'REQ-2026-001',
    requisitionNumber: 'PR-2026-0142',
    requestedBy: mockHrmsEmployees.requesterSarah,
    department: 'Engineering',
    requiredDate: '2026-11-15',
    priority: 'High',
    status: 'Converted to PO',
    lines: [
      {
        id: 'REQ-LINE-001',
        productId: 'PROD-001',
        productName: 'Precision Servo Motor 48V',
        quantity: 50,
        unitPrice: 240,
        estimatedTotal: 12000,
        notes: 'High-torque brushless servo for Assembly Cell B',
      },
      {
        id: 'REQ-LINE-002',
        productId: 'PROD-002',
        productName: 'Industrial Microcontroller Board',
        quantity: 75,
        unitPrice: 85,
        estimatedTotal: 6375,
        notes: 'MCU batch with CAN bus 2.0B firmware',
      },
    ],
    totalAmount: 18375,
    approver: mockHrmsEmployees.approverDavid,
    approvalDate: '2026-10-18T11:00:00Z',
    audit: {
      createdAt: '2026-10-16T09:30:00Z',
      createdBy: 'EMP-1042',
      updatedAt: '2026-10-18T11:05:00Z',
      updatedBy: 'EMP-1008',
    },
  },
  {
    id: 'REQ-2026-002',
    requisitionNumber: 'PR-2026-0145',
    requestedBy: mockHrmsEmployees.requesterSarah,
    department: 'Engineering',
    requiredDate: '2026-11-28',
    priority: 'Medium',
    status: 'Submitted',
    lines: [
      {
        id: 'REQ-LINE-003',
        productId: 'PROD-003',
        productName: 'Titanium Planetary Gearbox',
        quantity: 20,
        unitPrice: 310,
        estimatedTotal: 6200,
      },
    ],
    totalAmount: 6200,
    audit: {
      createdAt: '2026-10-21T14:15:00Z',
      createdBy: 'EMP-1042',
    },
  },
  {
    id: 'REQ-2026-003',
    requisitionNumber: 'PR-2026-0146',
    requestedBy: mockHrmsEmployees.buyerElena,
    department: 'Operations',
    requiredDate: '2026-11-10',
    priority: 'Urgent',
    status: 'Approved',
    lines: [
      {
        id: 'REQ-LINE-004',
        productId: 'PROD-004',
        productName: 'Conductive Silicone Gasket',
        quantity: 500,
        unitPrice: 12,
        estimatedTotal: 6000,
        notes: 'Critical buffer stock replenishments',
      },
    ],
    totalAmount: 6000,
    approver: mockHrmsEmployees.approverDavid,
    approvalDate: '2026-10-22T16:00:00Z',
    audit: {
      createdAt: '2026-10-22T10:00:00Z',
      createdBy: 'EMP-1024',
    },
  },
];

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO-2026-001',
    poNumber: 'PO-2026-0891',
    supplierId: 'SUP-001',
    supplierName: 'AcroTech Industrial Components',
    requisitionId: 'REQ-2026-001',
    orderDate: '2026-10-18',
    expectedDeliveryDate: '2026-11-04',
    status: 'Partially Received',
    lines: [
      {
        id: 'PO-LINE-001',
        productId: 'PROD-001',
        productSku: 'SRV-48V-01',
        productName: 'Precision Servo Motor 48V',
        quantityOrdered: 50,
        quantityReceived: 30,
        unitPrice: 240,
        lineTotal: 12000,
      },
      {
        id: 'PO-LINE-002',
        productId: 'PROD-002',
        productSku: 'MCU-IND-08',
        productName: 'Industrial Microcontroller Board',
        quantityOrdered: 75,
        quantityReceived: 75,
        unitPrice: 85,
        lineTotal: 6375,
      },
    ],
    subtotal: 18375,
    taxAmount: 1470, // 8% sales tax
    totalAmount: 19845,
    paymentTerms: 'Net 30',
    notes: 'Deliver to Central Logistics Hub Chicago Bay 4',
    audit: {
      createdAt: '2026-10-18T13:40:00Z',
      createdBy: 'EMP-1024',
      updatedAt: '2026-10-22T14:10:00Z',
      updatedBy: 'EMP-1077',
    },
  },
  {
    id: 'PO-2026-002',
    poNumber: 'PO-2026-0892',
    supplierId: 'SUP-002',
    supplierName: 'Apex Semiconductor Solutions',
    orderDate: '2026-10-20',
    expectedDeliveryDate: '2026-11-12',
    status: 'Issued',
    lines: [
      {
        id: 'PO-LINE-003',
        productId: 'PROD-002',
        productSku: 'MCU-IND-08',
        productName: 'Industrial Microcontroller Board',
        quantityOrdered: 200,
        quantityReceived: 0,
        unitPrice: 82,
        lineTotal: 16400,
      },
    ],
    subtotal: 16400,
    taxAmount: 1312,
    totalAmount: 17712,
    paymentTerms: 'Net 45',
    audit: {
      createdAt: '2026-10-20T11:00:00Z',
      createdBy: 'EMP-1024',
    },
  },
  {
    id: 'PO-2026-003',
    poNumber: 'PO-2026-0893',
    supplierId: 'SUP-004',
    supplierName: 'OmniPackaging Dynamics',
    orderDate: '2026-10-22',
    expectedDeliveryDate: '2026-10-29',
    status: 'Draft',
    lines: [
      {
        id: 'PO-LINE-004',
        productId: 'PROD-004',
        productSku: 'GSK-SIL-12',
        productName: 'Conductive Silicone Gasket',
        quantityOrdered: 500,
        quantityReceived: 0,
        unitPrice: 12,
        lineTotal: 6000,
      },
    ],
    subtotal: 6000,
    taxAmount: 480,
    totalAmount: 6480,
    paymentTerms: 'Net 15',
    audit: {
      createdAt: '2026-10-22T17:00:00Z',
      createdBy: 'EMP-1024',
    },
  },
];

export const mockGoodsReceipts: GoodsReceivedNote[] = [
  {
    id: 'GRN-2026-001',
    grnNumber: 'GRN-2026-0312',
    poId: 'PO-2026-001',
    poNumber: 'PO-2026-0891',
    supplierId: 'SUP-001',
    supplierName: 'AcroTech Industrial Components',
    receiptDate: '2026-10-22',
    receivedBy: mockHrmsEmployees.receiverMarcus,
    status: 'Verified',
    warehouseId: 'WH-001',
    lines: [
      {
        id: 'GRN-LINE-001',
        poLineId: 'PO-LINE-001',
        productId: 'PROD-001',
        quantityReceived: 30,
        quantityAccepted: 30,
        quantityRejected: 0,
      },
      {
        id: 'GRN-LINE-002',
        poLineId: 'PO-LINE-002',
        productId: 'PROD-002',
        quantityReceived: 75,
        quantityAccepted: 75,
        quantityRejected: 0,
      },
    ],
    notes: 'Partial shipment inspected and accepted. Balance 20 units of Servo 48V scheduled for Nov 2.',
    audit: {
      createdAt: '2026-10-22T14:00:00Z',
      createdBy: 'EMP-1077',
    },
  },
];
