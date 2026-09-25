import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Target, TrendingUp, Users, type LucideIcon } from 'lucide-react';

interface ReportLink {
  to: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const REPORT_LINKS: ReportLink[] = [
  {
    to: '/crm/reports/leads',
    title: 'Lead Conversion',
    description: 'Conversion funnel with source-wise and owner-wise breakdowns.',
    icon: Users,
  },
  {
    to: '/crm/reports/opportunities',
    title: 'Opportunity Report',
    description: 'Pipeline value, stage distribution and win rate.',
    icon: Target,
  },
  {
    to: '/crm/reports/sales-performance',
    title: 'Sales Performance',
    description: 'Revenue, targets and achievement for each salesperson.',
    icon: TrendingUp,
  },
  {
    to: '/crm/reports/quotations',
    title: 'Quote Analysis',
    description: 'Quote status, approvals, conversion and discounts.',
    icon: FileText,
  },
];

/** Entry points from the Reports Dashboard to each detailed report. */
export const ReportNavCards: React.FC = () => (
  <section>
    <h2 className="mb-3 text-base font-bold text-[#0b1f4d]">Detailed Reports</h2>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {REPORT_LINKS.map(({ to, title, description, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          className="group rounded-xl border border-slate-200/60 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-md"
        >
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-[#0b1f4d] group-hover:text-blue-600">{title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">{description}</p>
        </Link>
      ))}
    </div>
  </section>
);
