// OWNER: Sudharsan ONLY

import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SettingsLayout from '../components/SettingsLayout';
import GeneralSettings from '../components/GeneralSettings';
import CustomerSettings from '../components/CustomerSettings';

import type { SettingsSection } from '../types/settings.types';

import {
  isSettingsSection,
  SETTINGS_BASE_PATH,
} from '../types/settings.types';

const ComingSoon = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-6">
    <h2 className="text-base font-semibold text-slate-900">
      Coming Soon
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      This section is not built yet.
    </p>
  </div>
);

const sectionComponents: Partial<
  Record<SettingsSection, React.ComponentType>
> = {
  general: GeneralSettings,
  customers: CustomerSettings,
  'lead-management': ComingSoon,
  opportunity: ComingSoon,
  pipeline: ComingSoon,
  activities: ComingSoon,
  quotations: ComingSoon,
  contacts: ComingSoon,
  notifications: ComingSoon,
  email: ComingSoon,
  numbering: ComingSoon,
  localization: ComingSoon,
  display: ComingSoon,
  history: ComingSoon,
};

export default function SettingsPage() {
  const { section } = useParams<{
    section?: string;
  }>();

  const navigate = useNavigate();

  /*
   * Check whether the URL section is a valid
   * SettingsSection.
   *
   * Example:
   * /crm/settings/general
   * /crm/settings/pipeline
   * /crm/settings/customers
   */
  const activeSection: SettingsSection =
    typeof section === 'string' &&
    isSettingsSection(section)
      ? section
      : 'general';

  /*
   * Get the label for the active sidebar item.
   */
  const title = useMemo(
    () => activeSection.replace(/-/g, ' '),
    [activeSection],
  );

  /*
   * Change the URL when the user clicks
   * an item in the Settings sidebar.
   */
  const handleSectionChange = (
    nextSection: SettingsSection,
  ) => {
    navigate(
      `${SETTINGS_BASE_PATH}/${nextSection}`,
    );
  };

  /*
   * Load the component for the selected section.
   */
  const ActiveComponent =
    sectionComponents[activeSection] ??
    ComingSoon;

  return (
    <SettingsLayout
      title={title}
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
    >
      <ActiveComponent />
    </SettingsLayout>
  );
}