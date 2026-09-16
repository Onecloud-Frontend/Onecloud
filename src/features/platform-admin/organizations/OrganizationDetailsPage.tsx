import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /admin/organizations/:id */
const OrganizationDetailsPage: React.FC = () => (
  <PageShell
    domain="Platform Administration"
    title="Organization Details"
    description="View and manage individual organization configuration and members."
  />
);

export default OrganizationDetailsPage;
