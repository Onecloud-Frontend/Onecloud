import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/shared/utils/cn';
import type { ErpOperationalAlert } from '../types/dashboard.types';

export interface ErpAlertListProps {
  alerts: ErpOperationalAlert[];
}

export const ErpAlertList: React.FC<ErpAlertListProps> = ({ alerts }) => {
  const severityConfig = {
    critical: {
      icon: AlertCircle,
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-800',
      iconColor: 'text-rose-600',
      badge: 'bg-rose-100 text-rose-700',
    },
    high: {
      icon: AlertTriangle,
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      iconColor: 'text-amber-600',
      badge: 'bg-amber-100 text-amber-700',
    },
    medium: {
      icon: Info,
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      text: 'text-sky-800',
      iconColor: 'text-sky-600',
      badge: 'bg-sky-100 text-sky-700',
    },
    low: {
      icon: CheckCircle2,
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      text: 'text-slate-800',
      iconColor: 'text-slate-500',
      badge: 'bg-slate-100 text-slate-700',
    },
  };

  return (
    <div className="space-y-3">
      {alerts.map((alert) => {
        const config = severityConfig[alert.severity] || severityConfig.medium;
        const Icon = config.icon;

        return (
          <div
            key={alert.id}
            className={cn(
              'flex items-start gap-3.5 rounded-xl border p-4 transition-all hover:shadow-xs',
              config.bg,
              config.border
            )}
          >
            <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', config.iconColor)} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={cn('rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider', config.badge)}>
                  {alert.severity}
                </span>
                <span className="text-[11px] font-medium text-slate-500">{alert.domain}</span>
                <span className="text-xs font-semibold text-slate-900 truncate">{alert.title}</span>
              </div>
              <p className={cn('mt-1 text-xs leading-relaxed', config.text)}>{alert.message}</p>
            </div>
            {alert.actionUrl && (
              <NavLink
                to={alert.actionUrl}
                className="shrink-0 text-xs font-semibold text-slate-700 hover:text-slate-950 underline underline-offset-2"
              >
                Resolve →
              </NavLink>
            )}
          </div>
        );
      })}
    </div>
  );
};
