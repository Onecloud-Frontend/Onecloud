/**
 * OneCloud Enterprise ERP — Dashboard & KPI Aggregation Types
 *
 * Owned by Developer 1 (ERP Dashboard & Overview) and consumed by Developer 12.
 */

export interface ErpKpiCardData {
  id: string;
  title: string;
  value: string;
  rawNumericValue: number;
  changePercentage: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  description: string;
  category: 'procurement' | 'inventory' | 'finance' | 'sales';
}

export interface ErpDashboardMetrics {
  pendingPurchaseOrdersCount: number;
  pendingPurchaseOrdersValue: number;
  lowStockItemsCount: number;
  accountsReceivableTotal: number;
  accountsPayableTotal: number;
  activeSalesOrdersCount: number;
  activeSalesOrdersValue: number;
  budgetUtilizationRate: number;
  monthlyRevenue: number;
}

export interface ErpTransaction {
  id: string;
  transactionNumber: string;
  type: 'Purchase Order' | 'Sales Order' | 'Invoice' | 'Payment' | 'GRN';
  partyName: string;
  amount: number;
  date: string;
  status: string;
  statusVariant: 'success' | 'warning' | 'info' | 'danger' | 'neutral';
}

export interface ErpOperationalAlert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  actionUrl: string;
  domain: 'Procurement' | 'Inventory' | 'Finance' | 'Sales';
}

export interface ErpDashboardData {
  metrics: ErpDashboardMetrics;
  kpis: ErpKpiCardData[];
  recentTransactions: ErpTransaction[];
  alerts: ErpOperationalAlert[];
}
