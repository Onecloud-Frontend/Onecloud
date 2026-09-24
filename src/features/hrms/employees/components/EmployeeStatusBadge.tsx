import React from 'react';
import { cn } from '@/shared/utils/cn';
import type { Employee } from '../../shared/types/employee.types';

const STATUS_STYLES: Record<Employee['status'], string> = {
  ACTIVE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  PROBATION: 'bg-amber-50 text-amber-700 border-amber-200',
  TERMINATED: 'bg-rose-50 text-rose-700 border-rose-200',
  ON_LEAVE: 'bg-blue-50 text-blue-700 border-blue-200',
};

const STATUS_LABELS: Record<Employee['status'], string> = {
  ACTIVE: 'Active',
  PROBATION: 'Probation',
  TERMINATED: 'Terminated',
  ON_LEAVE: 'On Leave',
};

interface EmployeeStatusBadgeProps {
  status: Employee['status'];
}

export const EmployeeStatusBadge: React.FC<EmployeeStatusBadgeProps> = ({ status }) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold',
      STATUS_STYLES[status],
    )}
  >
    {STATUS_LABELS[status]}
  </span>
);

export const employeeStatusLabel = (status: Employee['status']) => STATUS_LABELS[status];
