import React, { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface ReportPageHeaderProps {
  title: string;
  description: string;
  /** Shows a link back to the Reports Dashboard; used by the individual report pages. */
  showBack?: boolean;
  /** Right-aligned slot for page-level actions such as export. */
  actions?: ReactNode;
}

export const ReportPageHeader: React.FC<ReportPageHeaderProps> = ({
  title,
  description,
  showBack = false,
  actions,
}) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      {showBack && (
        <Link
          to="/crm/reports"
          className="mb-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Reports
        </Link>
      )}
      <h1 className="text-2xl font-bold tracking-tight text-[#0b1f4d]">{title}</h1>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
    {actions && <div className="flex items-center gap-3">{actions}</div>}
  </div>
);
