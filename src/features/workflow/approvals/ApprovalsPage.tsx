import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /workflow/approvals */
const ApprovalsPage: React.FC = () => (
  <PageShell domain="Workflow" title="Approval Engine" description="Manage approval chains, pending approvals, escalation rules, and delegation." />
);
export default ApprovalsPage;
