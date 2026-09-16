import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /admin/authentication-security */
const AuthenticationSecurityPage: React.FC = () => (
  <PageShell
    domain="Platform Administration"
    title="Authentication & Security"
    description="Configure OAuth2 providers, MFA policies, session timeouts, and security rules."
  />
);

export default AuthenticationSecurityPage;
