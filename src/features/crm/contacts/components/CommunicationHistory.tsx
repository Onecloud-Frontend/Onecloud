
import React from 'react';
import type { Communication } from '../types/contact.types';

interface CommunicationHistoryProps {
  communicationHistory: Communication[];
}

const CommunicationHistory: React.FC<CommunicationHistoryProps> = ({
  communicationHistory,
}) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-4">
        <h2 className="font-semibold text-slate-900">Communication History</h2>
      </div>
      <div className="p-6 text-sm text-slate-500">
        {communicationHistory.length === 0 ? (
          'No communication history available.'
        ) : (
          communicationHistory.map((communication, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <div className="flex justify-between items-start">
                <span className="font-medium text-slate-900">{communication.type}</span>
                <span className="text-xs text-slate-400">{communication.date}</span>
              </div>
              <p className="mt-1">{communication.summary}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CommunicationHistory;
