import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { QueryProvider } from '@/core/api/query/QueryProvider';
import { AuthProvider } from '@/core/auth/AuthProvider';
import { LocaleProvider } from '@/app/providers/LocaleProvider';
import { ToastProvider } from '@/shared/components/ui/toast';
import { TooltipProvider } from '@/shared/components/ui/tooltip';

/**
 * OneCloud Enterprise Platform — Root Application Component
 *
 * Providers added:
 *   QueryProvider   (TanStack Query)
 *   AuthProvider    (Authentication context)
 *   LocaleProvider  (Localization context)
 *   ToastProvider   (Toast notification context)
 *   TooltipProvider (Radix tooltip primitive context)
 */
const App: React.FC = () => {
  return (
    <QueryProvider>
      <AuthProvider>
        <LocaleProvider>
          <ToastProvider>
            <TooltipProvider>
              <RouterProvider router={router} />
            </TooltipProvider>
          </ToastProvider>
        </LocaleProvider>
      </AuthProvider>
    </QueryProvider>
  );
};

export default App;
