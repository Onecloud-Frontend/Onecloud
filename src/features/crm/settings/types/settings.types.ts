export const SETTINGS_BASE_PATH = '/crm/settings';

export const settingsSections = [
  'general',
  'lead-management',
  'opportunity',
  'pipeline',
  'activities',
  'quotations',
  'customers',
  'contacts',
  'notifications',
  'email',
  'numbering',
  'localization',
  'display',
  'history',
] as const;

export type SettingsSection =
  (typeof settingsSections)[number];

export function isSettingsSection(
  value: string,
): value is SettingsSection {
  return settingsSections.includes(
    value as SettingsSection,
  );
}