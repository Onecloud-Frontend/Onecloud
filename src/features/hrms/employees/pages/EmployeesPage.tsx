import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /hrms/employees */
const EmployeesPage: React.FC = () => (
  <PageShell domain="HRMS" title="Employee Management" description="Employee directory, profiles, onboarding, and lifecycle management." />
);
export default EmployeesPage;
