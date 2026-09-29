import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /hrms/dashboard */
const HrmsDashboardPage: React.FC = () => (
  <PageShell domain="HRMS" title="HRMS Dashboard" description="Human Resource Management overview — headcount, attendance, leave, and payroll summaries." />
);
export default HrmsDashboardPage;
