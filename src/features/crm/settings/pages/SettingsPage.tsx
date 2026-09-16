import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /crm/settings */
const CrmSettingsPage: React.FC = () => (
  <PageShell domain="CRM" title="CRM Settings" description="Configure pipelines, lead sources, custom fields, and general CRM preferences." />
);
export default CrmSettingsPage;
