import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /finance/expenses */
const ExpensesPage: React.FC = () => (
  <PageShell domain="Finance" title="Expense Management" description="Employee expense claims, approvals, reimbursements, and policy enforcement." />
);
export default ExpensesPage;
