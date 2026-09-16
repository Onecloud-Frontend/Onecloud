import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /admin/users */
const UsersPage: React.FC = () => (
  <PageShell
    domain="Platform Administration"
    title="User Management"
    description="View and manage all platform users across tenants."
  />
);

export default UsersPage;
