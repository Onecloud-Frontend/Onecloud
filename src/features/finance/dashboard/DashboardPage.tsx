import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /finance/dashboard */
const FinanceDashboardPage: React.FC = () => (
  <PageShell domain="Finance" title="Finance Dashboard" description="Financial health overview — P&L, cash flow, budget vs actuals, and key ratios." />
);
export default FinanceDashboardPage;
