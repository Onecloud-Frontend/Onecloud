import React from 'react';

/**
 * ForgotPasswordPage
 *
 * Route: /forgot-password
 * Layout: AuthLayout
 *
 * Password reset flow will be implemented when the backend provides the endpoint.
 * Backend status: UNIMPLEMENTED_BACKEND_CONTRACT
 */
const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
      <h1 className="text-xl font-semibold text-slate-900 mb-1">Reset password</h1>
      <p className="text-sm text-slate-500 mb-6">OneCloud Enterprise Platform</p>
      <div className="space-y-4">
        <div className="h-10 bg-slate-100 rounded-md animate-pulse" />
        <div className="h-10 bg-brand-600 rounded-md opacity-30" />
      </div>
      <p className="text-xs text-center text-slate-400 mt-6">
        Backend contract not yet defined
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
