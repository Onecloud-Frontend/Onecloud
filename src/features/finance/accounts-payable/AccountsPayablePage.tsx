import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /finance/accounts-payable */
const AccountsPayablePage: React.FC = () => (
  <PageShell domain="Finance" title="Accounts Payable" description="Vendor invoices, payment scheduling, aging reports, and payment runs." />
);
export default AccountsPayablePage;
