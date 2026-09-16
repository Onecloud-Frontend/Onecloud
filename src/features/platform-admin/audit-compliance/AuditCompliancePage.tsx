import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /admin/audit-compliance */
const AuditCompliancePage: React.FC = () => (
  <PageShell
    domain="Platform Administration"
    title="Audit & Compliance"
    description="Platform-wide audit logs, activity history, compliance reports, and security events."
  />
);

export default AuditCompliancePage;
