import React from 'react';
import type { SalespersonPerformance } from '../types/reports.types';
import { formatCompactCurrency, formatNumber, formatPercent } from './reportFormatters';

interface ReportPerformanceTableProps {
  rows: SalespersonPerformance[];
}

/** Per-salesperson performance table, ordered by revenue (the order the caller supplies). */
export const ReportPerformanceTable: React.FC<ReportPerformanceTableProps> = ({ rows }) => (
  <div className="overflow-x-auto rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
    <h2 className="mb-4 text-base font-bold text-[#0b1f4d]">Salesperson Performance</h2>
    <table className="w-full min-w-[720px] text-left text-sm">
      <thead>
        <tr className="border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          <th className="pb-2 pr-4">Salesperson</th>
          <th className="pb-2 pr-4">Team</th>
          <th className="pb-2 pr-4 text-right">Leads</th>
          <th className="pb-2 pr-4 text-right">Opportunities</th>
          <th className="pb-2 pr-4 text-right">Won</th>
          <th className="pb-2 pr-4 text-right">Revenue</th>
          <th className="pb-2 pr-4 text-right">Win Rate</th>
          <th className="pb-2 pr-4 text-right">Target</th>
          <th className="pb-2 text-right">Achievement</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {rows.map((row) => (
          <tr key={row.salesperson}>
            <td className="py-2.5 pr-4 font-medium text-slate-700">{row.salesperson}</td>
            <td className="py-2.5 pr-4 text-slate-600">{row.team}</td>
            <td className="py-2.5 pr-4 text-right text-slate-600">{formatNumber(row.leads)}</td>
            <td className="py-2.5 pr-4 text-right text-slate-600">{formatNumber(row.opportunities)}</td>
            <td className="py-2.5 pr-4 text-right text-slate-600">{formatNumber(row.wonOpportunities)}</td>
            <td className="py-2.5 pr-4 text-right text-slate-700">{formatCompactCurrency(row.revenue)}</td>
            <td className="py-2.5 pr-4 text-right text-slate-600">{formatPercent(row.winRate)}</td>
            <td className="py-2.5 pr-4 text-right text-slate-600">{formatCompactCurrency(row.target)}</td>
            <td
              className={`py-2.5 text-right font-semibold ${
                row.achievement >= 100 ? 'text-emerald-600' : 'text-slate-700'
              }`}
            >
              {formatPercent(row.achievement)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
