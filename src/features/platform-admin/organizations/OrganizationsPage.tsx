import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /admin/organizations */
const OrganizationsPage: React.FC = () => (
  <PageShell
    domain="Platform Administration"
    title="Organization Management"
    description="Manage organizations within tenants — hierarchy, branding, settings."
  />
);

export default OrganizationsPage;
