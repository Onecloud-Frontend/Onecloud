import React from 'react';
import { Hammer } from 'lucide-react';

const MaintenancePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-100">
        <div className="mx-auto w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-6">
          <Hammer className="w-10 h-10 text-teal-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">503</h1>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Under Maintenance</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          The platform is currently undergoing scheduled maintenance to improve our services. We'll be back online shortly. Thank you for your patience!
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-sm transition-colors"
          >
            Check Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
