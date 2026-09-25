import React from 'react';
import { CalendarCheck, CalendarClock, CalendarDays, Clock } from 'lucide-react';
import type { LeaveSummary } from '../types';

interface LeaveSummaryCardsProps {
  summary: LeaveSummary;
}

export const LeaveSummaryCards: React.FC<LeaveSummaryCardsProps> = ({ summary }) => {
  const cards = [
    {
      title: 'Available Balance',
      value: `${summary.totalRemaining} Days`,
      subtitle: 'Total remaining across quotas',
      icon: CalendarCheck,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
    },
    {
      title: 'Leaves Consumed',
      value: `${summary.totalUsed} Days`,
      subtitle: 'Taken this calendar cycle',
      icon: CalendarClock,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
    },
    {
      title: 'Total Allocated',
      value: `${summary.totalAllocated} Days`,
      subtitle: 'Annual quota entitlement',
      icon: CalendarDays,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-100',
    },
    {
      title: 'Pending Requests',
      value: summary.pendingRequestsCount,
      subtitle: 'Awaiting manager approval',
      icon: Clock,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="flex items-start justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="mt-1 text-xs text-gray-500">{card.subtitle}</p>
            </div>
            <div className={`rounded-lg p-3 ${card.bgColor} ${card.borderColor} border`}>
              <Icon className={`h-5 w-5 ${card.iconColor}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaveSummaryCards;
