import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /admin/configuration */
const ConfigurationPage: React.FC = () => (
  <PageShell
    domain="Platform Administration"
    title="Platform Configuration"
    description="Global platform settings, feature flags, and system parameters."
  />
);

export default ConfigurationPage;
