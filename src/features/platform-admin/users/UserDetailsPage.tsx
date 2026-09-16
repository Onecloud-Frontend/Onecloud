import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /admin/users/:id */
const UserDetailsPage: React.FC = () => (
  <PageShell
    domain="Platform Administration"
    title="User Details"
    description="View and manage individual user profile, roles, and session history."
  />
);

export default UserDetailsPage;
