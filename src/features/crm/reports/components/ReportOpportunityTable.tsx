import React from 'react';
import type { OpportunityRecord } from '../types/reports.types';
import { formatCurrency, formatDate, formatPercent } from './reportFormatters';

interface ReportOpportunityTableProps {
  rows: OpportunityRecord[];
  /** Caps how many rows render; the export button still downloads the full set. */
  maxRows?: number;
}

const STAGE_BADGE_CLASSES: Record<string, string> = {
  Qualification: 'bg-slate-100 text-slate-700',
  'Needs Analysis': 'bg-sky-100 text-sky-700',
  Proposal: 'bg-amber-100 text-amber-700',
  Negotiation: 'bg-orange-100 text-orange-700',
  Won: 'bg-emerald-100 text-emerald-700',
  Lost: 'bg-rose-100 text-rose-700',
};

/** Opportunity list ordered by expected revenue, highest first. */
export const ReportOpportunityTable: React.FC<ReportOpportunityTableProps> = ({ rows, maxRows = 10 }) => (
  <div className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
    <h2 className="mb-4 text-base font-bold text-[#0b1f4d]">Top Opportunities</h2>
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          <th className="pb-2 pr-4">Opportunity</th>
          <th className="pb-2 pr-4">Customer</th>
          <th className="pb-2 pr-4">Owner</th>
          <th className="pb-2 pr-4">Stage</th>
          <th className="pb-2 pr-4 text-right">Revenue</th>
          <th className="pb-2 pr-4 text-right">Probability</th>
          <th className="pb-2 text-right">Close Date</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {rows.slice(0, maxRows).map((row) => (
          <tr key={row.id}>
            <td className="py-2.5 pr-4 font-medium text-slate-700">{row.name}</td>
            <td className="py-2.5 pr-4 text-slate-600">{row.customer}</td>
            <td className="py-2.5 pr-4 text-slate-600">{row.owner}</td>
            <td className="py-2.5 pr-4">
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STAGE_BADGE_CLASSES[row.stage]}`}>
                {row.stage}
              </span>
            </td>
            <td className="py-2.5 pr-4 text-right text-slate-700">{formatCurrency(row.expectedRevenue)}</td>
            <td className="py-2.5 pr-4 text-right text-slate-600">{formatPercent(row.probability)}</td>
            <td className="py-2.5 text-right text-slate-600">{formatDate(row.expectedCloseDate)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    {rows.length > maxRows && (
      <p className="mt-3 text-xs text-slate-400">
        Showing top {maxRows} of {rows.length} opportunities. Export CSV for the full list.
      </p>
    )}
  </div>
);
