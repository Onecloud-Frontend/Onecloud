import React from 'react';
import type { LeaveBalance, LeaveType } from '@/features/hrms/shared/types';
import { humanizeEnum } from '@/features/hrms/shared/utils';
import { Award, Briefcase, HeartPulse, HelpCircle, UserCheck } from 'lucide-react';

interface LeaveBalanceCardsProps {
  balances: LeaveBalance[];
}

const getLeaveTypeConfig = (type: LeaveType) => {
  switch (type) {
    case 'CASUAL':
      return {
        label: 'Casual Leave',
        icon: Briefcase,
        barColor: 'bg-blue-600',
        badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
        cardBorder: 'hover:border-blue-300',
      };
    case 'SICK':
      return {
        label: 'Sick Leave',
        icon: HeartPulse,
        barColor: 'bg-rose-500',
        badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
        cardBorder: 'hover:border-rose-300',
      };
    case 'EARNED':
      return {
        label: 'Earned Leave',
        icon: Award,
        barColor: 'bg-emerald-600',
        badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        cardBorder: 'hover:border-emerald-300',
      };
    case 'MATERNITY':
    case 'PATERNITY':
      return {
        label: humanizeEnum(type) + ' Leave',
        icon: UserCheck,
        barColor: 'bg-purple-600',
        badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
        cardBorder: 'hover:border-purple-300',
      };
    case 'UNPAID':
    default:
      return {
        label: humanizeEnum(type) + ' Leave',
        icon: HelpCircle,
        barColor: 'bg-slate-500',
        badgeBg: 'bg-slate-100 text-slate-700 border-slate-200',
        cardBorder: 'hover:border-slate-300',
      };
  }
};

export const LeaveBalanceCards: React.FC<LeaveBalanceCardsProps> = ({ balances }) => {
  if (balances.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <HelpCircle className="mx-auto h-10 w-10 text-gray-400" />
        <h3 className="mt-3 text-base font-semibold text-gray-900">
          No Leave Balances Available
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Your leave quota has not been allocated or is currently unavailable.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {balances.map((balance) => {
        const config = getLeaveTypeConfig(balance.leaveType);
        const Icon = config.icon;
        const total = balance.total;
        const used = balance.used;
        const remaining = balance.remaining;
        const usagePercentage = total > 0 ? Math.min(100, Math.round((used / total) * 100)) : 0;

        return (
          <div
            key={balance.leaveType}
            className={`group flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md ${config.cardBorder}`}
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.badgeBg}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {config.label}
                </span>
                <span className="text-xs font-medium text-gray-400">
                  Quota: {total} {total === 1 ? 'Day' : 'Days'}
                </span>
              </div>

              {/* Balance Numbers */}
              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-extrabold tracking-tight text-gray-900">
                    {remaining}
                  </span>
                  <span className="ml-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Remaining
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-700">
                    {used}
                  </span>
                  <span className="text-xs text-gray-500"> used</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>Usage</span>
                  <span>{usagePercentage}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${config.barColor}`}
                    style={{ width: `${usagePercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Footer details */}
            <div className="mt-5 border-t border-gray-100 pt-3 flex items-center justify-between text-xs text-gray-500">
              <span>Available for leave booking</span>
              <span className="font-medium text-gray-700">{remaining} days left</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaveBalanceCards;
