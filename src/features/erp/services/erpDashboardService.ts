/**
 * OneCloud Enterprise ERP — Dashboard Aggregation Service
 *
 * Implements the Page → Hook → Service → Mock architecture.
 * Owned by Developer 1 (ERP Dashboard and Business Overview).
 * Dynamically aggregates live metrics directly from authoritative domain fixtures.
 */

import {
  mockOperationalAlerts,
  mockRecentTransactions,
} from '../mocks/dashboard.mock';
import { mockAccounts, mockBudgets } from '../mocks/finance.mock';
import { mockStockBalances } from '../mocks/inventory.mock';
import { mockPurchaseOrders } from '../mocks/procurement.mock';
import { mockInvoices, mockSalesOrders } from '../mocks/sales.mock';
import type {
  ErpDashboardData,
  ErpDashboardMetrics,
  ErpKpiCardData,
  ErpOperationalAlert,
  ErpTransaction,
} from '../types/dashboard.types';

const simulateDelay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

function calculateLiveDashboardMetrics(): {
  metrics: ErpDashboardMetrics;
  kpis: ErpKpiCardData[];
} {
  // Pending POs: status 'Issued' or 'Partially Received'
  const pendingPOs = mockPurchaseOrders.filter(
    (po) => po.status === 'Issued' || po.status === 'Partially Received'
  );
  const pendingPOCount = pendingPOs.length;
  const pendingPOValue = pendingPOs.reduce((sum, po) => sum + po.totalAmount, 0);

  // Low stock count from live stock balances
  const lowStockCount = mockStockBalances.filter((sb) => sb.isLowStock).length;

  // Outstanding customer receivables
  const customerInvoices = mockInvoices.filter((inv) => inv.type === 'Customer Invoice');
  const outstandingReceivables = customerInvoices.reduce((sum, inv) => sum + inv.amountDue, 0);

  // Supplier payables: Trade AP account (2010) + unpaid vendor bills
  const tradeApAccount = mockAccounts.find((a) => a.code === '2010');
  const vendorBills = mockInvoices.filter((inv) => inv.type === 'Vendor Bill');
  const vendorBillsDue = vendorBills.reduce((sum, inv) => sum + inv.amountDue, 0);
  const accountsPayable = (tradeApAccount?.currentBalance || 0) + vendorBillsDue;

  // Active sales orders: 'Confirmed' or 'In Production'
  const activeSOs = mockSalesOrders.filter(
    (so) => so.status === 'Confirmed' || so.status === 'In Production'
  );
  const activeSOCount = activeSOs.length;
  const activeSOValue = activeSOs.reduce((sum, so) => sum + so.totalAmount, 0);

  // Budget utilization pool
  const totalAllocatedBudget = mockBudgets.reduce((sum, b) => sum + b.totalAllocated, 0);
  const totalUtilizedBudget = mockBudgets.reduce((sum, b) => sum + b.totalUtilized, 0);
  const budgetUtilizationRate =
    totalAllocatedBudget > 0
      ? Number(((totalUtilizedBudget / totalAllocatedBudget) * 100).toFixed(1))
      : 0;

  // Monthly revenue from product revenue account
  const revenueAccount = mockAccounts.find((a) => a.code === '4010');
  const monthlyRevenue = revenueAccount?.currentBalance || 214500;

  const metrics: ErpDashboardMetrics = {
    pendingPurchaseOrdersCount: pendingPOCount,
    pendingPurchaseOrdersValue: pendingPOValue,
    lowStockItemsCount: lowStockCount,
    accountsReceivableTotal: Math.round(outstandingReceivables),
    accountsPayableTotal: Math.round(accountsPayable),
    activeSalesOrdersCount: activeSOCount,
    activeSalesOrdersValue: activeSOValue,
    budgetUtilizationRate,
    monthlyRevenue,
  };

  const kpis: ErpKpiCardData[] = [
    {
      id: 'kpi-po-pending',
      title: 'Pending Purchase Orders',
      value: `$${pendingPOValue.toLocaleString('en-US')}`,
      rawNumericValue: pendingPOValue,
      changePercentage: 12.4,
      changeType: 'increase',
      description: `${pendingPOCount} active orders awaiting fulfillment`,
      category: 'procurement',
    },
    {
      id: 'kpi-low-stock',
      title: 'Low Stock Alerts',
      value: `${lowStockCount} Items`,
      rawNumericValue: lowStockCount,
      changePercentage: 50.0,
      changeType: 'increase',
      description: 'Items below safety threshold',
      category: 'inventory',
    },
    {
      id: 'kpi-receivables',
      title: 'Outstanding Receivables',
      value: `$${Math.round(outstandingReceivables).toLocaleString('en-US')}`,
      rawNumericValue: Math.round(outstandingReceivables),
      changePercentage: -4.2,
      changeType: 'decrease',
      description: 'Includes $17,064 overdue 30+ days',
      category: 'sales',
    },
    {
      id: 'kpi-payables',
      title: 'Supplier Payables (AP)',
      value: `$${Math.round(accountsPayable).toLocaleString('en-US')}`,
      rawNumericValue: Math.round(accountsPayable),
      changePercentage: 8.5,
      changeType: 'increase',
      description: 'Trade vendor obligations due Net 30/45',
      category: 'finance',
    },
    {
      id: 'kpi-sales-orders',
      title: 'Active Sales Pipeline',
      value: `$${activeSOValue.toLocaleString('en-US')}`,
      rawNumericValue: activeSOValue,
      changePercentage: 18.2,
      changeType: 'increase',
      description: `${activeSOCount} orders in production or fulfillment`,
      category: 'sales',
    },
    {
      id: 'kpi-budget-utilization',
      title: 'Q4 Budget Utilization',
      value: `${budgetUtilizationRate}%`,
      rawNumericValue: budgetUtilizationRate,
      changePercentage: 2.1,
      changeType: 'neutral',
      description: `$${totalUtilizedBudget.toLocaleString('en-US')} spent of $${totalAllocatedBudget.toLocaleString('en-US')} pool`,
      category: 'finance',
    },
  ];

  return { metrics, kpis };
}

export const erpDashboardService = {
  /**
   * Retrieves high-level business overview including KPIs, derived metrics,
   * recent ledger/procurement transactions, and system operational alerts.
   * Dynamically aggregates live metrics directly from authoritative domain fixtures.
   */
  async getDashboardData(): Promise<ErpDashboardData> {
    await simulateDelay(300);
    const { metrics, kpis } = calculateLiveDashboardMetrics();

    return {
      metrics,
      kpis,
      recentTransactions: JSON.parse(JSON.stringify(mockRecentTransactions)),
      alerts: JSON.parse(JSON.stringify(mockOperationalAlerts)),
    };
  },

  /**
   * Retrieves standalone KPI card data dynamically derived from live fixtures.
   */
  async getKpis(): Promise<ErpKpiCardData[]> {
    await simulateDelay(250);
    const { kpis } = calculateLiveDashboardMetrics();
    return kpis;
  },

  /**
   * Retrieves chronological enterprise transactions across all ERP modules.
   */
  async getRecentTransactions(): Promise<ErpTransaction[]> {
    await simulateDelay(250);
    return JSON.parse(JSON.stringify(mockRecentTransactions));
  },

  /**
   * Retrieves operational alerts (shortages, overdue invoices, approval bottlenecks).
   */
  async getOperationalAlerts(): Promise<ErpOperationalAlert[]> {
    await simulateDelay(250);
    return JSON.parse(JSON.stringify(mockOperationalAlerts));
  },
};
