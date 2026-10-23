import React from 'react';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import type { ErpKpiCardData } from '../types/dashboard.types';

export interface ErpKpiCardProps {
  data: ErpKpiCardData;
  icon?: React.ReactNode;
}

export const ErpKpiCard: React.FC<ErpKpiCardProps> = ({ data, icon }) => {
  const { title, value, changePercentage, changeType, description, category } = data;

  const categoryColor = {
    procurement: 'text-purple-600 bg-purple-50 border-purple-100',
    inventory: 'text-amber-600 bg-amber-50 border-amber-100',
    finance: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    sales: 'text-blue-600 bg-blue-50 border-blue-100',
  }[category] || 'text-slate-600 bg-slate-50 border-slate-100';

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-slate-300 hover:shadow-sm">
      <div className="flex items-center justify-between">
        <span className={cn('rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider', categoryColor)}>
          {category}
        </span>
        {icon && <div className="text-slate-400">{icon}</div>}
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{title}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
        <p className="text-xs text-slate-500 truncate max-w-[180px]">{description}</p>
        {changePercentage !== undefined && (
          <div
            className={cn(
              'inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium',
              changeType === 'increase' && 'bg-emerald-50 text-emerald-700',
              changeType === 'decrease' && 'bg-rose-50 text-rose-700',
              changeType === 'neutral' && 'bg-slate-100 text-slate-700'
            )}
          >
            {changeType === 'increase' && <ArrowUpRight className="h-3 w-3" />}
            {changeType === 'decrease' && <ArrowDownRight className="h-3 w-3" />}
            {changeType === 'neutral' && <Minus className="h-3 w-3" />}
            {Math.abs(changePercentage)}%
          </div>
        )}
      </div>
    </div>
  );
};
