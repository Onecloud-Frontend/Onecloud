/**
 * OneCloud Enterprise ERP — Inventory Hooks
 *
 * Owned by Developer 8 (Products) and Developer 9 (Inventory & Warehouse).
 */

import { useQuery } from '@tanstack/react-query';
import { ERP_QUERY_KEYS } from '../constants/erpQueryKeys';
import { erpInventoryService } from '../services/erpInventoryService';

export const useProducts = () => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.inventory.products,
    queryFn: erpInventoryService.listProducts,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.inventory.product(id),
    queryFn: () => erpInventoryService.getProductById(id),
    enabled: Boolean(id),
  });
};

export const useWarehouses = () => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.inventory.warehouses,
    queryFn: erpInventoryService.listWarehouses,
  });
};

export const useStockBalances = () => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.inventory.stockBalances,
    queryFn: erpInventoryService.getStockBalances,
  });
};

export const useStockMovements = () => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.inventory.stockMovements,
    queryFn: erpInventoryService.getStockMovements,
  });
};

export const useLowStockAlerts = () => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.inventory.lowStockAlerts,
    queryFn: erpInventoryService.getLowStockAlerts,
  });
};
