import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /hrms/leave */
const LeavePage: React.FC = () => (
  <PageShell domain="HRMS" title="Leave Management" description="Leave requests, approvals, balances, and leave policy configuration." />
);
export default LeavePage;
