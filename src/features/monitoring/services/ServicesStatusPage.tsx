import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /monitoring/services */
const ServicesStatusPage: React.FC = () => (
  <PageShell domain="Monitoring & DevOps" title="Service Status" description="Real-time status of all platform microservices, uptime history, and incident tracking." />
);
export default ServicesStatusPage;
