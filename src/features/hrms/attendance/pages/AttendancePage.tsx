import React from 'react';
import PageShell from '@/shared/components/ui/PageShell';

/** Route: /hrms/attendance */
const AttendancePage: React.FC = () => (
  <PageShell domain="HRMS" title="Attendance Management" description="Daily attendance tracking, clock-in/out records, shifts, and scheduling." />
);
export default AttendancePage;
