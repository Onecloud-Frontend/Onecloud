import React from 'react';

/**
 * RegisterPage
 *
 * Route: /register
 * Layout: AuthLayout
 *
 * Registration form will be implemented in the auth integration phase.
 * Will connect to: POST /api/auth/register
 */
const RegisterPage: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
      <h1 className="text-xl font-semibold text-slate-900 mb-1">Create account</h1>
      <p className="text-sm text-slate-500 mb-6">OneCloud Enterprise Platform</p>
      <div className="space-y-4">
        <div className="h-10 bg-slate-100 rounded-md animate-pulse" />
        <div className="h-10 bg-slate-100 rounded-md animate-pulse" />
        <div className="h-10 bg-slate-100 rounded-md animate-pulse" />
        <div className="h-10 bg-brand-600 rounded-md opacity-30" />
      </div>
      <p className="text-xs text-center text-slate-400 mt-6">
        Auth integration phase — not yet implemented
      </p>
    </div>
  );
};

export default RegisterPage;
