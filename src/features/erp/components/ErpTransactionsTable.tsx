import React from 'react';
import type { ErpTransaction } from '../types/dashboard.types';
import { ErpStatusBadge } from './ErpStatusBadge';

export interface ErpTransactionsTableProps {
  transactions: ErpTransaction[];
}

export const ErpTransactionsTable: React.FC<ErpTransactionsTableProps> = ({ transactions }) => {
  const typeBadgeStyle: Record<string, string> = {
    'Purchase Order': 'bg-purple-50 text-purple-700 border-purple-200',
    'Sales Order': 'bg-blue-50 text-blue-700 border-blue-200',
    Invoice: 'bg-amber-50 text-amber-700 border-amber-200',
    Payment: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    GRN: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-medium">
          <tr>
            <th className="py-3 px-4">Transaction #</th>
            <th className="py-3 px-4">Type</th>
            <th className="py-3 px-4">Entity / Counterparty</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4 text-right">Amount</th>
            <th className="py-3 px-4 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-slate-50/75 transition-colors">
              <td className="py-3 px-4 font-mono font-semibold text-slate-900">{tx.transactionNumber}</td>
              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${
                    typeBadgeStyle[tx.type] || 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {tx.type}
                </span>
              </td>
              <td className="py-3 px-4 text-slate-700 font-medium">{tx.partyName}</td>
              <td className="py-3 px-4 text-slate-500">{tx.date}</td>
              <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                ${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="py-3 px-4 text-right">
                <ErpStatusBadge status={tx.status} variant={tx.statusVariant} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
