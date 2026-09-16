import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /hrms/ess */
const EmployeeSelfServicePage: React.FC = () => (
  <PageShell domain="HRMS" title="Employee Self-Service" description="Employee portal for leave requests, payslips, personal info updates, and announcements." />
);
export default EmployeeSelfServicePage;
