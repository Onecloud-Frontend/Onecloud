import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /finance/general-ledger */
const GeneralLedgerPage: React.FC = () => (
  <PageShell domain="Finance" title="General Ledger" description="Chart of accounts, journal entries, trial balance, and ledger reports." />
);
export default GeneralLedgerPage;
