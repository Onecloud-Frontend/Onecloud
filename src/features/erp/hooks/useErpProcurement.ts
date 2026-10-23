/**
 * OneCloud Enterprise ERP — Procurement Hooks
 *
 * Owned by Developer 5, 6, and 7.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ERP_QUERY_KEYS } from '../constants/erpQueryKeys';
import { erpProcurementService } from '../services/erpProcurementService';
import type { HrmsEmployeeReference } from '../types/common.types';
import type { PurchaseRequisition } from '../types/procurement.types';

export const useSuppliers = () => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.procurement.suppliers,
    queryFn: erpProcurementService.listSuppliers,
  });
};

export const useSupplier = (id: string) => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.procurement.supplier(id),
    queryFn: () => erpProcurementService.getSupplierById(id),
    enabled: Boolean(id),
  });
};

export const useRequisitions = () => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.procurement.requisitions,
    queryFn: erpProcurementService.listRequisitions,
  });
};

export const usePurchaseOrders = () => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.procurement.purchaseOrders,
    queryFn: erpProcurementService.listPurchaseOrders,
  });
};

export const useGoodsReceipts = () => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.procurement.goodsReceipts,
    queryFn: erpProcurementService.listGoodsReceipts,
  });
};

export const useCreateRequisition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<PurchaseRequisition, 'id' | 'audit'>) =>
      erpProcurementService.createRequisition(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ERP_QUERY_KEYS.procurement.requisitions });
      queryClient.invalidateQueries({ queryKey: ERP_QUERY_KEYS.dashboard.all });
    },
  });
};

export const useApproveRequisition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, approver }: { id: string; approver: HrmsEmployeeReference }) =>
      erpProcurementService.approveRequisition(id, approver),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ERP_QUERY_KEYS.procurement.requisitions });
      queryClient.invalidateQueries({ queryKey: ERP_QUERY_KEYS.dashboard.all });
    },
  });
};
