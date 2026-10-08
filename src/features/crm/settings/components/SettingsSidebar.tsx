import {
  Activity,
  Bell,
  BriefcaseBusiness,
  Calculator,
  Contact,
  FileText,
  Globe,
  History,
  ListChecks,
  Mail,
  Settings,
  SlidersHorizontal,
  Users,
  Workflow,
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';
import type { SettingsSection } from '../types/settings.types';

interface SettingsSectionItem {
  id: SettingsSection;
  label: string;
  description: string;
  icon: LucideIcon;
  iconTile: string;
}

const settingsSections: SettingsSectionItem[] = [
  {
    id: 'general',
    label: 'General',
    description: 'Basic CRM configuration',
    icon: Settings,
    iconTile: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'lead-management',
    label: 'Lead Management',
    description: 'Statuses, sources, scoring',
    icon: ListChecks,
    iconTile: 'bg-emerald-50 text-emerald-500',
  },
  {
    id: 'opportunity',
    label: 'Opportunity',
    description: 'Stages and defaults',
    icon: BriefcaseBusiness,
    iconTile: 'bg-orange-50 text-orange-500',
  },
  {
    id: 'pipeline',
    label: 'Pipeline',
    description: 'Sales pipeline configuration',
    icon: Workflow,
    iconTile: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'activities',
    label: 'Activities',
    description: 'Types, priorities and defaults',
    icon: Activity,
    iconTile: 'bg-green-50 text-green-600',
  },
  {
    id: 'quotations',
    label: 'Quotations',
    description: 'Numbering, status and tax',
    icon: FileText,
    iconTile: 'bg-purple-50 text-purple-600',
  },
  {
    id: 'customers',
    label: 'Customers',
    description: 'Types and defaults',
    icon: Users,
    iconTile: 'bg-orange-50 text-orange-500',
  },
  {
    id: 'contacts',
    label: 'Contacts',
    description: 'Types and required fields',
    icon: Contact,
    iconTile: 'bg-slate-50 text-slate-500',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    description: 'Email and in-app notifications',
    icon: Bell,
    iconTile: 'bg-red-50 text-red-500',
  },
  {
    id: 'email',
    label: 'Email Templates',
    description: 'Email configuration and templates',
    icon: Mail,
    iconTile: 'bg-sky-50 text-sky-500',
  },
  {
    id: 'numbering',
    label: 'Numbering & Sequences',
    description: 'Document numbering configuration',
    icon: Calculator,
    iconTile: 'bg-amber-50 text-amber-500',
  },
  {
    id: 'localization',
    label: 'Localization',
    description: 'Language, country and formats',
    icon: Globe,
    iconTile: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'display',
    label: 'Display & Preferences',
    description: 'UI and user preferences',
    icon: SlidersHorizontal,
    iconTile: 'bg-red-50 text-red-500',
  },
  {
    id: 'history',
    label: 'Configuration History',
    description: 'View settings change history',
    icon: History,
    iconTile: 'bg-orange-50 text-orange-500',
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
    <aside className="w-full shrink-0 rounded-xl border border-slate-200 bg-white p-2 lg:w-[280px]">
      {settingsSections.map((section) => {
        const isActive =
          activeSection === section.id;

        const Icon = section.icon;

        return (
          <button
            key={section.id}
            type="button"
            onClick={() =>
              onSectionChange(section.id)
            }
            className={`relative mb-1 flex w-full items-center gap-3 rounded-lg p-3 text-left transition ${
              isActive
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            {/* Active indicator */}
            {isActive && (
              <span className="absolute left-0 top-1/2 h-10 w-1 -translate-y-1/2 rounded-r-full bg-blue-600" />
            )}

            {/* Icon */}
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${section.iconTile}`}
            >
              <Icon size={18} strokeWidth={2} />
            </span>

            {/* Text */}
            <span className="min-w-0">
              <span
                className={`block text-sm font-medium ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-slate-900'
                }`}
              >
                {section.label}
              </span>

              <span className="mt-0.5 block text-xs text-slate-500">
                {section.description}
              </span>
            </span>
          </button>
        );
      })}
    </aside>
  );
}