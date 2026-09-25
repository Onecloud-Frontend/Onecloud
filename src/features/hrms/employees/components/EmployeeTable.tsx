import React from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, Eye } from 'lucide-react';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/utils/cn';
import type { Department } from '../../shared/types/department.types';
import type { Designation } from '../../shared/types/designation.types';
import type { Employee } from '../../shared/types/employee.types';
import { EmployeeStatusBadge } from './EmployeeStatusBadge';

interface EmployeeTableProps {
  employees: Employee[];
  departments: Department[];
  designations: Designation[];
  sortBy?: keyof Employee;
  sortOrder?: 'asc' | 'desc';
  onSort: (sortBy: keyof Employee) => void;
  onView: (employeeId: string) => void;
}

interface SortableHeaderProps {
  label: string;
  field: keyof Employee;
  sortBy?: keyof Employee;
  sortOrder?: 'asc' | 'desc';
  onSort: (field: keyof Employee) => void;
  align?: 'left' | 'right';
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  label,
  field,
  sortBy,
  sortOrder,
  onSort,
  align = 'left',
}) => {
  const active = sortBy === field;
  const Icon = !active ? ArrowUpDown : sortOrder === 'asc' ? ArrowUp : ArrowDown;

  return (
    <th className={cn('px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500', align === 'right' && 'text-right')}>
      <button
        type="button"
        onClick={() => onSort(field)}
        className={cn(
          'inline-flex items-center gap-1.5 rounded px-1 py-1 transition-colors hover:bg-slate-100 hover:text-[#0b1f4d]',
          align === 'right' && 'ml-auto',
          active && 'text-[#0b1f4d]',
        )}
        aria-label={`Sort by ${label}`}
      >
        {label}
        <Icon className="h-3.5 w-3.5" />
      </button>
    </th>
  );
};

const employmentTypeLabel = (type: Employee['employmentType']) => {
  switch (type) {
    case 'FULL_TIME':
      return 'Full Time';
    case 'PART_TIME':
      return 'Part Time';
    case 'CONTRACT':
      return 'Contract';
  }
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date));

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  departments,
  designations,
  sortBy,
  sortOrder,
  onSort,
  onView,
}) => {
  const departmentById = new Map(departments.map((department) => [department.id, department.name]));
  const designationById = new Map(designations.map((designation) => [designation.id, designation.title]));

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/70 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-[13px]">
          <thead className="border-b border-slate-100 bg-slate-50/70">
            <tr>
              <SortableHeader label="Employee" field="firstName" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Department</th>
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Designation</th>
              <SortableHeader label="Employment" field="employmentType" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
              <SortableHeader label="Joining Date" field="joiningDate" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
              <SortableHeader label="Status" field="status" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
              <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map((employee) => {
              const fullName = `${employee.firstName} ${employee.lastName}`;
              return (
                <tr key={employee.employeeId} className="group transition-colors hover:bg-slate-50/60">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">
                        {employee.firstName[0]}{employee.lastName[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-[#0b1f4d]">{fullName}</p>
                        <p className="mt-0.5 truncate text-[11px] text-slate-400">{employee.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-600">
                    {departmentById.get(employee.departmentId) ?? '—'}
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-600">
                    {designationById.get(employee.designationId) ?? '—'}
                  </td>
                  <td className="px-5 py-4 text-slate-600">{employmentTypeLabel(employee.employmentType)}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-slate-600">{formatDate(employee.joiningDate)}</td>
                  <td className="px-5 py-4"><EmployeeStatusBadge status={employee.status} /></td>
                  <td className="px-5 py-4 text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="text-slate-400 hover:text-[#0b1f4d]"
                      onClick={() => onView(employee.employeeId)}
                      aria-label={`View ${fullName}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
