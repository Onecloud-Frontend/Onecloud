import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /admin/tenants/:id */
const TenantDetailsPage: React.FC = () => (
  <PageShell
    domain="Platform Administration"
    title="Tenant Details"
    description="View and manage individual tenant configuration, limits, and users."
  />
);

export default TenantDetailsPage;
