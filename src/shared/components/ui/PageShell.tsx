import React from 'react';

interface PageShellProps {
  /** Top-level domain label, e.g. "Platform Administration" */
  domain: string;
  /** Page title within the domain, e.g. "Tenant Management" */
  title: string;
  /** Optional short description of the page's purpose */
  description?: string;
}

/**
 * PageShell
 *
 * Reusable placeholder component used by all feature pages in Phase 1.
 * Renders a clear, identifiable placeholder so every route can be reached and
 * visually confirmed.
 *
 * Will be replaced by real page content in each domain's implementation phase.
 */
const PageShell: React.FC<PageShellProps> = ({ domain, title, description }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
      <div className="max-w-lg w-full text-center">
        {/* Domain badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-4">
          {domain}
        </div>

        {/* Page title */}
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{title}</h1>

        {/* Description */}
        {description && (
          <p className="text-sm text-slate-500 mb-6">{description}</p>
        )}

        {/* Phase indicator */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-xs">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          Foundation phase — implementation pending
        </div>
      </div>
    </div>
  );
};

export default PageShell;
