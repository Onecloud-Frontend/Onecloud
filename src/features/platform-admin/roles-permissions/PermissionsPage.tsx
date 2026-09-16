import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /admin/permissions */
const PermissionsPage: React.FC = () => (
  <PageShell
    domain="Platform Administration"
    title="Permission Management"
    description="Define granular permissions and map them to roles."
  />
);

export default PermissionsPage;
