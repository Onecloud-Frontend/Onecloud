import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /workflow/dashboard */
const WorkflowDashboardPage: React.FC = () => (
  <PageShell domain="Workflow" title="Workflow Dashboard" description="Active processes, approval queues, automation rules, and workflow analytics." />
);
export default WorkflowDashboardPage;
