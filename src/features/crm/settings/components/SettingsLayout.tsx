// OWNER: Sudharsan ONLY

import type { ReactNode } from 'react';

import SettingsHeader from './SettingsHeader';
import SettingsSidebar from './SettingsSidebar';

import type { SettingsSection } from '../types/settings.types';

interface SettingsLayoutProps {
  title: string;
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
  children: ReactNode;
}

export default function SettingsLayout({
  title,
  activeSection,
  onSectionChange,
  children,
}: SettingsLayoutProps) {
  return (
    <div className="min-h-full bg-slate-50 p-6">
      <p className="text-sm text-slate-500">
        CRM &nbsp;›&nbsp; Settings &nbsp;›&nbsp; {title}
      </p>

      <SettingsHeader />

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[300px_1fr]">
        <SettingsSidebar
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />

        <main className="min-w-0 space-y-5">
          {children}
        </main>
      </div>
    </div>
  );
}