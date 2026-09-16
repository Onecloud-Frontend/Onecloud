import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /finance/accounts-receivable */
const AccountsReceivablePage: React.FC = () => (
  <PageShell domain="Finance" title="Accounts Receivable" description="Customer invoicing, collections, aging, and cash application." />
);
export default AccountsReceivablePage;
