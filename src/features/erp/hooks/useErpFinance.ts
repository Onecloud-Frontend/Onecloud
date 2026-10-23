/**
 * OneCloud Enterprise ERP — Finance & General Ledger Hooks
 *
 * Owned by Developer 2, 3, and 4.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ERP_QUERY_KEYS } from '../constants/erpQueryKeys';
import { erpFinanceService } from '../services/erpFinanceService';
import type { JournalEntry } from '../types/finance.types';

export const useAccounts = () => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.finance.accounts,
    queryFn: erpFinanceService.listAccounts,
  });
};

export const useAccount = (id: string) => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.finance.account(id),
    queryFn: () => erpFinanceService.getAccountById(id),
    enabled: Boolean(id),
  });
};

export const useJournalEntries = () => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.finance.journalEntries,
    queryFn: erpFinanceService.listJournalEntries,
  });
};

export const useBudgets = () => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.finance.budgets,
    queryFn: erpFinanceService.listBudgets,
  });
};

export const useExpenses = () => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.finance.expenses,
    queryFn: erpFinanceService.listExpenses,
  });
};

export const useFinancialSummary = () => {
  return useQuery({
    queryKey: ERP_QUERY_KEYS.finance.summary,
    queryFn: erpFinanceService.getFinancialSummary,
  });
};

export const useCreateJournalEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<JournalEntry, 'id' | 'audit'>) =>
      erpFinanceService.createJournalEntry(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ERP_QUERY_KEYS.finance.journalEntries });
      queryClient.invalidateQueries({ queryKey: ERP_QUERY_KEYS.finance.accounts });
      queryClient.invalidateQueries({ queryKey: ERP_QUERY_KEYS.finance.summary });
      queryClient.invalidateQueries({ queryKey: ERP_QUERY_KEYS.dashboard.all });
    },
  });
};
