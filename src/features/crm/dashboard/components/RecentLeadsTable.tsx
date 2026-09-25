import React from 'react';
import { RecentLead, LeadStatus } from '../types/dashboard.types';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface RecentLeadsTableProps {
  data: RecentLead[];
}

const getStatusStyles = (status: LeadStatus) => {
  switch (status) {
    case 'New':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Contacted':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Qualified':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    case 'Proposal':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'Lost':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
};

export const RecentLeadsTable: React.FC<RecentLeadsTableProps> = ({
  data,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/60 shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white">
        <div>
          <h2 className="text-base font-bold text-[#0b1f4d]">
            Recent Leads
          </h2>

          <p className="text-xs text-slate-500 font-medium mt-1">
            Latest assigned leads requiring action
          </p>
        </div>

        <button className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors px-3 py-1.5 hover:bg-blue-50 rounded-md">
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-3 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">
                Name
              </th>

              <th className="px-6 py-3 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">
                Company
              </th>

              <th className="px-6 py-3 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">
                Status
              </th>

              <th className="px-6 py-3 font-semibold text-slate-500 uppercase tracking-wider text-[11px] text-right">
                Value
              </th>

              <th className="px-6 py-3 font-semibold text-slate-500 uppercase tracking-wider text-[11px] text-center w-16">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                      <MoreHorizontal className="h-5 w-5 text-slate-400" />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-slate-700">
                      No recent leads found
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      New leads will appear here when they are added.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <div className="font-semibold text-[#0b1f4d]">
                      {lead.name}
                    </div>

                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {lead.id}
                    </div>
                  </td>

                  <td className="px-6 py-3.5 whitespace-nowrap text-slate-600 font-medium">
                    {lead.company}
                  </td>

                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <span
                      className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border',
                        getStatusStyles(lead.status)
                      )}
                    >
                      {lead.status}
                    </span>
                  </td>

                  <td className="px-6 py-3.5 whitespace-nowrap text-right font-semibold text-slate-700">
                    ₹{lead.value.toLocaleString('en-IN')}
                  </td>

                  <td className="px-6 py-3.5 whitespace-nowrap text-center">
                    <button className="text-slate-400 hover:text-[#0b1f4d] p-1 rounded-md hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};