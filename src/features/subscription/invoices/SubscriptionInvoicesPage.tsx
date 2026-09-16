import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /subscription/invoices */
const SubscriptionInvoicesPage: React.FC = () => (
  <PageShell domain="Subscription Management" title="Subscription Invoices" description="Recurring billing invoices, payment history, and dunning management." />
);
export default SubscriptionInvoicesPage;
