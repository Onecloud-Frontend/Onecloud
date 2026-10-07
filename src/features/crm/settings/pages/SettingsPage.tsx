// OWNER: Sudharsan ONLY

import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SettingsLayout from '../components/SettingsLayout';
import GeneralSettings from '../components/GeneralSettings';
import { CrmOperationsSettings } from '../components/CrmOperationsSettings';
import type { SettingsSection } from '../types/settings.types';
import {
  isSettingsSection,
  SETTINGS_BASE_PATH,
  settingsSections,
} from '../types/settings.types';

const ComingSoon = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-6">
    <p className="text-sm text-slate-500">
      This section is not built yet.
    </p>
  </div>
);

const sectionComponents: Partial<
  Record<SettingsSection, React.ComponentType>
> = {
  general: GeneralSettings,
    'crm-operations': CrmOperationsSettings,
};

export default function SettingsPage() {
  const { section } = useParams<{ section?: string }>();
  const navigate = useNavigate();

  const activeSection: SettingsSection = isSettingsSection(section)
    ? section
    : 'general';

  const title = useMemo(
    () =>
      settingsSections.find((item) => item.id === activeSection)?.label ??
      'General',
    [activeSection],
  );

  const handleSectionChange = (nextSection: SettingsSection) => {
    navigate(`${SETTINGS_BASE_PATH}/${nextSection}`);
  };

  const ActiveComponent =
    sectionComponents[activeSection] ?? ComingSoon;

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