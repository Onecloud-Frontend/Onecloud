import React from 'react';
import { 
  Palmtree, 
  HeartPulse, 
  Coffee, 
  Briefcase, 
  Baby, 
  Calendar,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { LeaveBalance, LeaveType } from '../../shared/types/leave.types';

interface LeaveBalanceCardsProps {
  balances: LeaveBalance[];
}

const getLeaveIcon = (type: LeaveType) => {
  switch (type) {
    case 'annual':
      return <Palmtree className="h-5 w-5" />;
    case 'sick':
      return <HeartPulse className="h-5 w-5" />;
    case 'casual':
      return <Coffee className="h-5 w-5" />;
    case 'compensatory':
      return <Briefcase className="h-5 w-5" />;
    case 'maternity':
    case 'paternity':
      return <Baby className="h-5 w-5" />;
    default:
      return <Calendar className="h-5 w-5" />;
  }
};

const colorVariants: Record<string, {
  bgLight: string;
  text: string;
  badgeBg: string;
  badgeText: string;
  progressFill: string;
  borderHover: string;
}> = {
  blue: {
    bgLight: 'bg-blue-50/70',
    text: 'text-blue-600',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
    progressFill: 'bg-blue-600',
    borderHover: 'hover:border-blue-300',
  },
  rose: {
    bgLight: 'bg-rose-50/70',
    text: 'text-rose-600',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-700',
    progressFill: 'bg-rose-600',
    borderHover: 'hover:border-rose-300',
  },
  amber: {
    bgLight: 'bg-amber-50/70',
    text: 'text-amber-600',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
    progressFill: 'bg-amber-600',
    borderHover: 'hover:border-amber-300',
  },
  emerald: {
    bgLight: 'bg-emerald-50/70',
    text: 'text-emerald-600',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
    progressFill: 'bg-emerald-600',
    borderHover: 'hover:border-emerald-300',
  },
  purple: {
    bgLight: 'bg-purple-50/70',
    text: 'text-purple-600',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-700',
    progressFill: 'bg-purple-600',
    borderHover: 'hover:border-purple-300',
  },
  indigo: {
    bgLight: 'bg-indigo-50/70',
    text: 'text-indigo-600',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-700',
    progressFill: 'bg-indigo-600',
    borderHover: 'hover:border-indigo-300',
  },
};

export const LeaveBalanceCards: React.FC<LeaveBalanceCardsProps> = ({ balances }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {balances.map((balance) => {
        const colors = colorVariants[balance.color] || colorVariants.blue;
        const usedPercent = balance.totalAllowance > 0 
          ? Math.min(100, Math.round((balance.used / balance.totalAllowance) * 100))
          : 0;

        return (
          <div
            key={balance.id}
            className={`group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-200 hover:shadow-md ${colors.borderHover}`}
          >
            {/* Header: Title and Icon */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {balance.name}
                  </h3>
                  {balance.description && (
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {balance.description}
                    </p>
                  )}
                </div>
                <div className={`p-2.5 rounded-lg ${colors.bgLight} ${colors.text} shrink-0`}>
                  {getLeaveIcon(balance.leaveType)}
                </div>
              </div>

              {/* Big Metric Display */}
              <div className="my-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-slate-900">
                    {balance.remaining}
                  </span>
                  <span className="text-sm font-medium text-slate-500">
                    days available
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Utilization</span>
                    <span className="font-medium text-slate-700">{usedPercent}% used</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${colors.progressFill}`}
                      style={{ width: `${usedPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Breakdown Footer */}
            <div className="pt-4 border-t border-slate-100">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-slate-50/80 p-2">
                  <div className="text-slate-400 font-medium mb-0.5">Total</div>
                  <div className="font-semibold text-slate-800">{balance.totalAllowance}</div>
                </div>
                <div className="rounded-lg bg-slate-50/80 p-2">
                  <div className="text-slate-400 font-medium mb-0.5">Used</div>
                  <div className="font-semibold text-slate-800">{balance.used}</div>
                </div>
                <div className="rounded-lg bg-amber-50/70 p-2 text-amber-700">
                  <div className="text-amber-600 font-medium mb-0.5">Pending</div>
                  <div className="font-semibold">{balance.pending}</div>
                </div>
              </div>

              {balance.accrualPeriod && (
                <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                  <Clock className="h-3 w-3" />
                  <span>Valid: {balance.accrualPeriod}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
