/**
 * OneCloud Enterprise ERP — Inventory, Catalog & Warehouse Service
 *
 * Owned by Developer 8 (Products & Item Catalog) and Developer 9 (Inventory & Warehouse).
 */

import {
  mockLowStockAlerts,
  mockProducts,
  mockStockBalances,
  mockStockMovements,
  mockWarehouses,
} from '../mocks/inventory.mock';
import type {
  LowStockAlert,
  Product,
  StockBalance,
  StockMovement,
  Warehouse,
} from '../types/inventory.types';

const simulateDelay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

export const erpInventoryService = {
  // ─── Products & Catalog ────────────────────────────────────────────────────
  async listProducts(): Promise<Product[]> {
    await simulateDelay(300);
    return JSON.parse(JSON.stringify(mockProducts));
  },

  async getProductById(id: string): Promise<Product> {
    await simulateDelay(250);
    const prod = mockProducts.find((p) => p.id === id);
    if (!prod) throw new Error(`Product ${id} not found.`);
    return JSON.parse(JSON.stringify(prod));
  },

  // ─── Warehouses ────────────────────────────────────────────────────────────
  async listWarehouses(): Promise<Warehouse[]> {
    await simulateDelay(300);
    return JSON.parse(JSON.stringify(mockWarehouses));
  },

  // ─── Stock Balances ────────────────────────────────────────────────────────
  async getStockBalances(): Promise<StockBalance[]> {
    await simulateDelay(300);
    return JSON.parse(JSON.stringify(mockStockBalances));
  },

  async getStockBalancesByWarehouse(warehouseId: string): Promise<StockBalance[]> {
    await simulateDelay(250);
    return JSON.parse(JSON.stringify(mockStockBalances.filter((sb) => sb.warehouseId === warehouseId)));
  },

  // ─── Movements & Alerts ────────────────────────────────────────────────────
  async getStockMovements(): Promise<StockMovement[]> {
    await simulateDelay(300);
    return JSON.parse(JSON.stringify(mockStockMovements));
  },

  async getLowStockAlerts(): Promise<LowStockAlert[]> {
    await simulateDelay(250);
    return JSON.parse(JSON.stringify(mockLowStockAlerts));
  },
};
