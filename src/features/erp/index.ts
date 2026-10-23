/**
 * OneCloud Enterprise ERP — Feature Public Contract
 *
 * Adheres to Section 4 of DEVELOPER_GUIDE.md.
 * Exports public route-level page components for app/router and shared contracts.
 */

// ─── Public Route Page Components ──────────────────────────────────────────
export { default as ErpDashboardPage } from './dashboard/DashboardPage';
export { default as ProcurementPage } from './procurement/ProcurementPage';
export { default as VendorsPage } from './vendors/VendorsPage';
export { default as InventoryPage } from './inventory/InventoryPage';
export { default as WarehousePage } from './warehouse/WarehousePage';
export { default as ErpSalesPage } from './sales/SalesPage';

// ─── Public Shared Contracts & Services ────────────────────────────────────
export * from './types';
export * from './services';
export * from './hooks';
export * from './components';
