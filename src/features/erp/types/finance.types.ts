/**
 * OneCloud Enterprise ERP — Finance & General Ledger Types
 *
 * Owned by Developer 2 (Chart of Accounts), Developer 3 (GL & Journals),
 * and Developer 4 (Budgeting & Expenses).
 */

import { AuditMetadata, CurrencyCode, HrmsEmployeeReference } from './common.types';

export type AccountType = 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';

export type AccountCategory =
  | 'Current Asset'
  | 'Fixed Asset'
  | 'Current Liability'
  | 'Long Term Liability'
  | 'Retained Earnings'
  | 'Operating Revenue'
  | 'Cost of Goods Sold'
  | 'Operating Expense'
  | 'Taxation';

export type AccountStatus = 'Active' | 'Archived' | 'Suspended';

export interface Account {
  id: string;
  code: string;
  name: string;
  type: AccountType;
  category: AccountCategory;
  currency: CurrencyCode;
  currentBalance: number;
  status: AccountStatus;
  description?: string;
  audit: AuditMetadata;
}

export type JournalEntryStatus = 'Draft' | 'Submitted' | 'Posted' | 'Void';

export type JournalLineType = 'Debit' | 'Credit';

export interface JournalLine {
  id: string;
  accountId: string;
  accountCode: string;
  accountName: string;
  type: JournalLineType;
  amount: number;
  description?: string;
}

export interface JournalEntry {
  id: string;
  entryNumber: string;
  date: string;
  reference: string;
  narration: string;
  status: JournalEntryStatus;
  lines: JournalLine[];
  totalDebit: number;
  totalCredit: number;
  periodId: string;
  audit: AuditMetadata;
}

export type BudgetPeriod = 'Monthly' | 'Quarterly' | 'Annual';
export type BudgetStatus = 'Draft' | 'Approved' | 'Active' | 'Closed';

export interface BudgetLine {
  id: string;
  accountId: string;
  accountName: string;
  allocatedAmount: number;
  utilizedAmount: number;
  remainingAmount: number;
}

export interface Budget {
  id: string;
  budgetCode: string;
  name: string;
  department: string;
  fiscalYear: number;
  period: BudgetPeriod;
  totalAllocated: number;
  totalUtilized: number;
  status: BudgetStatus;
  lines: BudgetLine[];
  audit: AuditMetadata;
}

export type ExpenseCategory =
  | 'Travel'
  | 'Software'
  | 'Office Supplies'
  | 'Maintenance'
  | 'Professional Fees'
  | 'Utilities'
  | 'Hardware';

export type ExpenseStatus = 'Draft' | 'Pending' | 'Approved' | 'Reimbursed' | 'Rejected';

export interface Expense {
  id: string;
  expenseNumber: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  currency: CurrencyCode;
  date: string;
  submittedBy: HrmsEmployeeReference;
  status: ExpenseStatus;
  merchant: string;
  accountId: string;
  receiptUrl?: string;
  audit: AuditMetadata;
}

export interface FinancialPeriod {
  id: string;
  periodCode: string;
  startDate: string;
  endDate: string;
  isClosed: boolean;
}

export interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
  operatingCash: number;
  accountsReceivable: number;
  accountsPayable: number;
  currency: CurrencyCode;
  asOfDate: string;
}
