import React from 'react';
import { DashboardMetric } from '../types/dashboard.types';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface MetricCardProps {
  data: DashboardMetric;
}

export const MetricCard: React.FC<MetricCardProps> = ({ data }) => {
  const isPositive = data.trend >= 0;

  const formattedValue = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 1,
    notation: data.value > 10000 ? 'compact' : 'standard',
  }).format(data.value);

  return (
    <div className="bg-white rounded-xl border border-slate-200/60 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-sm">
      <h3 className="text-[13px] font-semibold text-slate-500 uppercase tracking-wide mb-3">
        {data.label}
      </h3>
      
      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-1">
          {data.prefix && <span className="text-xl font-medium text-slate-400">{data.prefix}</span>}
          <span className="text-2xl font-bold tracking-tight text-[#0b1f4d]">{formattedValue}</span>
          {data.suffix && <span className="text-xl font-medium text-slate-400">{data.suffix}</span>}
        </div>
        
        <div 
          className={cn(
            "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
            isPositive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
          )}
        >
          {isPositive ? (
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          )}
          <span>{Math.abs(data.trend)}%</span>
        </div>
      </div>
      
      <p className="mt-2 text-xs text-slate-400 font-medium">
        {data.trendLabel}
      </p>
    </div>
  );
};
