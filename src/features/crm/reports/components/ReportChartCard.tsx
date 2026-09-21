import React, { type ReactNode } from 'react';

interface ReportChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** Height of the chart area as a Tailwind class. */
  heightClass?: string;
}

/** Titled card that gives a chart a fixed-height area so responsive charts can size themselves. */
export const ReportChartCard: React.FC<ReportChartCardProps> = ({
  title,
  subtitle,
  children,
  heightClass = 'h-72',
}) => (
  <div className="flex flex-col rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
    <div className="mb-4">
      <h2 className="text-base font-bold text-[#0b1f4d]">{title}</h2>
      {subtitle && <p className="mt-1 text-xs font-medium text-slate-500">{subtitle}</p>}
    </div>
    <div className={heightClass}>{children}</div>
  </div>
);
