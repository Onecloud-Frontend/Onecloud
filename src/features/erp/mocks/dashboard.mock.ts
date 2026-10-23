/**
 * OneCloud Enterprise ERP — Dashboard Aggregation Mock Fixtures
 *
 * Owned by Developer 1 (ERP Dashboard and Business Overview).
 * Directly derived from underlying domain mocks for 100% data consistency.
 */

import type { ErpDashboardData, ErpKpiCardData, ErpOperationalAlert, ErpTransaction } from '../types/dashboard.types';

export const mockErpKpis: ErpKpiCardData[] = [
  {
    id: 'kpi-po-pending',
    title: 'Pending Purchase Orders',
    value: '$37,557',
    rawNumericValue: 37557,
    changePercentage: 12.4,
    changeType: 'increase',
    description: '2 active orders awaiting fulfillment',
    category: 'procurement',
  },
  {
    id: 'kpi-low-stock',
    title: 'Low Stock Alerts',
    value: '3 Items',
    rawNumericValue: 3,
    changePercentage: 50.0,
    changeType: 'increase',
    description: 'Items below safety threshold',
    category: 'inventory',
  },
  {
    id: 'kpi-receivables',
    title: 'Outstanding Receivables',
    value: '$20,611',
    rawNumericValue: 20611,
    changePercentage: -4.2,
    changeType: 'decrease',
    description: 'Includes $17,064 overdue 30+ days',
    category: 'sales',
  },
  {
    id: 'kpi-payables',
    title: 'Supplier Payables (AP)',
    value: '$51,561',
    rawNumericValue: 51561,
    changePercentage: 8.5,
    changeType: 'increase',
    description: 'Trade vendor obligations due Net 30/45',
    category: 'finance',
  },
  {
    id: 'kpi-sales-orders',
    title: 'Active Sales Pipeline',
    value: '$38,880',
    rawNumericValue: 38880,
    changePercentage: 18.2,
    changeType: 'increase',
    description: '3 orders in production or fulfillment',
    category: 'sales',
  },
  {
    id: 'kpi-budget-utilization',
    title: 'Q4 Budget Utilization',
    value: '77.1%',
    rawNumericValue: 77.1,
    changePercentage: 2.1,
    changeType: 'neutral',
    description: '$331,600 spent of $430,000 pool',
    category: 'finance',
  },
];

export const mockRecentTransactions: ErpTransaction[] = [
  {
    id: 'tx-001',
    transactionNumber: 'GRN-2026-0312',
    type: 'GRN',
    partyName: 'AcroTech Industrial Components',
    amount: 13575,
    date: '2026-10-22',
    status: 'Verified',
    statusVariant: 'success',
  },
  {
    id: 'tx-002',
    transactionNumber: 'SO-2026-0501',
    type: 'Sales Order',
    partyName: 'Apex Global Technologies Inc',
    amount: 13176,
    date: '2026-10-22',
    status: 'Partial Fulfillment',
    statusVariant: 'warning',
  },
  {
    id: 'tx-003',
    transactionNumber: 'RCPT-2026-0410',
    type: 'Payment',
    partyName: 'Apex Global Technologies Inc',
    amount: 6000,
    date: '2026-10-20',
    status: 'Reconciled',
    statusVariant: 'success',
  },
  {
    id: 'tx-004',
    transactionNumber: 'PO-2026-0891',
    type: 'Purchase Order',
    partyName: 'AcroTech Industrial Components',
    amount: 19845,
    date: '2026-10-18',
    status: 'Partially Received',
    statusVariant: 'info',
  },
  {
    id: 'tx-005',
    transactionNumber: 'INV-2026-1049',
    type: 'Invoice',
    partyName: 'Quantum Robotics Group Ltd',
    amount: 17064,
    date: '2026-10-15',
    status: 'Overdue',
    statusVariant: 'danger',
  },
];

export const mockOperationalAlerts: ErpOperationalAlert[] = [
  {
    id: 'alert-001',
    severity: 'critical',
    title: 'Customer Invoice #1049 Past Due',
    message: 'Quantum Robotics Group has $17,064.00 past 30-day payment grace period.',
    timestamp: '2026-10-23T08:00:00Z',
    actionUrl: '/erp/sales',
    domain: 'Finance',
  },
  {
    id: 'alert-002',
    severity: 'high',
    title: 'Stock Shortage: Precision Servo Motor 48V',
    message: 'Current stock is 18 units at Central Hub (reorder point: 25). Suggested order: 50 units.',
    timestamp: '2026-10-23T08:30:00Z',
    actionUrl: '/erp/inventory',
    domain: 'Inventory',
  },
  {
    id: 'alert-003',
    severity: 'high',
    title: 'Stock Shortage: Titanium Planetary Gearbox',
    message: 'Current stock is 9 units at Pacific Assembly (reorder point: 15). Suggested order: 20 units.',
    timestamp: '2026-10-23T09:00:00Z',
    actionUrl: '/erp/inventory',
    domain: 'Inventory',
  },
  {
    id: 'alert-004',
    severity: 'medium',
    title: 'Requisition PR-2026-0145 Awaiting VP Signoff',
    message: 'Engineering requisition for $6,200.00 is queued for David Vance approval.',
    timestamp: '2026-10-22T15:00:00Z',
    actionUrl: '/erp/procurement',
    domain: 'Procurement',
  },
];

export const mockDashboardData: ErpDashboardData = {
  metrics: {
    pendingPurchaseOrdersCount: 2,
    pendingPurchaseOrdersValue: 37557,
    lowStockItemsCount: 3,
    accountsReceivableTotal: 20611,
    accountsPayableTotal: 51561,
    activeSalesOrdersCount: 3,
    activeSalesOrdersValue: 38880,
    budgetUtilizationRate: 77.1,
    monthlyRevenue: 214500,
  },
  kpis: mockErpKpis,
  recentTransactions: mockRecentTransactions,
  alerts: mockOperationalAlerts,
};
