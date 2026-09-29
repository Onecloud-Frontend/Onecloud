import React from 'react';
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

const GeneralErrorPage: React.FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage = 'An unexpected error occurred.';
  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-100">
        <div className="mx-auto w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-10 h-10 text-yellow-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Something went wrong</h1>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-8 text-left overflow-auto max-h-48">
          <p className="text-sm font-mono text-slate-700 whitespace-pre-wrap break-words">
            {errorMessage}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reload Page
          </button>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralErrorPage;
