import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/shared/components/ui';

interface JobRequisitionPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export const JobRequisitionPagination: React.FC<JobRequisitionPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onLimitChange,
}) => {
  if (totalItems === 0) return null;

  const start = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200/70 bg-white px-5 py-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:flex-row sm:items-center sm:justify-between">
      {/* Items count range & limit selector */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <p>
          Showing <span className="font-semibold text-slate-800">{start}–{end}</span> of{' '}
          <span className="font-semibold text-slate-800">{totalItems}</span> requisitions
        </p>

        <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
          <label htmlFor="req-page-limit" className="text-[11px] text-slate-500">
            Per page:
          </label>
          <select
            id="req-page-limit"
            value={itemsPerPage}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="h-7 rounded border border-slate-300 bg-white px-2 text-xs text-slate-700 outline-none transition focus:border-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Pagination navigation */}
      <div className="flex items-center gap-1.5 self-end sm:self-auto">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="h-8 gap-1 px-2.5 text-xs text-slate-700"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`h-8 min-w-8 rounded px-2 text-xs font-semibold transition-colors ${
                pageNum === currentPage
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="h-8 gap-1 px-2.5 text-xs text-slate-700"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};
