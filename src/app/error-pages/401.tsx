import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-100">
        <div className="mx-auto w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
          <Lock className="w-10 h-10 text-orange-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">401</h1>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Unauthorized Access</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          You need to be logged in to access this resource. Your session may have expired.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-sm transition-colors"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
