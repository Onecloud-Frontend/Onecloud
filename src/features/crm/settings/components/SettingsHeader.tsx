// OWNER: Sudharsan ONLY

import { Search, Settings } from 'lucide-react';

export default function SettingsHeader() {
  return (
    <header className="mt-3 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Settings size={22} />
        </span>

        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            CRM Settings
          </h1>

          <p className="text-sm text-slate-500">
            Configure your CRM preferences and business configuration
          </p>
        </div>
      </div>

      <div className="relative w-72">
        <Search
          size={16}
          className="absolute left-3 top-2.5 text-slate-400"
        />

        <input
          placeholder="Search settings..."
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500"
        />
      </div>
    </header>
  );
}