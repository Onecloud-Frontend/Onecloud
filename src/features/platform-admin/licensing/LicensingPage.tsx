import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /admin/licensing */
const LicensingPage: React.FC = () => (
  <PageShell
    domain="Platform Administration"
    title="License Management"
    description="Manage platform licenses, module entitlements, seat counts, and renewals."
  />
);

export default LicensingPage;
