/**
 * OneCloud Enterprise ERP — Products, Warehouse & Inventory Types
 *
 * Owned by Developer 8 (Products & Catalog) and Developer 9 (Inventory & Warehousing).
 */

import { AuditMetadata, HrmsEmployeeReference } from './common.types';

export type ProductCategory =
  | 'Raw Materials'
  | 'Components'
  | 'Finished Goods'
  | 'MRO Supplies'
  | 'Packaging';

export type UnitOfMeasure =
  | 'Units'
  | 'Pieces'
  | 'Kg'
  | 'Meters'
  | 'Liters'
  | 'Boxes'
  | 'Pallets';

export type ProductStatus = 'Active' | 'Discontinued' | 'Out of Stock';

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: ProductCategory;
  uom: UnitOfMeasure;
  unitCost: number;
  unitPrice: number;
  reorderPoint: number;
  safetyStock: number;
  status: ProductStatus;
  audit: AuditMetadata;
}

export type WarehouseType =
  | 'Distribution Center'
  | 'Manufacturing Facility'
  | 'Cold Storage'
  | 'Regional Hub';

export type WarehouseStatus = 'Active' | 'Under Maintenance' | 'Closed';

export interface Warehouse {
  id: string;
  code: string;
  name: string;
  type: WarehouseType;
  location: string;
  manager: string;
  capacityUtilization: number; // percentage 0 - 100
  status: WarehouseStatus;
  audit: AuditMetadata;
}

export interface StockBalance {
  id: string;
  productId: string;
  productSku: string;
  productName: string;
  warehouseId: string;
  warehouseName: string;
  quantityOnHand: number;
  quantityReserved: number;
  quantityAvailable: number;
  reorderPoint: number;
  isLowStock: boolean;
  lastCountDate: string;
}

export type StockMovementType =
  | 'Receipt (GRN)'
  | 'Fulfillment (SO)'
  | 'Transfer In'
  | 'Transfer Out'
  | 'Scrap Adjustment'
  | 'Cycle Count Correction';

export interface StockMovement {
  id: string;
  movementNumber: string;
  date: string;
  type: StockMovementType;
  productId: string;
  productSku: string;
  productName: string;
  fromLocation?: string;
  toLocation?: string;
  quantity: number;
  referenceDoc: string;
  performedBy: HrmsEmployeeReference;
  notes?: string;
}

export interface LowStockAlert {
  productId: string;
  productSku: string;
  productName: string;
  warehouseId: string;
  warehouseName: string;
  currentStock: number;
  reorderPoint: number;
  shortage: number;
  suggestedOrderQuantity: number;
}
