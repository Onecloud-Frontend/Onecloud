import React from 'react';

interface ReportKpiCardProps {
  label: string;
  /** Pre-formatted value, e.g. "12.5L" or "32.4%". */
  value: string;
  /** Optional supporting line under the value. */
  caption?: string;
}

/** Single headline metric shown in the summary rows of the report pages. */
export const ReportKpiCard: React.FC<ReportKpiCardProps> = ({ label, value, caption }) => (
  <div className="rounded-xl border border-slate-200/60 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
    <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-slate-500">{label}</h3>
    <p className="text-2xl font-bold tracking-tight text-[#0b1f4d]">{value}</p>
    {caption && <p className="mt-2 text-xs font-medium text-slate-400">{caption}</p>}
  </div>
);
