import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /hrms/employees/:id */
const EmployeeDetailsPage: React.FC = () => (
  <PageShell domain="HRMS" title="Employee Details" description="View and manage individual employee profile, documents, and history." />
);
export default EmployeeDetailsPage;
