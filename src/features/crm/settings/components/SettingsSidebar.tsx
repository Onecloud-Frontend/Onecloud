// OWNER: Sudharsan ONLY

import type { SettingsSection } from '../types/settings.types';

interface SettingsSectionItem {
  id: SettingsSection;
  label: string;
  description: string;
}

const settingsSections: SettingsSectionItem[] = [
  {
    id: 'general',
    label: 'General',
    description: 'Basic CRM configuration',
  },
  {
    id: 'localization',
    label: 'Localization',
    description: 'Language, country and formats',
  },
  {
    id: 'customers',
    label: 'Customers',
    description: 'Types and defaults',
  },
  {
    id: 'contacts',
    label: 'Contacts',
    description: 'Types and required fields',
  },
  {
    id: 'activities',
    label: 'Activities',
    description: 'Types, priorities and defaults',
  },
  {
    id: 'pipeline',
    label: 'Pipeline',
    description: 'Sales pipeline configuration',
  },
  {
    id: 'quotations',
    label: 'Quotations',
    description: 'Numbering, status and tax',
  },
  // {
  //   id: 'crm-operations',
  //   label: 'CRM Operations',
  //   description: 'Lead management and scoring',
  // },
  {
    id: 'notifications',
    label: 'Notifications',
    description: 'Email and in-app notifications',
  },
  {
    id: 'email',
    label: 'Email Templates',
    description: 'Email configuration and templates',
  },
  {
    id: 'display',
    label: 'Display & Preferences',
    description: 'UI and user preferences',
  },
  {
    id: 'history',
    label: 'Configuration History',
    description: 'View settings change history',
  },
];

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
}

export default function SettingsSidebar({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) {
  return (
    <aside className="w-full shrink-0 rounded-xl border border-slate-200 bg-white p-2 lg:w-[300px]">
      {settingsSections.map((section) => {
        const isActive = activeSection === section.id;

        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onSectionChange(section.id)}
            className={`mb-1 w-full rounded-lg p-3 text-left transition ${
              isActive
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="font-medium">
              {section.label}
            </div>

            <div className="mt-1 text-xs text-slate-500">
              {section.description}
            </div>
          </button>
        );
      })}
    </aside>
  );
}