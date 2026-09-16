import React from 'react';

/**
 * OAuth2CallbackPage
 *
 * Route: /oauth2/redirect
 * Layout: AuthLayout
 *
 * Handles OAuth2 redirect from backend:
 * GET /api/auth/oauth2/success?token=&refreshToken=&tenantId=
 *
 * Will parse query params, store tokens, and redirect in the auth integration phase.
 */
const OAuth2CallbackPage: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
      <h1 className="text-xl font-semibold text-slate-900 mb-2">Completing sign-in…</h1>
      <p className="text-sm text-slate-500">Processing OAuth2 redirect</p>
      <div className="mt-6 flex justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-brand-600 border-t-transparent animate-spin" />
      </div>
      <p className="text-xs text-slate-400 mt-6">
        Auth integration phase — not yet implemented
      </p>
    </div>
  );
};

export default OAuth2CallbackPage;
