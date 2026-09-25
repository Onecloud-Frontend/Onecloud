import React from 'react';
import { 
  Coffee, 
  HeartPulse, 
  Palmtree, 
  FileText, 
  Baby, 
  Users, 
  Calendar 
} from 'lucide-react';
import type { LeaveBalance, LeaveType } from '@/features/hrms/shared/types';
import { LEAVE_TYPE_CONFIGS } from '../types/leaveDashboard.types';

interface LeaveBalanceCardsProps {
  balances: LeaveBalance[];
}

const getLeaveTypeIcon = (type: LeaveType) => {
  switch (type) {
    case 'CASUAL':
      return <Coffee className="h-5 w-5" />;
    case 'SICK':
      return <HeartPulse className="h-5 w-5" />;
    case 'EARNED':
      return <Palmtree className="h-5 w-5" />;
    case 'UNPAID':
      return <FileText className="h-5 w-5" />;
    case 'MATERNITY':
      return <Baby className="h-5 w-5" />;
    case 'PATERNITY':
      return <Users className="h-5 w-5" />;
    default:
      return <Calendar className="h-5 w-5" />;
  }
};

export const LeaveBalanceCards: React.FC<LeaveBalanceCardsProps> = ({ balances }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {balances.map((balance) => {
        const config = LEAVE_TYPE_CONFIGS[balance.leaveType] || {
          label: balance.leaveType,
          description: 'Standard company leave policy quota.',
          badgeLabel: 'General',
          colors: {
            bgLight: 'bg-blue-50/70',
            text: 'text-blue-600',
            badgeBg: 'bg-blue-100',
            badgeText: 'text-blue-700',
            progressFill: 'bg-blue-500',
            borderHover: 'hover:border-blue-300',
          },
        };

        const utilizationPercent = balance.total > 0
          ? Math.min(100, Math.round((balance.used / balance.total) * 100))
          : 0;

        return (
          <div
            key={balance.leaveType}
            className={`group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-200 hover:shadow-md ${config.colors.borderHover}`}
          >
            {/* Header info */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase mb-1.5 ${config.colors.badgeBg} ${config.colors.badgeText}`}
                  >
                    {config.badgeLabel}
                  </span>
                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {config.label}
                  </h3>
                </div>

                <div className={`p-2.5 rounded-lg ${config.colors.bgLight} ${config.colors.text} shrink-0`}>
                  {getLeaveTypeIcon(balance.leaveType)}
                </div>
              </div>

              <p className="text-xs text-slate-500 line-clamp-2 min-h-[32px]">
                {config.description}
              </p>

              {/* Main metric display */}
              <div className="my-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-slate-900">
                    {balance.remaining}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    days available
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Used: {balance.used} of {balance.total}</span>
                    <span className="font-medium text-slate-700">{utilizationPercent}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${config.colors.progressFill}`}
                      style={{ width: `${utilizationPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Breakdown footer */}
            <div className="pt-4 border-t border-slate-100">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-slate-50 p-2">
                  <div className="text-slate-400 font-medium text-[11px] mb-0.5">Total</div>
                  <div className="font-semibold text-slate-800">{balance.total}</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-2">
                  <div className="text-slate-400 font-medium text-[11px] mb-0.5">Used</div>
                  <div className="font-semibold text-slate-800">{balance.used}</div>
                </div>
                <div className="rounded-lg bg-blue-50/60 p-2">
                  <div className="text-blue-600 font-medium text-[11px] mb-0.5">Available</div>
                  <div className="font-semibold text-blue-700">{balance.remaining}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
