import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /security/dashboard */
const SecurityDashboardPage: React.FC = () => (
  <PageShell domain="Security & Compliance" title="Security Dashboard" description="Platform security posture, active threats, compliance status, and risk indicators." />
);
export default SecurityDashboardPage;
