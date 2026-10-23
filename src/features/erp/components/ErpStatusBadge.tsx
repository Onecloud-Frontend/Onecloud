import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface ErpStatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  className?: string;
}

export const ErpStatusBadge: React.FC<ErpStatusBadgeProps> = ({
  status,
  variant,
  className,
}) => {
  // Infer variant from status string if not explicitly passed
  const resolvedVariant =
    variant ||
    (() => {
      const s = status.toLowerCase();
      if (['approved', 'verified', 'paid', 'active', 'reconciled', 'fulfilled', 'posted'].some((k) => s.includes(k))) {
        return 'success';
      }
      if (['pending', 'submitted', 'partially', 'partial', 'in production', 'draft'].some((k) => s.includes(k))) {
        return 'warning';
      }
      if (['overdue', 'cancelled', 'rejected', 'failed', 'void', 'discrepancy'].some((k) => s.includes(k))) {
        return 'danger';
      }
      if (['issued', 'confirmed'].some((k) => s.includes(k))) {
        return 'info';
      }
      return 'neutral';
    })();

  const variantStyles = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-600/20',
    warning: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-600/20',
    danger: 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-600/20',
    info: 'bg-sky-50 text-sky-700 border-sky-200 ring-sky-600/20',
    neutral: 'bg-slate-50 text-slate-700 border-slate-200 ring-slate-600/20',
  };

  const dotStyles = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-sky-500',
    neutral: 'bg-slate-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide',
        variantStyles[resolvedVariant],
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', dotStyles[resolvedVariant])} />
      {status}
    </span>
  );
};
