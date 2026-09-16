import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /admin/tenants */
const TenantsPage: React.FC = () => (
  <PageShell
    domain="Platform Administration"
    title="Tenant Management"
    description="Create, configure, suspend, and manage all platform tenants."
  />
);

export default TenantsPage;
