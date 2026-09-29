import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /dms/dashboard */
const DmsDashboardPage: React.FC = () => (
  <PageShell domain="Document Management" title="DMS Dashboard" description="Document repository overview — uploads, recent activity, and storage metrics." />
);
export default DmsDashboardPage;
