export const settingsSections = [
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
  {
    id: 'crm-operations',
    label: 'CRM Operations',
    description: 'Lead management and scoring',
  },
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
] as const;

export type SettingsSection =
  (typeof settingsSections)[number]['id'];

export const SETTINGS_BASE_PATH = '/crm/settings';

export const DEFAULT_SECTION: SettingsSection = 'general';

export const isSettingsSection = (
  value?: string,
): value is SettingsSection =>
  settingsSections.some((section) => section.id === value);