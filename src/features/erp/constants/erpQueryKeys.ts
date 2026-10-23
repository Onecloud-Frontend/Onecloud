/**
 * OneCloud Enterprise ERP — TanStack Query Keys
 *
 * Centralized, type-safe query keys to ensure proper cache invalidation.
 */

export const ERP_QUERY_KEYS = {
  dashboard: {
    all: ['erp', 'dashboard'] as const,
    kpis: ['erp', 'dashboard', 'kpis'] as const,
    transactions: ['erp', 'dashboard', 'transactions'] as const,
    alerts: ['erp', 'dashboard', 'alerts'] as const,
  },
  procurement: {
    suppliers: ['erp', 'procurement', 'suppliers'] as const,
    supplier: (id: string) => ['erp', 'procurement', 'suppliers', id] as const,
    requisitions: ['erp', 'procurement', 'requisitions'] as const,
    requisition: (id: string) => ['erp', 'procurement', 'requisitions', id] as const,
    purchaseOrders: ['erp', 'procurement', 'purchase-orders'] as const,
    purchaseOrder: (id: string) => ['erp', 'procurement', 'purchase-orders', id] as const,
    goodsReceipts: ['erp', 'procurement', 'goods-receipts'] as const,
  },
  inventory: {
    products: ['erp', 'inventory', 'products'] as const,
    product: (id: string) => ['erp', 'inventory', 'products', id] as const,
    warehouses: ['erp', 'inventory', 'warehouses'] as const,
    stockBalances: ['erp', 'inventory', 'stock-balances'] as const,
    stockMovements: ['erp', 'inventory', 'stock-movements'] as const,
    lowStockAlerts: ['erp', 'inventory', 'low-stock-alerts'] as const,
  },
  sales: {
    orders: ['erp', 'sales', 'orders'] as const,
    order: (id: string) => ['erp', 'sales', 'orders', id] as const,
    invoices: ['erp', 'sales', 'invoices'] as const,
    invoice: (id: string) => ['erp', 'sales', 'invoices', id] as const,
    payments: ['erp', 'sales', 'payments'] as const,
  },
  finance: {
    accounts: ['erp', 'finance', 'accounts'] as const,
    account: (id: string) => ['erp', 'finance', 'accounts', id] as const,
    journalEntries: ['erp', 'finance', 'journal-entries'] as const,
    budgets: ['erp', 'finance', 'budgets'] as const,
    expenses: ['erp', 'finance', 'expenses'] as const,
    summary: ['erp', 'finance', 'summary'] as const,
  },
} as const;
