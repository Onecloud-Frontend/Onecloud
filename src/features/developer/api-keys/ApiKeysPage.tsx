import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /developer/api-keys */
const ApiKeysPage: React.FC = () => (
  <PageShell domain="Developer Platform" title="API Keys" description="Manage API keys, scopes, rate limits, and access tokens for integrations." />
);
export default ApiKeysPage;
