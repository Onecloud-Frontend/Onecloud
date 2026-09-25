
import React from 'react';

interface CommunicationHistoryProps {
  communicationHistory: unknown[];
}

const CommunicationHistory: React.FC<CommunicationHistoryProps> = ({
  communicationHistory,
}) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 px-6 py-4"><h2 className="font-semibold text-slate-900">Communication History</h2></div><div className="p-6 text-sm text-slate-500">{communicationHistory.length === 0 ? 'No communication history available.' : communicationHistory.map((communication, index) => <div key={index}>{JSON.stringify(communication)}</div>)}</div>
    </section>
  );
};

export default CommunicationHistory;
