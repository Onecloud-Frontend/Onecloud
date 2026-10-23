/**
 * OneCloud Enterprise ERP — Sales Orders, Invoices & Payments Mock Fixtures
 *
 * Owned by Developer 10 (Sales Orders & Fulfillment) and
 * Developer 11 (Invoices, Payments & Financial Reporting).
 */

import type { Invoice, Payment, SalesOrder } from '../types/sales.types';
import type { CrmCustomerReference } from '../types/common.types';

export const mockCrmCustomers: Record<string, CrmCustomerReference> = {
  apexGlobal: {
    id: 'CUST-CRM-101',
    customerName: 'Apex Global Technologies Inc',
    contactPerson: 'Michael Chang',
    email: 'mchang@apexglobal.io',
    phone: '+1 (512) 555-0199',
    billingAddress: '100 Congress Ave Suite 800, Austin, TX 78701',
    taxIdentifier: 'US-EIN-74-8891024',
  },
  stellarAero: {
    id: 'CUST-CRM-102',
    customerName: 'Stellar Aerospace Dynamics',
    contactPerson: 'Dr. Arthur Ross',
    email: 'ross.a@stellaraero.com',
    phone: '+1 (303) 555-3810',
    billingAddress: '4800 Technology Way, Denver, CO 80239',
    taxIdentifier: 'US-EIN-84-2194830',
  },
  quantumRobotics: {
    id: 'CUST-CRM-103',
    customerName: 'Quantum Robotics Group Ltd',
    contactPerson: 'Hiroshi Tanaka',
    email: 'htanaka@quantumrobotics.jp',
    phone: '+81 3 5555 0142',
    billingAddress: '2-11-1 Nagata-cho, Chiyoda-ku, Tokyo, Japan',
    taxIdentifier: 'JP-CORP-901000109',
  },
};

export const mockSalesOrders: SalesOrder[] = [
  {
    id: 'SO-2026-001',
    orderNumber: 'SO-2026-0501',
    customer: mockCrmCustomers.apexGlobal,
    orderDate: '2026-10-15',
    expectedDeliveryDate: '2026-10-30',
    status: 'Confirmed',
    fulfillmentStatus: 'Partial',
    lines: [
      {
        id: 'SOL-001',
        productId: 'PROD-001',
        productSku: 'SRV-48V-01',
        productName: 'Precision Servo Motor 48V',
        quantityOrdered: 20,
        quantityFulfilled: 12,
        unitPrice: 420,
        discount: 0,
        lineTotal: 8400,
      },
      {
        id: 'SOL-002',
        productId: 'PROD-002',
        productSku: 'MCU-IND-08',
        productName: 'Industrial Microcontroller Board',
        quantityOrdered: 25,
        quantityFulfilled: 25,
        unitPrice: 160,
        discount: 200,
        lineTotal: 3800,
      },
    ],
    subtotal: 12200,
    taxAmount: 976, // 8%
    discountTotal: 200,
    totalAmount: 13176,
    shippingAddress: 'Central Warehouse Dock 2, 100 Congress Ave, Austin, TX 78701',
    notes: 'Partial shipment of 12 motors and all 25 MCUs dispatched Oct 23.',
    audit: {
      createdAt: '2026-10-15T10:00:00Z',
      createdBy: 'sales-agent-01',
    },
  },
  {
    id: 'SO-2026-002',
    orderNumber: 'SO-2026-0502',
    customer: mockCrmCustomers.stellarAero,
    orderDate: '2026-10-18',
    expectedDeliveryDate: '2026-11-10',
    status: 'In Production',
    fulfillmentStatus: 'Unfulfilled',
    lines: [
      {
        id: 'SOL-003',
        productId: 'PROD-005',
        productSku: 'SYS-ARM-6X',
        productName: '6-Axis Articulated Cobot Arm',
        quantityOrdered: 2,
        quantityFulfilled: 0,
        unitPrice: 9200,
        discount: 400,
        lineTotal: 18000,
      },
    ],
    subtotal: 18000,
    taxAmount: 1440,
    discountTotal: 400,
    totalAmount: 19440,
    shippingAddress: '4800 Technology Way, Denver, CO 80239',
    audit: {
      createdAt: '2026-10-18T14:30:00Z',
      createdBy: 'sales-agent-02',
    },
  },
  {
    id: 'SO-2026-003',
    orderNumber: 'SO-2026-0503',
    customer: mockCrmCustomers.quantumRobotics,
    orderDate: '2026-10-21',
    expectedDeliveryDate: '2026-11-15',
    status: 'Confirmed',
    fulfillmentStatus: 'Unfulfilled',
    lines: [
      {
        id: 'SOL-004',
        productId: 'PROD-003',
        productSku: 'GRB-TI-03',
        productName: 'Titanium Planetary Gearbox',
        quantityOrdered: 10,
        quantityFulfilled: 0,
        unitPrice: 580,
        discount: 0,
        lineTotal: 5800,
      },
    ],
    subtotal: 5800,
    taxAmount: 464,
    discountTotal: 0,
    totalAmount: 6264,
    shippingAddress: '2-11-1 Nagata-cho, Chiyoda-ku, Tokyo, Japan',
    audit: {
      createdAt: '2026-10-21T09:00:00Z',
      createdBy: 'sales-agent-01',
    },
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: 'INV-2026-001',
    invoiceNumber: 'INV-2026-1048',
    type: 'Customer Invoice',
    relatedOrderId: 'SO-2026-001',
    entityId: 'CUST-CRM-101',
    entityName: 'Apex Global Technologies Inc',
    entityType: 'Customer',
    issueDate: '2026-10-16',
    dueDate: '2026-11-15',
    lines: [
      {
        id: 'INVL-001',
        description: 'Partial Billing — 12x Precision Servo Motor 48V',
        quantity: 12,
        unitPrice: 420,
        taxRate: 0.08,
        total: 5443.2,
      },
      {
        id: 'INVL-002',
        description: '25x Industrial Microcontroller Board with discount',
        quantity: 25,
        unitPrice: 152,
        taxRate: 0.08,
        total: 4104.0,
      },
    ],
    subtotal: 8840,
    taxAmount: 707.2,
    totalAmount: 9547.2,
    amountPaid: 6000,
    amountDue: 3547.2,
    status: 'Partially Paid',
    paymentTerms: 'Net 30',
    audit: {
      createdAt: '2026-10-16T11:00:00Z',
      createdBy: 'billing-admin',
    },
  },
  {
    id: 'INV-2026-002',
    invoiceNumber: 'INV-2026-1049',
    type: 'Customer Invoice',
    entityId: 'CUST-CRM-103',
    entityName: 'Quantum Robotics Group Ltd',
    entityType: 'Customer',
    issueDate: '2026-09-15',
    dueDate: '2026-10-15', // Past due!
    lines: [
      {
        id: 'INVL-003',
        description: 'Robotics Sensors and Sub-assembly Package',
        quantity: 1,
        unitPrice: 15800,
        taxRate: 0.08,
        total: 17064,
      },
    ],
    subtotal: 15800,
    taxAmount: 1264,
    totalAmount: 17064,
    amountPaid: 0,
    amountDue: 17064,
    status: 'Overdue',
    paymentTerms: 'Net 30',
    audit: {
      createdAt: '2026-09-15T09:00:00Z',
      createdBy: 'billing-admin',
    },
  },
  {
    id: 'INV-VEND-001',
    invoiceNumber: 'BILL-ACRO-902',
    type: 'Vendor Bill',
    relatedOrderId: 'PO-2026-001',
    entityId: 'SUP-001',
    entityName: 'AcroTech Industrial Components',
    entityType: 'Supplier',
    issueDate: '2026-10-22',
    dueDate: '2026-11-21',
    lines: [
      {
        id: 'INVL-004',
        description: 'PO-2026-0891 Partial Fulfillment (30 Servo Motors + 75 MCUs)',
        quantity: 1,
        unitPrice: 13575,
        taxRate: 0.08,
        total: 14661,
      },
    ],
    subtotal: 13575,
    taxAmount: 1086,
    totalAmount: 14661,
    amountPaid: 0,
    amountDue: 14661,
    status: 'Issued',
    paymentTerms: 'Net 30',
    audit: {
      createdAt: '2026-10-22T15:00:00Z',
      createdBy: 'accounts-payable',
    },
  },
];

export const mockPayments: Payment[] = [
  {
    id: 'PAY-2026-001',
    paymentNumber: 'RCPT-2026-0410',
    invoiceId: 'INV-2026-001',
    invoiceNumber: 'INV-2026-1048',
    payerType: 'Customer',
    payerName: 'Apex Global Technologies Inc',
    amount: 6000,
    paymentDate: '2026-10-20',
    method: 'Bank Transfer',
    transactionReference: 'WIRE-US-99120847',
    status: 'Reconciled',
    audit: {
      createdAt: '2026-10-20T16:00:00Z',
      createdBy: 'finance-clerk',
    },
  },
];
