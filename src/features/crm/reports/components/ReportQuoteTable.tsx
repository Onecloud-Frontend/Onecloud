import React from 'react';
import type { QuoteRecord } from '../types/reports.types';
import { formatCurrency, formatDate } from './reportFormatters';
import { usePagination } from '../hooks/usePagination';
import { ReportPagination } from './ReportPagination';

interface ReportQuoteTableProps {
  rows: QuoteRecord[];
  pageSize?: number;
}

const STATUS_BADGE_CLASSES: Record<string, string> = {
  Draft: 'bg-slate-100 text-slate-700',
  Sent: 'bg-sky-100 text-sky-700',
  Accepted: 'bg-emerald-100 text-emerald-700',
  Rejected: 'bg-rose-100 text-rose-700',
  Expired: 'bg-amber-100 text-amber-700',
};

/** Quote list ordered most recent first (the order the caller supplies). */
export const ReportQuoteTable: React.FC<ReportQuoteTableProps> = ({ rows, pageSize = 10 }) => {
  const { pageRows, page, totalPages, setPage } = usePagination(rows, pageSize);

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <h2 className="mb-4 text-base font-bold text-[#0b1f4d]">Quotations</h2>
      <table className="w-full min-w-[680px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            <th className="pb-2 pr-4">Quote #</th>
            <th className="pb-2 pr-4">Customer</th>
            <th className="pb-2 pr-4">Owner</th>
            <th className="pb-2 pr-4">Status</th>
            <th className="pb-2 pr-4">Approval</th>
            <th className="pb-2 pr-4 text-right">Total</th>
            <th className="pb-2 text-right">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {pageRows.map((row) => (
            <tr key={row.id}>
              <td className="py-2.5 pr-4 font-medium text-slate-700">{row.quoteNumber}</td>
              <td className="py-2.5 pr-4 text-slate-600">{row.customer}</td>
              <td className="py-2.5 pr-4 text-slate-600">{row.owner}</td>
              <td className="py-2.5 pr-4">
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_BADGE_CLASSES[row.status]}`}>
                  {row.status}
                </span>
              </td>
              <td className="py-2.5 pr-4 text-slate-600">{row.approvalStatus}</td>
              <td className="py-2.5 pr-4 text-right text-slate-700">{formatCurrency(row.total)}</td>
              <td className="py-2.5 text-right text-slate-600">{formatDate(row.quoteDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReportPagination page={page} totalPages={totalPages} totalItems={rows.length} pageSize={pageSize} onPageChange={setPage} />
    </div>
  );
};
