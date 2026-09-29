import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /monitoring/dashboard */
const MonitoringDashboardPage: React.FC = () => (
  <PageShell domain="Monitoring & DevOps" title="System Monitoring" description="Platform health, service status, API performance, error rates, and infrastructure metrics." />
);
export default MonitoringDashboardPage;
