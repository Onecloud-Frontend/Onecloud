import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/shared/components/ui';
import type { PaginatedEmployees } from '../../shared/types/employee.types';

interface EmployeePaginationProps {
  result: PaginatedEmployees;
  onPageChange: (page: number) => void;
}

export const EmployeePagination: React.FC<EmployeePaginationProps> = ({ result, onPageChange }) => {
  const { page, totalPages, total, limit } = result;
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  if (total === 0) return null;

  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs font-medium text-slate-500">
        Showing <span className="text-slate-700">{start}-{end}</span> of{' '}
        <span className="text-slate-700">{total}</span> employees
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <span className="min-w-20 text-center text-xs font-semibold text-slate-600">
          Page {page} of {totalPages}
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
