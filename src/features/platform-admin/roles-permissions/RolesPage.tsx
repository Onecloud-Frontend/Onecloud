import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /admin/roles */
const RolesPage: React.FC = () => (
  <PageShell
    domain="Platform Administration"
    title="Role Management"
    description="Define and manage platform-wide roles and their capability sets."
  />
);

export default RolesPage;
