/**
 * OneCloud Enterprise ERP — Sales & Billing Hooks
 *
 * Owned by Developer 10 (Sales Orders) and Developer 11 (Invoices & Billing).
 */

import { useQuery } from '@tanstack/react-query';
import { ERP_QUERY_KEYS } from '../constants/erpQueryKeys';
import { erpSalesService } from '../services/erpSalesService';

export const useSalesOrders = () => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.sales.orders,
    queryFn: erpSalesService.listSalesOrders,
  });
};

export const useSalesOrder = (id: string) => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.sales.order(id),
    queryFn: () => erpSalesService.getSalesOrderById(id),
    enabled: Boolean(id),
  });
};

export const useInvoices = () => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.sales.invoices,
    queryFn: erpSalesService.listInvoices,
  });
};

export const useInvoice = (id: string) => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.sales.invoice(id),
    queryFn: () => erpSalesService.getInvoiceById(id),
    enabled: Boolean(id),
  });
};

export const usePayments = () => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.sales.payments,
    queryFn: erpSalesService.listPayments,
  });
};
