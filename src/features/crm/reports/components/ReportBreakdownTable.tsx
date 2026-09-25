import React from 'react';
import type { ConversionBreakdownRow } from '../types/reports.types';
import { formatNumber, formatPercent } from './reportFormatters';

interface ReportBreakdownTableProps {
  title: string;
  /** Header for the first column, e.g. "Source" or "Owner". */
  nameHeader: string;
  rows: ConversionBreakdownRow[];
}

/** Small table used for the source-wise and owner-wise conversion breakdowns. */
export const ReportBreakdownTable: React.FC<ReportBreakdownTableProps> = ({ title, nameHeader, rows }) => (
  <div className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
    <h2 className="mb-4 text-base font-bold text-[#0b1f4d]">{title}</h2>
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          <th className="pb-2 pr-4">{nameHeader}</th>
          <th className="pb-2 pr-4 text-right">Total</th>
          <th className="pb-2 pr-4 text-right">Converted</th>
          <th className="pb-2 text-right">Rate</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {rows.map((row) => (
          <tr key={row.name}>
            <td className="py-2.5 pr-4 font-medium text-slate-700">{row.name}</td>
            <td className="py-2.5 pr-4 text-right text-slate-600">{formatNumber(row.total)}</td>
            <td className="py-2.5 pr-4 text-right text-slate-600">{formatNumber(row.converted)}</td>
            <td className="py-2.5 text-right font-semibold text-slate-700">{formatPercent(row.conversionRate)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
