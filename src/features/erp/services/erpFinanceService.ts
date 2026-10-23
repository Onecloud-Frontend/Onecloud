/**
 * OneCloud Enterprise ERP — Finance, Chart of Accounts & General Ledger Service
 *
 * Owned by Developer 2 (Chart of Accounts), Developer 3 (GL & Journals),
 * and Developer 4 (Budgeting & Expenses).
 */

import {
  mockAccounts,
  mockBudgets,
  mockExpenses,
  mockFinancialSummary,
  mockJournalEntries,
} from '../mocks/finance.mock';
import type {
  Account,
  Budget,
  Expense,
  FinancialSummary,
  JournalEntry,
} from '../types/finance.types';

const simulateDelay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

export const erpFinanceService = {
  // ─── Chart of Accounts ─────────────────────────────────────────────────────
  async listAccounts(): Promise<Account[]> {
    await simulateDelay(300);
    return JSON.parse(JSON.stringify(mockAccounts));
  },

  async getAccountById(id: string): Promise<Account> {
    await simulateDelay(250);
    const acc = mockAccounts.find((a) => a.id === id);
    if (!acc) throw new Error(`Account ${id} not found.`);
    return JSON.parse(JSON.stringify(acc));
  },

  // ─── Journal Entries ───────────────────────────────────────────────────────
  async listJournalEntries(): Promise<JournalEntry[]> {
    await simulateDelay(300);
    return JSON.parse(JSON.stringify(mockJournalEntries));
  },

  async createJournalEntry(
    data: Omit<JournalEntry, 'id' | 'audit'>
  ): Promise<JournalEntry> {
    await simulateDelay(400);

    // Validate double-entry equality
    if (Math.abs(data.totalDebit - data.totalCredit) > 0.001) {
      throw new Error(
        `Journal Entry is out of balance. Debits ($${data.totalDebit}) must equal Credits ($${data.totalCredit}).`
      );
    }

    const newEntry: JournalEntry = {
      ...data,
      id: `JE-2026-${String(mockJournalEntries.length + 1).padStart(3, '0')}`,
      audit: {
        createdAt: new Date().toISOString(),
        createdBy: 'finance-clerk',
      },
    };
    mockJournalEntries.push(newEntry);
    return JSON.parse(JSON.stringify(newEntry));
  },

  // ─── Budgets & Expenses ────────────────────────────────────────────────────
  async listBudgets(): Promise<Budget[]> {
    await simulateDelay(300);
    return JSON.parse(JSON.stringify(mockBudgets));
  },

  async listExpenses(): Promise<Expense[]> {
    await simulateDelay(300);
    return JSON.parse(JSON.stringify(mockExpenses));
  },

  // ─── Summary ───────────────────────────────────────────────────────────────
  async getFinancialSummary(): Promise<FinancialSummary> {
    await simulateDelay(250);
    return JSON.parse(JSON.stringify(mockFinancialSummary));
  },
};
