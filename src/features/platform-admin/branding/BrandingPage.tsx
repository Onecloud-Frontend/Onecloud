import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /admin/branding */
const BrandingPage: React.FC = () => (
  <PageShell
    domain="Platform Administration"
    title="Platform Branding"
    description="Manage white-label configuration, logos, color themes, and email templates."
  />
);

export default BrandingPage;
